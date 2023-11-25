import { FaRegStar, FaStar } from "react-icons/fa";

import { PropTypes } from 'prop-types';
import Rating from 'react-rating';
import { Link } from "react-router-dom";
const MealsCard = ({meal}) => {
    const {_id,Title,description,price,imageUrl,rating}=meal

    console.log('imageUrl---------->',imageUrl);
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
         <img className="w-[90%] mx-auto p-2 rounded-lg" src={imageUrl} alt="" />
        <div className="card-body w-[90%] mx-auto">
          <h2 className="card-title">{Title}</h2>
          <p>Price:$ {description}</p>
          <p>Price:$ {price}</p>
          <Rating
         placeholderRating={rating}
        emptySymbol={<FaRegStar />}
         placeholderSymbol={<FaStar />}
         fullSymbol={<FaStar />}
            />
          <div className="card-actions justify-end">
           <Link to={`/detail/${_id}`}>
           <button className="btn bg-[#f76042] text-white">View Detail</button>
           </Link>
          </div>
        </div>
      </div>
    );
};


MealsCard.propTypes={
    meal:PropTypes.object,
}


export default MealsCard;