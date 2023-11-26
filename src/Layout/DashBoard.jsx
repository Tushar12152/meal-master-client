import { FaBook, FaEnvelope, FaHandsHelping, FaHome,  FaSearch,  FaUtensils } from "react-icons/fa";
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
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#f76042] text-white">
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
                    <li>
                        <NavLink to="/">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;