import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Title from "../Shared/Title";
import Container from "../Layout/Container";
import { Link } from "react-router-dom";

const MemberShip = () => {

    const axiosSecure=useAxiosSecure()

   const { data=[] } = useQuery({
    queryKey: ['package'],
    queryFn: async () =>{
        const res=await axiosSecure.get(`/packages`)

        return res.data
    }
    
  })

console.log(data);



    return (
       <Container>
           <div>
             <Title heading={'Our MemberShip'}></Title>
        </div>
       
       <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
         
          {
            data.map(item=> <Link  key={item?._id} to={`/payment/${item?.packageName}`}>
              <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className="w-[50%] mx-auto h-[200px] " src={item?.image} alt="" /></figure>
            <div className="card-body">
              <h2 className="card-title">{item?.packageName}</h2>
              <p>Price: {item?. price}</p>
              <div className="card-actions justify-end">
              
              </div>
            </div>
          </div>
            </Link> )
           }
          
         
       </div>

       


       </Container>
    );
};

export default MemberShip;