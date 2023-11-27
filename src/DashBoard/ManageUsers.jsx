import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Title from "../Shared/Title";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const ManageUsers = () => {
    
    const [toggle,setToggle]=useState(true)
    const [role,setRole]=useState('')
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    
useEffect(()=>{
    toggle?setRole('admin'):setRole('guest')
},[toggle])

    // console.log(toggle);
   

    const { data:withLoggedusers = [],refetch } = useQuery({
        queryKey: ['user'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;   
        }
    });


    //filter a user which users is logged in he cannot change her own role.
    //An Admin can not her role to guest.he can give role another users
    const users=withLoggedusers.filter(users=>users?.email!==user?.email)

// console.log(users);


const handleRole=(id)=>{
    console.log(id);
    const Role={
         Role:role
    }
     axiosSecure.patch(`/users/admin/${id}`,Role)
     .then(res=>{
         if(res.data.modifiedCount>0){
            refetch()
         }
     })


}




    return (
        <div>
              <Title heading={'Manage Users'}></Title>

              <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>User Name</th>
        <th>Users Email</th>
        <th>Make Admin</th>
        <th> Subscription Status</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user,i)=> <tr key={user._id}>
        <th>
         {i+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
           
            <div>
              <div className="font-bold">{user?.name}</div>
           
            </div>
          </div>
        </td>
        <td>
         {user?.email}
        </td>
       <div onClick={()=>setToggle(!toggle)}>
       <button onClick={()=>handleRole(user?._id)} className="btn  bg-[#f76042]  text-white">{user?.Role==='admin'?'Admin':'Guest'}</button>
       </div>
        <th>
          <p className="btn btn-ghost btn-xs">{user?.Badge}</p>
        </th>
      </tr>)}
      
      </tbody>
    
  </table>
</div>

              
        </div>
    );
};

export default ManageUsers;