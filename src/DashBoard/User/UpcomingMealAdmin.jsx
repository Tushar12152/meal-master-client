import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Shared/Title";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";

const UpcomingMealAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const like=useLoaderData()
    

    const { data: upcoming = [], refetch } = useQuery({
      queryKey: ['meal'],
      queryFn: async () => {
        const res = await axiosSecure.get(`/upcoming-meals`)
        return res.data
      }
    });
  
// console.log(upcoming);




const handlePublish=async(data)=>{
      

     const {Category,Title,_id, admin_email,admin_name,date,description,imageUrl,ingredients,likes,price,rating,review}=data

     const Publish={
        Category,Title,admin_email,admin_name,date,description,imageUrl,ingredients,likes,price,rating,review
     }
    

       await axiosSecure.post('/meals', Publish)
       .then(res=>{
        if (res?.data?.insertedId) {
            swal("success", "Your Meal is Published", "success")

                axiosSecure.delete(`/upcoming-meals/${_id}`)
                  .then(res=>{
                      if(res.data.deletedCount>0){
                          refetch()
                      }
                  })



          
          }
       })
       
}
    
      


    return (
        <div>
              <Title heading={'Upcoming Meal'}> </Title>


              <div className="mt-10 ">
              <div className="overflow-x-auto">
  <table className="table">
    
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Meal Title</th>
        <th>Likes</th>
        <th>Publish</th>
     
      </tr>
    </thead>
    <tbody>
      {upcoming.map((item,i)=> <tr key={item._id}>
        <th>
          {i+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{item.Title}</div>
            
            </div>
          </div>
        </td>
        <td>
         {like.length}
        
        </td>
        
        <th>
          <button onClick={()=>handlePublish(item)} className="btn bg-[#f76042]  text-white ">Publish</button>
        </th>
      </tr>)}
     
     
    </tbody>
   
    
  </table>
</div>
              </div>
        </div>
    );
};

export default UpcomingMealAdmin;