import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from "../Hooks/useAuth";

const UpcomingMealCard = ({ meal, liked }) => {
  const [like, setLike] = useState(false);
  const [reAction, setReAction] = useState(0);
  const [disable, setDisable] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
 
  useEffect(() => {
    const itemsLike = liked.filter(item => item.title === meal.Title && item.email === user?.email);
    setReAction(itemsLike.length);
    if (itemsLike.length > 0) {
      setDisable(true);
    }
  }, [liked, meal.Title, user?.email]);

  const handleLike = async (title) => {
    setLike(!like);

    const likeInfo = {
      title: title,
      email: user?.email,
      like:reAction+1
    };

console.log(likeInfo);

    axiosSecure.post('/upcoming-likes', likeInfo).then(res => {
      if (res.data.insertedId) {
        setDisable(true);
        setReAction(prevCount => prevCount + 1);
      }
    });
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
              onClick={() => handleLike(meal.Title)}
              className="flex gap-2 items-center"
            >
              <button disabled={disable} className="text-2xl">
                {like ? <AiFillLike /> : <AiOutlineLike />}
              </button>
              <span>{reAction}</span>
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
};

export default UpcomingMealCard;
