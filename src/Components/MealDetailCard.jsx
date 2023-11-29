



import PropTypes from 'prop-types';
import Container from '../Layout/Container';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MealDetailCard = ({ meal }) => {
    const [like, setLike] = useState(false);
    const [reAction, setReAction] = useState(0);
    // const [reviews, setReviews] = useState('');
    const [disable, setDisable] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userMail = user?.email;

    const { _id,Title, admin_name, date, description, imageUrl, ingredients, rating } = meal;

    const { data = [], refetch } = useQuery({
        queryKey: ['likes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/likes`);
            return res.data;
        }
    });

    useEffect(() => {
        const specificLike = data.filter(item => item.title === Title);
        setReAction(specificLike.length); 
    }, [data, Title]);



  




    const handleAddMeal = async () => {
        const mealData = {
            title: Title,
            email: userMail,
            status: 'pending',
            likes:reAction,
           
        };

         if(user){
            const res = await axiosSecure.post('/requests', mealData);
            if (res?.data?.insertedId) {
                toast.success('Your Request is sent');
            }
         }
    };

    const handleLike = () => {
        setLike(!like);

        const likeInfo = {
            reAction: reAction + 1,
            title: Title
        };

        axiosSecure.post('/likes', likeInfo).then(res => {
            if (res.data.insertedId) {
                setDisable(true);
                refetch();
            }
        });
    };

  
    const handleReview = e => {
        e.preventDefault();
        const userReview = e.target.review.value;
        
        // const newReviews = [...reviews, userReview];
        // setReviews(userReview);

        const reviewInfo={
            review:userReview,
            Title,
            email:userMail,
            likes:reAction,
             detailId:_id

        }

        axiosSecure.post('/reviews',reviewInfo)
        .then(res=>{
             if(res.data.insertedId){
                toast.success('Your Review is added')
             }
        })

  //  console.log(reviewInfo);

        e.target.review.value = '';
    };

    // console.log(reviews);

    return (
        <Container>
            <div className="hero min-h-screen mt-10" style={{ backgroundImage: `url(${imageUrl})`,width:'100%' }}>
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
                            <div onClick={handleLike} className='flex gap-2 items-center'>
                                <button disabled={disable||!user?.email} className='text-2xl'>
                                    {like ? <AiFillLike /> : <AiOutlineLike />}
                                </button>
                                <span>{reAction}</span>
                            </div>
                            <form onSubmit={handleReview} className='flex flex-col lg:flex-row gap-2 items-center'>
                                <input className='input border-2 border-[#f76042] text-black' type="text" name="review"  required/>
                                <input className='btn bg-[#f76042]  text-white ' type="submit" value="Review" />
                            </form>
                        </div>
                        <div className=' mt-10'>
                            <Link to='/dashboard/requestedMeal'>
                                <button onClick={handleAddMeal} className="btn bg-[#f76042] text-white">Request Meal</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

MealDetailCard.propTypes = {
    meal: PropTypes.object,
};

export default MealDetailCard;
