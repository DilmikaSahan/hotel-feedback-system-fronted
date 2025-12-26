const RoomStep = ({ rooms, feedback, setFeedback }) => (
  <div className="card-grid">
    {rooms.map(r => (
      <button
        key={r.roomTable}
        className={feedback.roomTable === r.roomTable ? "selected" : ""}
        onClick={() => setFeedback(f => ({ ...f, roomTable: r.roomTable }))}
      >
        {r.roomTable}
      </button>
    ))}
  </div>
);

export default RoomStep;
