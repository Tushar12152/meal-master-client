import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RequestedMeal = () => {
    const axiosSecure=useAxiosSecure()

    const { data:request=[],refetch } = useQuery({
     queryKey: ['request'],
     queryFn: async () =>{
         const res=await axiosSecure.get(`/requests`)
 
         return res.data
     }    
   })


   console.log(request);
   
    return (
        <div>
           
        </div>
    );
};

export default RequestedMeal;