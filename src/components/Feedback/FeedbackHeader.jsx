const STEPS = ["Staff", "Room", "Details", "Service", "Food", "Ambiance"];

const FeedbackHeader = ({ step }) => {
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="feedback-header">
      <h2>{STEPS[step]}</h2>
      <p>Please complete the {STEPS[step].toLowerCase()} section</p>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="step-tabs">
        {STEPS.map((s, i) => (
          <span key={s} className={i === step ? "active" : ""}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeedbackHeader;
