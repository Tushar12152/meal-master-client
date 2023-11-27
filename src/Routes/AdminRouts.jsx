import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { PropTypes } from 'prop-types';
import { Navigate } from "react-router-dom";


const AdminRouts = ({children}) => {

    const {user,loading}=useAuth()
    const usersMail=user?.email
    const axiosSecure=useAxiosSecure()

   

    const { data:users = [], isLoading } = useQuery({
        queryKey: ['user'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;   
        }
    });


    if(loading){
        return <h1>user Loading.......</h1>
    }


    // console.log(users);

    const loggedInUser=users?.find(user=>user?.email===usersMail)
    // console.log(loggedInUser);

    if(isLoading){
         return (
            <div className="flex flex-col gap-2 items-center justify-center mt-40">
               <progress className="progress progress-error w-56" value={0} max="100"></progress>
      <progress className="progress progress-error w-56" value="10" max="100"></progress>
      <progress className="progress progress-error w-56" value="40" max="100"></progress>
       <progress className="progress progress-error w-56" value="70" max="100"></progress>
      <progress className="progress progress-error w-56" value="100" max="100"></progress>
            </div>
          );
    }

    if(loggedInUser?.Role==='admin'){
        return  children
    } else{
        return <Navigate to='/'></Navigate>
    }



 
};

AdminRouts.propTypes={
    children:PropTypes.node,
}


export default AdminRouts;