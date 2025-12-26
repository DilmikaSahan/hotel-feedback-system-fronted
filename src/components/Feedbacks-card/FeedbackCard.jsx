import StarRating from './StarRating';
import './FeedbackCard.css'
import { BsFillPersonFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import { MdLocalPhone } from "react-icons/md";


const FeedbackCard = ({feedback}) => {
    const {
        fullName,
        waiterName,
        chefName,
        roomTable,
        phoneNumber,
        ItemOrdered,
        serviceRate,
        serviceFeedback,
        foodRate,
        foodFeedback,
        ambianceRate,
        ambianceFeedback,
        avgRating,
        createdDate
    } = feedback;

    return (
        <div className="feedback-card">
            <h3 className="feedback-username">{feedback.fullName}</h3>

            <div className="row">
                <span><BsFillPersonFill  className='icon'/>{feedback.waiterName}</span>
                <span><PiForkKnifeFill className='icon'/>{feedback.chefName}</span>
            </div>
            <div className="row">
                <span><MdMeetingRoom className='icon'/>{feedback.roomTable}</span>
                <span><MdLocalPhone className='icon'/>{feedback.phoneNumber}</span>
            </div>

            <div className="rating-row">
                <StarRating rating={Math.round(feedback.avgRating)} />
                <span className="avg-text">
                ({feedback.avgRating.toFixed(1)}/5)
                </span>
            </div>
            <div className="comments-section">
            <p className="order">
            <b>Food Ordered : </b>{feedback.ItemOrdered}
            </p>
            <p>
                <b>Service ({feedback.serviceRate}/5) : </b>{feedback.serviceFeedback}
            </p>
            <p>
                <b>Food ({feedback.foodRate}/5) : </b> {feedback.foodFeedback}
            </p>
            <p>
                <b>Ambiance ({feedback.ambianceRate}/5) : </b> {feedback.ambianceFeedback}
            </p>

            </div>
            
            <p className="date">
                {new Date(feedback.createdDate).toLocaleString()}
            </p>

        </div>);
        };

        export default FeedbackCard;