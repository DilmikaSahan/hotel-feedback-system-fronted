import { FaStar,FaRegStar  } from "react-icons/fa";

const StarRating = ({rating}) => {
    const maxStars = 5;

    return(
        <div className="stars">
            {
                [...Array(maxStars)].map((_,index)=>index<rating ?(
                    <FaStar key={index} color="#ffc107"/>
                ):(
                    <FaRegStar key={index} color="#e4e5e9"/>
                ))
            }

        </div>
    )
    };
    export default StarRating;