import { AiFillLike,  } from "react-icons/ai";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from "../Hooks/useAuth";
// import axios from "axios";

const UpcomingMealCard = ({ meal,liked ,refetch }) => {
  // const [like, setLike] = useState(false);
  // const [reAction, setReAction] = useState(0);
  const [disable, setDisable] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // console.log(meal);
 
  useEffect(() => {
    const itemsLike = liked.filter(item => item.title === meal.Title && item.email === user?.email);
   
    if (itemsLike.length > 0) {
      setDisable(true);
    }
  }, [liked, meal.Title, user?.email]);

  const handleLike = async (id,like) => {
    // setLike(!like);

    // const likeInfo = {
    //   title: title,
    //   email: user?.email,
    //   like:reAction+1

    // console.log(like,id);
    // };
    const totalLike=parseInt(like)+1
axiosSecure.patch(`/upcoming-meals/${id}`,{totalLike})
 .then(res=>{
    if(res.data. modifiedCount){
      setDisable(true)
      refetch()
    }
 })





// console.log(likeInfo);

    // axiosSecure.post('/upcoming-likes', likeInfo).then(res => {
    //   if (res.data.insertedId) {
    //     setDisable(true);
    //     setReAction(prevCount => prevCount + 1);
    //   }
    // });
  };

  return (
    <div>
      <div className="card lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="h-[200px]" src={meal?.imageUrl}  />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{meal?.Title}</h2>
          <p>Price: ${meal?.price}</p>
          <div className="card-actions justify-end">
            <div
              onClick={() => handleLike(meal?._id,meal?.likes)}
              className="flex gap-2 items-center"
            >
              <button disabled={disable} className="text-2xl">
                <AiFillLike /> 
              </button>
              <span>{meal?.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpcomingMealCard.propTypes = {
  meal: PropTypes.object,
  liked: PropTypes.array,
  refetch: PropTypes.any,
};

export default UpcomingMealCard;
