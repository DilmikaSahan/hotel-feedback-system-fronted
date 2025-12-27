import { useRef , useEffect,useState } from "react";
import { addChef,addWaiter,addRoomTable,getDashboardStats,deleteWaiter,deleteChef,deleteRoomTable } from "../../api/adminApiSecure";
import { getAllChefs,getAllWaiters,getAllRoomTables } from "../../api/publicApi";
import { useAuth } from "../../auth/authContext";
import { data, useNavigate } from "react-router-dom";
import FeedbackList from "../../components/Feedbacks-card/FeedbackList.jsx";
import "../../pages/styles/AdminPage.css";
import { IoIosCloseCircle,IoMdAddCircleOutline,IoIosPeople } from "react-icons/io";
import { IoFilterCircle } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import { PiListChecksThin } from "react-icons/pi";
import { BsFillKanbanFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";





const AdminPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const feedbackListRef = useRef(null);

  const [totalReviews, setTotalReviews] = useState(0);
  const [avgServiceRating, setAvgServiceRating] = useState(0);
  const [avgFoodRating, setAvgFoodRating] = useState(0);
  const [avgAmbienceRating, setAvgAmbienceRating] = useState(0)

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [popupAction, setPopupAction] = useState(null);

  const [waiters, setWaiters] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [roomTables, setRoomTables] = useState([]);

  const [filters,setFilters] = useState({
    waiter:"",
    chef:"",
    roomTable:"",
    rating:""
  });

  const [newWaiter, setNewWaiter] = useState("");
  const [newChef, setNewChef] = useState("");
  const [newRoomTable, setNewRoomTable] = useState("");

  const handelLogOut = () => {
    setPopupMessage("Are you sure you want to logout ?");
    setPopupType("confirm");
    setPopupAction(() => () => {
      signOut();
      navigate("/");
    });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupAction(null);
  }

  //fetch dashboard stats on load
  useEffect(() => {
      fetchDashboardStats();
      fetchStaff();
      fetchRoomTables();
    }, []);

  const fetchDashboardStats = async () => {
    try {
      const stats = await getDashboardStats();
      setTotalReviews(stats.totalReviews);
      setAvgServiceRating(parseFloat(stats.avgServiceRating).toFixed(1));
      setAvgFoodRating(parseFloat(stats.avgFoodRating).toFixed(1));
      setAvgAmbienceRating(parseFloat(stats.avgAmbianceRating).toFixed(1));
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };
  const fetchStaff = async () => {
    try{
      const [waiterList, chefList] = await Promise.all([getAllWaiters(), getAllChefs()]);
      setWaiters(waiterList);
      setChefs(chefList);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  const fetchRoomTables = async () => {
    try{
      const roomTableList = await getAllRoomTables();
      setRoomTables(roomTableList);
    } catch (error) {
      console.error("Error fetching room/tables:", error);
    }
  };

  const handleAddWaiter = async () => {
    if (!newWaiter.trim()) return;

    try { 
      await addWaiter(newWaiter);
      setPopupMessage(`Waiter "${newWaiter}" added successfully`);
      setPopupType("success");
      setShowPopup(true);
      setNewWaiter("");
      fetchStaff();
    } catch {
      setPopupMessage("Error adding waiter");
      setPopupType("error");
      setShowPopup(true);
    }   
  };
  const handleDeleteWaiter = async (name) => {
  try {
    await deleteWaiter(name);

    setPopupMessage(`Waiter "${name}" deleted successfully`);
    setPopupType("success");
    setShowPopup(true);

    fetchStaff();
  } catch (error) {
    setPopupMessage("Error deleting waiter");
    setPopupType("error");
    setShowPopup(true);
  }
  };

  

  const handleAddChef = async () => {
    if (!newChef.trim()) return;
    try {
      await addChef(newChef);
      setPopupMessage(`Chef "${newChef}" added successfully`);  
      setPopupType("success");
      setShowPopup(true);
      setNewChef("");
      fetchStaff();
    } catch {
      setPopupMessage("Error adding chef");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const handleDeleteChef = async (name) => {
  try {
    await deleteChef(name);

    setPopupMessage(`Chef "${name}" deleted successfully`);
    setPopupType("success");
    setShowPopup(true);

    fetchStaff();
  } catch (error) {
    setPopupMessage("Error deleting chef");
    setPopupType("error");
    setShowPopup(true);
  }
};


  const handleAddRoomTable = async () => {
    if (!newRoomTable.trim()) return;

    try {
      await addRoomTable(newRoomTable);
      setPopupMessage(`Room/Table "${newRoomTable}" added successfully`);
      setPopupType("success");
      setShowPopup(true);
      setNewRoomTable("");
      fetchRoomTables();
    } catch {
      setPopupMessage("Error adding room/table");
      setPopupType("error");
      setShowPopup(true);
    }
  };
  

  const handleDeleteRoomTable = async (name) => {
    try {
      await deleteRoomTable(name);

      setPopupMessage(`Room/Table "${name}" deleted successfully`);
      setPopupType("success");
      setShowPopup(true);
      fetchRoomTables();  
    } catch (error) {
      setPopupMessage("Error deleting room/table");
      setPopupType("error");
      setShowPopup(true);
    }
  };


  const applyFilters = () => {
    setFilters({ ...filters });
    feedbackListRef.current?.scrollIntoView({ behavior: 'smooth',block:'start' });
  }

  const clearFilters = () => {
    setFilters({ waiter:"", chef:"", roomTable:"", rating:"" });

  }





    return ( 
        <div className="admin-pannel">
            <div className="parent-card">
                <div className="card">
                    <div className="dashboard-header">
                        <h2><BsFillKanbanFill className="icon"/> Admin Dashboard</h2>
                        <p> Manage Feedback, Staff and Analytics</p>
                        <button className="btn-logout" onClick={handelLogOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                            </svg>
                        Logout
                        </button>
                    </div>
                    {/*Dashboard stats*/}
                    <div className="stats-grid">
                    <div className="stats-card"><h2>{totalReviews}</h2><p>Total Reviews</p> </div>
                    <div className="stats-card"><h2>{avgServiceRating}</h2><p>Avg Service Rating</p></div>
                    <div className="stats-card"><h2>{avgFoodRating}</h2><p>Avg Food Rating</p></div>
                    <div className="stats-card"><h2>{avgAmbienceRating}</h2><p>Avg Ambience Rating</p></div>
                     </div>
                </div>

                {/* Filter */}
                <div className="card">
                  <h2><IoFilterCircle className="icon"/>Filter Feedbacks</h2>
                  <div className="filter-grid">
                    <select value={filters.waiter} onChange={e => setFilters({ ...filters, waiter: e.target.value })}>
                      <option value="">All Waiter</option>
                      {waiters.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
                    </select>
                    <select value={filters.chef} onChange={e => setFilters({ ...filters, chef: e.target.value })}>
                      <option value="">All Chef</option>
                      {chefs.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                    <select value={filters.roomTable} onChange={e => setFilters({ ...filters, roomTable: e.target.value })}>
                      <option value="">All Room/Table</option>
                      {roomTables.map(r => <option key={r.roomTable} value={r.roomTable}>{r.roomTable}</option>)}
                    </select>
                    <select value={filters.rating} onChange={e => setFilters({ ...filters, rating: e.target.value })}>
                      <option value="">All Rating</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                    <div className="filter-acctions">
                    <button className="btn-filter btn-apply-filters" onClick={applyFilters}>Apply Filters</button>
                    <button className="btn-filter btn-clear-filters" onClick={clearFilters}>Clear Filters</button>
  
                    </div>
                     </div>
                </div>
                
                {/* Staff Management */}
                <div className="card management-card">
                  <h2> <IoIosPeople  className="icon"/> Staff Management</h2>

                  {/* ---- Add Waiter ---- */}
                  <div className="add-section">
                    <h5>Add Waiter</h5>
                    <input
                      type="text"
                      placeholder=" Waiter name"
                      value={newWaiter}
                      onChange={(e) => setNewWaiter(e.target.value)}
                    />
                    <button className="add-btn" onClick={handleAddWaiter}><IoMdAddCircleOutline className="icon-small" /> Add Waiter</button>
                  </div>

                  {/* ---- Add Chef ---- */}
                  <div className="add-section">
                    <h5>Add Chef</h5>
                    <input
                      type="text"
                      placeholder=" Chef name"
                      value={newChef}
                      onChange={(e) => setNewChef(e.target.value)}
                    />
                    <button className="add-btn" onClick={handleAddChef}><IoMdAddCircleOutline className="icon-small" /> Add Chef</button>
                  </div>
                  
                  {/* ---- Waiter List ---- */}
                  <h5><FaUserTie className="icon-small"/> Waiters</h5>
                  <div className="list-section">
                    {waiters.length === 0 ? (
                      <p className="empty-text">No waiters available</p>
                    ) : (
                      waiters.map((w) => (
                        <div key={w.name} className="list-item">
                          <span>{w.name}</span>
                          <span className="delete-icon" onClick={() => handleDeleteWaiter(w.name)}><IoIosCloseCircle className="icon-delete"/></span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* ---- Chef List ---- */}
                  <h5><PiForkKnifeFill className="icon-small"/> Chefs</h5>
                  <div className="list-section">
                    {chefs.length === 0 ? (
                      <p className="empty-text">No chefs available</p>
                    ) : (
                      chefs.map((c) => (
                        <div key={c.name} className="list-item">
                          <span>{c.name}</span>
                          <span className="delete-icon" onClick={() => handleDeleteChef(c.name)}><IoIosCloseCircle className="icon-delete" /></span>
                        </div>
                      ))
                    )}
                  </div>

                  
                </div>

                {/* Room table Management */}
                <div className="card management-card">
                  <h2> <MdMeetingRoom className="icon"/> Room | Table Management</h2>
                  <div className="add-section">
                    <h5>Add Room / Table</h5>
                    <input
                      type="text"
                      placeholder=" Room / Table name"
                      value={newRoomTable}
                      onChange={(e) => setNewRoomTable(e.target.value)}
                    />
                    <button className="add-btn" onClick={handleAddRoomTable}> <IoMdAddCircleOutline className="icon-small" /> Add Room / Table</button>
                  </div>

                  {/* ---- Room/Table List ---- */}
                  <h5><PiListChecksThin className="icon-small"/> <span></span>Available Rooms / Tables</h5>
                  <div className="list-section">
                    {roomTables.length === 0 ? (
                      <p className="empty-text">No rooms/tables available</p>
                    ) : (
                      roomTables.map((r) => (
                        <div key={r.roomTable} value={r.roomTable} className="list-item">
                          <span>{r.roomTable}</span>
                          <span className="delete-icon" onClick={() => handleDeleteRoomTable(r.roomTable)}><IoIosCloseCircle className="icon-delete"/></span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Feedback List */}
                <div className="card" ref={feedbackListRef}>
                  <h2><FaComments className="icon"/> Feedbacks</h2>
                  <div className="feedbacks"><FeedbackList filters={filters} /></div>
                </div>

            </div>

        {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0b9448ff"
            className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0
            M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0
            l.35-3.507A.905.905 0 0 0 8 4
            m.002 6a1 1 0 1 0 0 2
            1 1 0 0 0 0-2"/>
            </svg>
            <p>{popupMessage}</p>
            <div className="btn-row">
              {popupType === "confirm" ? (
                <>
                  <button className="btn-yes" onClick={popupAction}>Yes</button>
                  <button className="btn-no" onClick={closePopup}>No</button>
                </>
              ) : (
                <button className="btn-ok" onClick={closePopup}>OK</button>
              )}
            </div>
          </div>
        </div>
      )}
        </div>

    ) 

}


export default AdminPage;