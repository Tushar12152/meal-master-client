import { useQuery } from "@tanstack/react-query";
import Title from "../Shared/Title";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ServeMeal = () => {
const axiosSecure=useAxiosSecure()

    const { data:meals=[],refetch } = useQuery({
        queryKey: ['meal request'],
        queryFn: async () =>{
            const res=await axiosSecure.get(`/requests`)
    
            return res.data
        }    
      })


    //   console.log(meals);

const handleServe=(id,isDeliverd)=>{
    
   if(isDeliverd==='delivered'){
         toast.success('Already served this meal')
   }


    const status={
        status:'delivered'
    }

    axiosSecure.patch(`/requests/${id}`,status)
    .then(res=>{
        if(res.data.modifiedCount>0){
           refetch()
        }
    })


}







    return (
        <div>
            <Title heading={`Serve Meal`}></Title>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Meal Title</th>
        <th>Users Email</th>
        <th>Status</th>
  
        <th>Serve Button</th>
      </tr>
    </thead>
    <tbody>
      {meals.map((meal,index)=><tr key={meal._id}>
        <th>
         {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{meal?.title}</div>
             
            </div>
          </div>
        </td>
        <td>
         {meal?.email}
        </td>
        <td>{meal?.status}</td>
        <th>
        <button onClick={()=>handleServe(meal?._id,meal?.status)}  className="btn bg-[#f76042] text-white">Serve</button>  
        </th>
      </tr>)}
      
     
    </tbody>
   
    
  </table>
</div>
            
        </div>
    );
};

export default ServeMeal;