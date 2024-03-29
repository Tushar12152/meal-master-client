import { Link, NavLink } from "react-router-dom";
import Container from "../Layout/Container";
import MenuDropdown from "./MenuDropdown";
import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Nav = () => {


  const axiosSecure = useAxiosSecure();

  const { data: upcoming = [] } = useQuery({
    queryKey: ['upcoming-meal'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming-meals`)
      return res.data
    }
  });





  const nav=<div className="flex flex-col lg:flex-row gap-6 lg:items-center">

        <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-[#f76042] p-2 rounded-md text-white " : ""}>Home</NavLink>

        <NavLink to="/meals" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-[#f76042] p-2 rounded-md text-white" : ""}>Meals</NavLink>

      <div className="flex items-center">
      <NavLink to="/upcoming-meals" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-[#f76042] p-2 rounded-md text-white    " : ""}> Upcoming Meals  </NavLink>
        <IoIosNotifications className="text-xl " />
        <div className="badge  bg-[#f76042] text-white">+{upcoming.length}</div>
      </div>

        <NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "bg-[#f76042] p-2 rounded-md  text-white" : ""}>Join Us</NavLink>
  </div>

 
    return (
             <Container>
                  <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {nav}
      </ul>
    </div>
      <Link to='/'> <img className="w-20 " src={'https://i.ibb.co/n8kPV3J/download.png'} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {nav}
    </ul>
  </div>
  <div className="navbar-end">
    <MenuDropdown></MenuDropdown>
  </div>
</div>
             </Container>
      
    );
};

export default Nav;