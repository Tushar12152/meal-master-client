



import { Link, useLoaderData } from "react-router-dom";
import Title from "../Shared/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import swal from "sweetalert";

const AllMeals = () => {
  const reviews = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const getLikesAndReviewsForMeal = (mealId) => {
    const matchingReviews = reviews.filter((review) => review.detailId === mealId);
    let totalLikes = 0;
    let totalReviews = [];

    matchingReviews.forEach((review) => {
      totalLikes += review.likes || 0;
      totalReviews.push(review.review || '');
    });

    return { likes: totalLikes, reviews: totalReviews };
  };

  const { data: meals = [],refetch } = useQuery({
    queryKey: ['meal'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals`);
      return res.data;
    }
  });


  const handleDelete=(id)=>{



    swal({
        title: "Are you sure?",
        text: "You want to Delete this meal?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        


            axiosSecure.delete(`/meals/${id}`)
            .then(res=>{
                if(res.data.deletedCount>0){
                  swal(" Your meal Is deleted", {icon: "success", });
  
                  refetch()
                }
          })




       
        
        
        .catch((error) => {
            console.log(error);
            swal("Error", "Failed to delete", "error");
          });


        } else {
          swal("Your meal is safe!");
        }
      });







     
  }




  return (
    <div>
      <Title heading={'All Meals'}></Title>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Distributor Name</th>
              <th>Distributor Email</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => {
              const { likes, reviews } = getLikesAndReviewsForMeal(meal._id);

              return (
                <tr key={meal._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{meal?.Title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{likes}</td>
                  <td>
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  </td>
                  <th>
                    <p className="btn btn-ghost btn-xs">{meal?.admin_name}</p>
                  </th>
                  <td>{meal?.admin_email}</td>
                  <td>
                    <button className="btn bg-[#f76042] text-white">
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleDelete(meal?._id)} className="btn bg-[#f76042] text-white">
                      <FaTrash />
                    </button>
                  </td>
                  <td>
                   <Link to={`/detail/${meal?._id}`}> <button className="btn bg-[#f76042] text-white">
                      <FaEye />
                    </button></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
