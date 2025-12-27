import "./FeedbackHeader.css";
import { STEPS } from "./stepsConfig";
import { IoIosPeople } from "react-icons/io";

const FeedbackHeader = ({ currentStep }) => {
  const stepIndex = STEPS.findIndex(s => s.key === currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const activeStep = STEPS[stepIndex];
  const Icon = activeStep.icon;

  return (
    <div className="feedback-header">
      {/* Title */}
      <div className="head">
      <Icon className="head-icon"/> 
      <h2>{activeStep.title}</h2>
      <p className="subtitle">{activeStep.subtitle}</p>
      </div>
      

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%`,backgroundColor: '#1d4ed8' }}
        />
      </div>

      {/* Step labels */}
      <div className="steps">
        {STEPS.map((step, index) => (
          <span
            key={step.key}
            className={`step ${
              index === stepIndex ? "active" : ""
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
      
    </div>
  );
};

export default FeedbackHeader;
