import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Shared/Title";

const UserProfile = () => {
    const { user } = useAuth()
   const userEmail=user?.email
    const axiosSecure=useAxiosSecure()

   const { data:profile=[] } = useQuery({
    queryKey: ['users'],
    queryFn: async () =>{
        const res=await axiosSecure.get(`/users/${userEmail}`)

        return res.data
    }
    
  })



  const {Badge,email,image,name}=profile

//   console.log(profile);
    return (
       <div className=" p-10 border-4 min-h-screen w-[90%] mx-auto ">

         <Title heading={`${name}'s Profile`}></Title>

         <div >
              <div className="avatar ">
  <div className="w-24 rounded-full ring ml-4 ring-[#f76042] ring-offset-base-100 ring-offset-2">
    <img src={image} />
   
  </div>
</div>
<h1 className="text-xl font-bold mt-2">{name}</h1>
<h1 className="text-xl font-bold mt-2">Badge:  {Badge}</h1>

<h1 className="text-xl  mt-2">Email: {email}</h1>
        </div>

      
       </div>
    );
};

export default UserProfile;