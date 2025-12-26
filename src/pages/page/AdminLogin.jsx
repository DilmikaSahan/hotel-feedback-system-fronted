import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/authContext.jsx";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    const [popupType,setPopupType] = useState("");
    const [popupMessage,setPopupMessage] = useState("");
    const [error, setError] = useState("");

    const errorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#db3647ff"
    className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0
    M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0
    l.35-3.507A.905.905 0 0 0 8 4
    m.002 6a1 1 0 1 0 0 2
    1 1 0 0 0 0-2"/>
    </svg>
    );

    const successIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#25d181f8"
    className="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8
    a8 8 0 0 1 16 0
    m-3.97-3.03a.75.75 0 0 0-1.08.022
    L7.477 9.417 5.384 7.323
    a.75.75 0 0 0-1.06 1.06
    L6.97 11.03a.75.75 0 0 0 1.079-.02
    l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    );

    
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);

            setPopupType('success');
            setPopupMessage('Login successful! Redirecting...');
            setShowPopup(true);
            
        } catch (error) {
            setPopupType('error');
            setPopupMessage('Invalid username or password !');
            setShowPopup(true);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }

    ;}
    const handlePopupOk = () => {
        setShowPopup(false);

        if (popupType === 'success') {
            navigate('/adminPage');
        }
    }
    return (
        <div className="login-container">
      <div className="login-card">
        {/* TOP ICON */}
        <div className="login-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
            />
          </svg>
        </div>

        <h1 className="login-title">Administrator Login</h1>
        <p className="login-subtitle">Access the management dashboard</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-actions">
            <button
              type="button"
              className="btn btn-back"
              onClick={() => navigate("/")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-arrow-left" 
                viewBox="0 0 16 16">
                <path fillRule="evenodd" 
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
              <span>Back</span>
            </button>
    
           
            <button type="submit" className="btn btn-login" disabled={loading} onClick={handleLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="modal-overlay">
            <div className="modal-card">
                <h2 className={`popup-title ${popupType === "success" ? "success-text" : "error-text"}`}>
                    <span>
                    {popupType === "success" ? successIcon() : errorIcon()}
                    </span>
                    <span>
                        {popupType === "success" ? "Success" : "Login Error"}
                    </span>
                </h2>
        <p>{popupMessage}</p>
      <button className={`modal-btn ${popupType === "success" ? "success-ok" : "error-ok"}`} onClick={handlePopupOk}>
        OK
      </button>
    </div>
  </div>
)}

    
    </div>
  );
}
export default AdminLogin;