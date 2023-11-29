import { useQuery } from "@tanstack/react-query";
import Title from "../../Shared/Title";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import swal from "sweetalert";
import { Link } from "react-router-dom";





const MyReview = () => {

    const axiosSecure=useAxiosSecure()
    const{user}=useAuth()


    const { data:detail = [], refetch } = useQuery({
        queryKey: ['review'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews`);
            return res.data;
        }
    });


    const data=detail.filter    (item=>item.email===user?.email)


    // console.log(data);


    const handleDelete=id=>{
        //   console.log(id);
    
    
        swal({
            title: "Are you sure?",
            text: "You want to delete this review?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            
    
            axiosSecure.delete(`/reviews/${id}`)
            .then(res=>{
                  if(res.data.deletedCount>0){
                    swal(" Your review is deleted", {icon: "success", });
    
                    refetch()
                  }
            })
            
            .catch((error) => {
                console.log(error);
                swal("Error", "Failed to delete review", "error");
              });
    
    
            } else {
              swal("Your Review is safe!");
            }
          });
    
    
    
        
    }




    return (
        <div>
             <Title heading={'My Review'}></Title>




             <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Meal Title</th>
        <th>Likes</th>
        <th> Review</th>
        <th>Edit Review</th>
        <th>Delete</th>
        <th>View Detail</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item,i)=><tr key={item._id}>
        <th>
          <label>
           {i+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{item?.Title}</div>
            
            </div>
          </div>
        </td>
        <td>
          {item?.likes}
        </td>
        <td>{item?.review}</td>
        <th>
         <Link to={`/dashboard/update/${item?._id}`}>
          <button className="btn bg-[#f76042] text-white"><FaEdit></FaEdit></button>
         </Link>
        </th>

        <th>
          <button onClick={()=>handleDelete(item?._id)} className="btn bg-[#f76042] text-white"><FaTrash></FaTrash></button>
        </th>

        <th>
          <Link to={`/detail/${item?.detailId}`}>
          <button className="btn bg-[#f76042] text-white"><FaEye></FaEye></button>
          </Link>
        </th>
      </tr>)}
      
     
    </tbody>
    
   
    
  </table>
</div>





        </div>
    );
};

export default MyReview;