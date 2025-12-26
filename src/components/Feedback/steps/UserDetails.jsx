const UserDetailsStep = ({ feedback, setFeedback }) => (
  <>
    <input placeholder="Full Name"
      value={feedback.fullName}
      onChange={e => setFeedback(f => ({ ...f, fullName: e.target.value }))} />

    <input placeholder="Phone Number"
      value={feedback.phoneNumber}
      onChange={e => setFeedback(f => ({ ...f, phoneNumber: e.target.value }))} />

    <input placeholder="Email (optional)"
      value={feedback.email}
      onChange={e => setFeedback(f => ({ ...f, email: e.target.value }))} />

    <input placeholder="Items Ordered"
      value={feedback.ItemOrdered}
      onChange={e => setFeedback(f => ({ ...f, ItemOrdered: e.target.value }))} />
  </>
);

export default UserDetailsStep;
