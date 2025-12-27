import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllWaiters,
  getAllChefs,
  getAllRoomTables,
  submitFeedback,
} from "../../api/publicApi";

import FeedbackHeader from "./FeedbackHeader";
import { STEPS } from "./stepsConfig";

import StaffStep from "./steps/StaffStep";
import RoomStep from "./steps/RoomStep";
import UserDetailsStep from "./steps/UserDetails";
import RatingStep from "./steps/RatingSteps";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";




import "./feedbackStyle.css";

const FeedbackForm = () => {

    const navigate = useNavigate();
    const goHome = () => {
      navigate("/");
    };
  /* ---------------- Step state (STRING based) ---------------- */
  const [currentStep, setCurrentStep] = useState(STEPS[0].key);

  /* ---------------- Data lists ---------------- */
  const [waiters, setWaiters] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [rooms, setRooms] = useState([]);

  /* ---------------- Feedback payload ---------------- */
  const [feedback, setFeedback] = useState({
    waiterName: "",
    chefName: "",
    roomTable: "",

    fullName: "",
    phoneNumber: "",
    email: "",
    ItemOrdered: "",

    serviceRate: null,
    serviceFeedback: "",

    foodRate: null,
    foodFeedback: "",

    ambianceRate: null,
    ambianceFeedback: "",
  });

  /* ---------------- Load initial data ---------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [w, c, r] = await Promise.all([
          getAllWaiters(),
          getAllChefs(),
          getAllRoomTables(),
        ]);

        setWaiters(Array.isArray(w) ? w : []);
        setChefs(Array.isArray(c) ? c : []);
        setRooms(Array.isArray(r) ? r : []);
      } catch (err) {
        console.error("Failed to load feedback data", err);
      }
    };

    loadData();
  }, []);

  /* ---------------- Step helpers ---------------- */
  const currentIndex = STEPS.findIndex(s => s.key === currentStep);

  const next = () => {
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].key);
    }
  };

  const back = () => {
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].key);
    }
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    try {
      await submitFeedback(feedback);
      navigate("/landingpage",{state:{status:"success"}})

    } catch (err) {
      console.error("Submit failed", err);
      navigate("/landingpage",{state:{status:"fail"}})
    }
  };

  /* ---------------- Render step ---------------- */
  const renderStep = () => {
    switch (currentStep) {
      case "staff":
        return (
          <StaffStep
            waiters={waiters}
            chefs={chefs}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      case "room":
        return (
          <RoomStep
            rooms={rooms}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      case "details":
        return (
          <UserDetailsStep
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      case "service":
        return (
          <RatingStep
            title="How was the Service?"
            rateKey="serviceRate"
            commentKey="serviceFeedback"
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      case "food":
        return (
          <RatingStep
            title="How was the Food?"
            rateKey="foodRate"
            commentKey="foodFeedback"
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      case "ambiance":
        return (
          <RatingStep
            title="How was the Ambiance?"
            rateKey="ambianceRate"
            commentKey="ambianceFeedback"
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="feedback-container">
      {/* Header */}
      <FeedbackHeader currentStep={currentStep} />

      {/* Step content */}
      {renderStep()}

      {/* Navigation buttons */}
      <div className="nav-buttons">
        {currentStep === "staff" ? ( 
            <button onClick={goHome}> <FaArrowLeftLong className="button-icon" /> Back to Home 
            </button> 
        ) : ( 
            currentIndex > 0 && ( <button onClick={back}> 
            <FaArrowLeftLong className="button-icon" /> Back 
            </button> ) 
        )}
        {currentIndex < STEPS.length - 1 && (
          <button onClick={next}>Next <FaArrowRightLong className="button-icon"/></button>
        )}
        {currentStep === "ambiance" && (
          <button className="submit-btn" onClick={handleSubmit}>
            <FaTelegramPlane className="button-icon"/>
            Submit Feedback
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
