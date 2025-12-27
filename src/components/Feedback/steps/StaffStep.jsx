import { FaUserTie } from "react-icons/fa6";
import { PiForkKnifeFill } from "react-icons/pi";

const StaffStep = ({ waiters, chefs, feedback, setFeedback }) => (
  <>
    <h3>Select Your Waiter</h3>
    <div className="card-grid">
      {waiters.map(w => (
        <button
          key={w.name}
          className={feedback.waiterName === w.name ? "selected" : ""}
          onClick={() => setFeedback(f => ({ ...f, waiterName: w.name }))}
        >
          <FaUserTie className="icon"/>
          <span>{w.name}</span>
        </button>
      ))}
    </div>

    <h3>Select Your Chef</h3>
    <div className="card-grid">
      {chefs.map(c => (
        <button
          key={c.name}
          className={feedback.chefName === c.name ? "selected" : ""}
          onClick={() => setFeedback(f => ({ ...f, chefName: c.name }))}
        > 
          <PiForkKnifeFill className="icon"/>
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  </>
);

export default StaffStep;
