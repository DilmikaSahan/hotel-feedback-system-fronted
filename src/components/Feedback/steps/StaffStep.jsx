const StaffStep = ({ waiters, chefs, feedback, setFeedback }) => (
  <>
    <h3>Select Waiter</h3>
    <div className="card-grid">
      {waiters.map(w => (
        <button
          key={w.name}
          className={feedback.waiterName === w.name ? "selected" : ""}
          onClick={() => setFeedback(f => ({ ...f, waiterName: w.name }))}
        >
          {w.name}
        </button>
      ))}
    </div>

    <h3>Select Chef</h3>
    <div className="card-grid">
      {chefs.map(c => (
        <button
          key={c.name}
          className={feedback.chefName === c.name ? "selected" : ""}
          onClick={() => setFeedback(f => ({ ...f, chefName: c.name }))}
        >
          {c.name}
        </button>
      ))}
    </div>
  </>
);

export default StaffStep;
