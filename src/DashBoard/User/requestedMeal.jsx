import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Shared/Title";
import swal from "sweetalert";
import useAuth from "../../Hooks/useAuth";


const RequestedMeal = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const email=user.email;
    const { data:meal=[],refetch } = useQuery({
     queryKey: ['request'],
     queryFn: async () =>{
         const res=await axiosSecure.get(`/requests`)
 
         return res.data
     }    
   })

   const meals= meal.filter(item=>item.email===email)

//    console.log(meals);










const handleDelete=id=>{
    //   console.log(id);


    swal({
        title: "Are you sure?",
        text: "You want to cancel your request?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        

        axiosSecure.delete(`/requests/${id}`)
        .then(res=>{
              if(res.data.deletedCount>0){
                swal(" Your Request Is Cancelled", {icon: "success", });

                refetch()
              }
        })
        
        .catch((error) => {
            console.log(error);
            swal("Error", "Failed to cancel request", "error");
          });


        } else {
          swal("Your request is safe!");
        }
      });



    
}




    return (
         <div>

            <Title heading={'Requested Meals'}></Title>
             <div className="overflow-x-auto mt-10">
            
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                     #
                    </label>
                  </th>
                  <th>Meal Title</th>
                  <th>Total Likes</th>
                  <th>Total Review</th>
                  <th> Status </th>
                  <th> Reaction </th>
                </tr>
              </thead>
              <tbody>
                { meals.map((meal,idx)=>  <tr key={meal._id}>
                  <th>
                    <label>
                     {idx+1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      
                      <div>
                        <div className="font-bold">{meal?.title}</div>
                       
                      </div>
                    </div>
                  </td>
                  <td>
                    {meal?.likes}
                  </td>
                  <td>{meal?.review}</td>
                  <th>
                    <p >{meal?.status}</p>
                  </th>
                  <th>
                    <button onClick={()=>handleDelete(meal?._id)} className="btn  bg-[#f76042] text-white">Cancel</button>
                  </th>
                </tr>)}
               
               
               
              </tbody>
             
              
            </table>
          </div>
         </div>
    );
};

export default RequestedMeal;