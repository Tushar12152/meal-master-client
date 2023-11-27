import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Shared/Title";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AllReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`)
      return res.data
    }
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to Delete this Review?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/reviews/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              swal(" This Review Is deleted", { icon: "success" });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error);
            swal("Error", "Failed to delete", "error");
          });
      } else {
        swal("This Review is safe!");
      }
    });
  };

  
  const sortedReviews = reviews.slice().sort((a, b) => a.likes - b.likes);

  return (
    <div>
      <Title heading={'All Review'}></Title>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Delete</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedReviews.map((review, idx) => (
              <tr key={review._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{review?.Title}</div>
                    </div>
                  </div>
                </td>
                <td>{review?.likes}</td>
                <td>{review?.review}</td>
                <th>
                  <button onClick={() => handleDelete(review?._id)} className="btn bg-[#f76042] text-white">
                    <FaTrash />
                  </button>
                </th>
                <th>
                  <Link to={`/detail/${review?.detailId}`}>
                    <button className="btn bg-[#f76042] text-white">
                      <FaEye />
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReview;
