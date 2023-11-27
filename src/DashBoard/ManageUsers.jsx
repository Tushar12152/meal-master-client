import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Title from "../Shared/Title";

const ManageUsers = () => {

    
    const axiosSecure=useAxiosSecure()

   

    const { data:users = [],refetch } = useQuery({
        queryKey: ['user'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;   
        }
    });


console.log(users);


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
        <button className="btn  bg-[#f76042]  text-white">{user?.Role}</button>
        <th>
          <button className="btn btn-ghost btn-xs">{user?.Badge}</button>
        </th>
      </tr>)}
      
      </tbody>
    
  </table>
</div>

              
        </div>
    );
};

export default ManageUsers;