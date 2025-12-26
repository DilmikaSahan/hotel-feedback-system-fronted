const EMOJIS = [
  { value: 1, label: "Poor", icon: "😞" },
  { value: 2, label: "Fair", icon: "😐" },
  { value: 3, label: "Good", icon: "🙂" },
  { value: 4, label: "Very Good", icon: "😄" },
  { value: 5, label: "Excellent", icon: "😍" },
];

const EmojiRating = ({ value, onChange }) => {
  return (
    <div className="emoji-row">
      {EMOJIS.map(e => (
        <button
          key={e.value}
          className={value === e.value ? "selected" : ""}
          onClick={() => onChange(e.value)}
        >
          <span>{e.icon}</span>
          <small>{e.label}</small>
        </button>
      ))}
    </div>
  );
};

export default EmojiRating;
