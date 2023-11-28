import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Title from "../Shared/Title";
import useAuth from "../Hooks/useAuth";

const DashBoardHome = () => {
    const {user}=useAuth()
    const userMail=user?.email
    const axiosSecure=useAxiosSecure()
    const { data:users = [],  } = useQuery({
        queryKey: ['user'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;   
        }
    });

    const userName=users.find(user=>user.email===userMail)



    return (
        <div>
              <Title heading={`Welcome ${userName?.name} in DashBoard`}></Title>
        </div>
    );
};

export default DashBoardHome;