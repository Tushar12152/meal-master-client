
import { NavLink } from "react-router-dom";
import { CgEye, CgProfile } from "react-icons/cg";
import { FaCodePullRequest } from "react-icons/fa6";


const User = () => {
    return (
        <div>
             <>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                                    <CgProfile />
                                        My Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedMeal">
                                    <FaCodePullRequest />
                                        Requested Meal </NavLink>
                                </li>
                                
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <CgEye></CgEye>
                                        My Review</NavLink>
                                </li>
                               
                            </>
        </div>
    );
};

export default User;