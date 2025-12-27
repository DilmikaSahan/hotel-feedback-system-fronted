// LandingPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaRedoAlt, FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";



import "./styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = location.state || {}; // "success" or "fail"

  return (
    <div className="landing-page">
      {status === "success" ? (
        <>
          <FaCheckCircle className="landing-icon success" />
          <h2>Feedback Submitted Successfully </h2>
          <p>Thank you for sharing your experience with us.</p>
          <div className="landing-actions">
            <button onClick={() => navigate("/")}>
              <FaHome className="btn-icon"/> Go Back Home
            </button>
            <button onClick={() => navigate("/feedbackform")}>
              <MdAddCircleOutline className="btn-icon"/> Add Another Review
            </button>
          </div>
        </>
      ) : (
        <>
          <RiErrorWarningFill className="landing-icon fail" />
          <h2>Submission Failed </h2>
          <p>Something went wrong. Please try again.</p>
          <div className="landing-actions">
            <button onClick={() => navigate("/")}>
              <FaHome className="btn-icon"/> Go Back Home
            </button>
            <button onClick={() => navigate("/feedbackform")}>
              <FaRedoAlt className="btn-icon"/> Try Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
