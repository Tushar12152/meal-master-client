import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Shared/Title";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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

              <TableContainer
               component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Meal Title</TableCell>
            <TableCell align="right">Likes</TableCell>
            <TableCell align="right">Publish</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {upcoming.map((item,i) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{item.Title}</TableCell>
              <TableCell align="right">{like.length}</TableCell>
              <TableCell align="right"> <button onClick={()=>handlePublish(item)} className="btn bg-[#f76042]  text-white ">Publish</button></TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default UpcomingMealAdmin;