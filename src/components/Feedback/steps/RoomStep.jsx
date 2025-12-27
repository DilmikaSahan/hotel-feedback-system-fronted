import {MdMeetingRoom} from "react-icons/md";
const RoomStep = ({ rooms, feedback, setFeedback }) => (
  <div className="card-grid">
    {rooms.map(r => (
      <button
        key={r.roomTable}
        className={feedback.roomTable === r.roomTable ? "selected" : ""}
        onClick={() => setFeedback(f => ({ ...f, roomTable: r.roomTable }))}
      >
        <MdMeetingRoom className="icon"/>
        <span className="button-icon"></span>{r.roomTable}
      </button>
    ))}
  </div>
);

export default RoomStep;
