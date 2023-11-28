import { FaBook,  FaHandsHelping, FaHome,  FaUtensils } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdManageAccounts, MdPreview, MdUpcoming } from "react-icons/md";

import { NavLink, Outlet } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import User from "../DashBoard/User/User";




const Dashboard = () => {
   
    const { user } = useAuth()
    const userEmail=user?.email
     const axiosSecure=useAxiosSecure()
 
    const { data=[] } = useQuery({
     queryKey: ['users'],
     queryFn: async () =>{
         const res=await axiosSecure.get(`/users/${userEmail}`)
 
         return res.data
     }
     
   })

// console.log(data.Role);
    

const Admin=data?.Role==='admin'
 

    return (
        <div className="grid grid-cols-12 h-full">
            
            <div className="col-span-5 md:col-span-3  min-h-screen bg-[#f76042] text-white">
                <ul className="menu p-4">
                    {
                        Admin ? <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                <CgProfile />
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                <MdManageAccounts />
                                    Manage Users</NavLink>
                            </li>


                            <li>
                                <NavLink to="/dashboard/addmeal">
                                    <FaUtensils></FaUtensils>
                                    Add Meal</NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/dashboard/allmeal">
                                    <FaBook></FaBook>
                                    All Meals</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allreview">
                                <MdPreview />
                                    All Review</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/servemeal">
                                <FaHandsHelping />
                                    Serve Meal</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/upcomingmeal">
                                <MdUpcoming />
                                    Upcoming Meal</NavLink>
                            </li>
                        </>
                            :
                           <User></User>
                    }




                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                   
                </ul>
            </div>
            {/* dashboard content */}
            <div className="col-span-7 md:col-span-9  p-4 md:p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;