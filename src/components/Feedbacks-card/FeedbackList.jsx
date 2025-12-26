import { useEffect,useState } from "react";
import FeedbackCard from "./FeedbackCard.jsx";
import { getAllFeedbacks } from "../../api/adminApiSecure.js";
const FeedbackList = (filters) => {
    const [allFeedbacks,setAllFeedbacks]=useState([]);
    const [filteredFeedbacks,setFilteredFeedbacks]=useState([]);

    useEffect(()=>{
        fetchFeedbacks();
    },[]);

    useEffect(()=>{
        applyFilters();
    },[filters,allFeedbacks]);

    const fetchFeedbacks=async()=>{
        try{
            const data = await getAllFeedbacks();
            setAllFeedbacks(data);
            setFilteredFeedbacks(data);
        }catch(error){
            console.error("Error fetching feedbacks:",error);
        }
    };
    const applyFilters=()=>{
        let data = [...allFeedbacks];

        if(filters.waiter){
            data = data.filter(fb => fb.waiterName === filters.waiter);
        }
        if(filters.chef){
            data = data.filter(fb => fb.chefName === filters.chef);
        }
        if(filters.roomTable){
            data = data.filter(fb => fb.roomTable === filters.roomTable);
        }
        if (filters.rating){
            data = data.filter(fb => fb.avgRating >= Number (filters.rating));
        }

        setFilteredFeedbacks(data);
    };

    return (
        <div className="feedback-list">
            {filteredFeedbacks.map(fb=>(
                <FeedbackCard key={fb.id} feedback={fb} />
            ))}
        </div>
    );
    }
export default FeedbackList;