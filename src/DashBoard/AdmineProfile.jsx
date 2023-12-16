import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Title from "../Shared/Title";
import { useLoaderData } from "react-router-dom";


const AdmineProfile = () => {
     const data=useLoaderData()
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
//    console.log(profile);
   const {email,image,name,Badge}=profile
   
   const post=data.filter(item=>item.admin_email===email)

    return (
      <div className="p-10 border-4 min-h-screen w-full md:w-[90%] mx-auto">
      <Title heading={`${name}'s Profile`} />

      <div className="flex flex-col md:flex-row items-center md:gap-24 w-full">
          <div className="md:w-1/2">
              <div className="avatar">
                  <div className="w-24 rounded-full ring ml-4 mt-20 ring-[#f76042] ring-offset-base-100 ring-offset-2">
                      <img src={image} alt="Profile" />
                  </div>
              </div>
              <h1 className="text-xl font-bold mt-2">Email: <span className="lg:text-xl text-sm">{email}</span></h1>
              <h1 className="text-xl font-bold mt-2">Name:  <span className="lg:text-xl text-sm">{name}</span></h1>
              <h1 className="text-xl font-bold mt-2">Badge: <span className="lg:text-xl text-sm">{Badge}</span> </h1>
          </div>
   
          <div className="lg:w-1/2  w-full mt-5 border-t-2 lg:border-0 border-[#f76042]">
              <h1 className="font-bold text-xl text-center">Posts </h1>
              <h1 className="font-bold text-xl text-gray-500 text-center">{post.length}</h1>
          </div>
      </div>
  </div>
    );
};

export default AdmineProfile;