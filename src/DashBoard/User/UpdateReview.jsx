import { useLoaderData, useNavigate } from "react-router-dom";
import Title from "../../Shared/Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const UpdateReview = () => {
const data=useLoaderData()
const axiosSecure=useAxiosSecure()
const navigate=useNavigate()
const handleUpdateReview=(e)=>{
     e.preventDefault()
     const updatedReview=e.target.updateReview.value;
    //  console.log(data._id);

     const review={
        review:updatedReview
     }

     axiosSecure.patch(`/reviews/${data?._id}`,review)
        .then(res=>{
             if(res.data.modifiedCount>0){
                toast.success('Your Review is updated success')
                navigate(-1)
             }
           
        })
}

// console.log(data);
    return (
        <div className="mt-5">
<Title heading={`Update "${data?.Title}'s" Review`}></Title>

            
            <form onSubmit={handleUpdateReview} className='flex gap-2 items-center mt-20 justify-center'>
                                <input defaultValue={data?.review} className='input border-2 border-[#f76042] text-black' type="text" name="updateReview" />
                                <input className='btn bg-[#f76042]  text-white ' type="submit" value="Update Review" />
                            </form>
        </div>
    );
};

export default UpdateReview;