
import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { AiFillEye, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState } from 'react';


const MealDetailCard = ({meal}) => {

    const [like,setLike]=useState(false)

    // console.log(meal);

    // const {Category,Title,_id, admin_email,admin_name,date,description,imageUrl,ingredients,likes,price,rating,review}=meal


    

    const {Title,admin_name,date,description,imageUrl,ingredients,likes,rating,review}=meal

    return (
         <Container>

<div className="hero min-h-screen mt-10" style={{backgroundImage: `url(${imageUrl})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">{Title}</h1>
      <p className="mb-5">{description}</p>
      <div className='flex justify-between'>
          <p className='text-xl'>Ingredients : {ingredients}</p>
          <p className='text-xl'>Distributor : {admin_name}</p>
      </div>

      <div className='flex justify-between mt-5'>
      <Rating
         placeholderRating={rating}
        emptySymbol={<FaRegStar />}
         placeholderSymbol={<FaStar />}
         fullSymbol={<FaStar />}
            />
          <p className='text-xl'>Post Date : {date}</p>
      </div>
     


      <div className='flex justify-between items-center mt-5'>
      <div className='flex gap-2 items-center'>
      <button className='text-2xl' onClick={()=>setLike(!like)}>{like?<AiFillLike />:<AiOutlineLike />}</button>
      <span>{likes}</span>
      </div>

      <div className='flex gap-2 items-center'>
      <button className='text-2xl'><AiFillEye /></button>
      <span>{review}</span>
      </div>

      </div>
     
     <div className=' mt-10'>
     <button className="btn bg-[#f76042] text-white">Request Meal</button>
     </div>

     
    </div>
  </div>
</div>
         </Container>
    );
};

MealDetailCard.propTypes = {
    meal:PropTypes.object,
};

export default MealDetailCard;