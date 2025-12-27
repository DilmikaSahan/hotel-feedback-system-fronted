const UserDetailsStep = ({ feedback, setFeedback }) => (
  <>
    <p className="user-detail-label">Full Name</p>
    <input placeholder="Full Name"
      value={feedback.fullName}
      onChange={e => setFeedback(f => ({ ...f, fullName: e.target.value }))} />
    <p className="user-detail-label">Phone Number</p>
    <input placeholder="Phone Number"
      value={feedback.phoneNumber}
      onChange={e => setFeedback(f => ({ ...f, phoneNumber: e.target.value }))} />
    <p className="user-detail-label">Email (optional)</p>
    <input placeholder="Your Email"
      value={feedback.email}
      onChange={e => setFeedback(f => ({ ...f, email: e.target.value }))} />
    <p className="user-detail-label order-input">Items Ordered</p>
    <textarea placeholder="Items Ordered"
      value={feedback.ItemOrdered}
      onChange={e => setFeedback(f => ({ ...f, ItemOrdered: e.target.value }))} />
  </>
);

export default UserDetailsStep;
