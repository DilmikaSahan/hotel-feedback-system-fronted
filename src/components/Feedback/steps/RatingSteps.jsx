import EmojiRating from "../EmojiRating";

const RatingStep = ({ title, rateKey, commentKey, feedback, setFeedback }) => (
  <>
    <h3>{title}</h3>

    <EmojiRating
      value={feedback[rateKey]}
      onChange={v => setFeedback(f => ({ ...f, [rateKey]: v }))}
    />

    <textarea
      placeholder="Comment (optional) ..."
      value={feedback[commentKey]}
      onChange={e => setFeedback(f => ({ ...f, [commentKey]: e.target.value }))}
    />
  </>
);

export default RatingStep;
