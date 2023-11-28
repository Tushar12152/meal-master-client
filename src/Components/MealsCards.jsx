import { FaRegStar, FaStar } from "react-icons/fa";

import { PropTypes } from 'prop-types';
import Rating from 'react-rating';
import { Link } from "react-router-dom";
const MealsCards = ({meal}) => {
    const {_id,Title,price,imageUrl,rating}=meal

   
    return (
       <Link to={`/detail/${_id}`}>
        <div className="card card-compact lg:w-96 bg-base-100 shadow-xl">
         <img className="w-[90%] h-[300px] mx-auto p-2 rounded-lg" src={imageUrl} alt="" />
        <div className="card-body w-[90%] mx-auto">
          <h2 className="card-title">{Title}</h2>
          
          <p>Price:$ {price}</p>
          <Rating
         placeholderRating={rating}
        emptySymbol={<FaRegStar />}
         placeholderSymbol={<FaStar />}
         fullSymbol={<FaStar />}
            />
          <div className="card-actions justify-end">
          
           
          
          </div>
        </div>
      </div>
       </Link>
    );
};


MealsCards.propTypes={
    meal:PropTypes.object,
}


export default MealsCards;