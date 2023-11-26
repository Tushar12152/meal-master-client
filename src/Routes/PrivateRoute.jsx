
import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';


const PrivateRoute = ({children}) => {

    const {user ,loading}=useAuth()
    const location=useLocation()
     
if(loading){
      return  <div className="flex flex-col gap-2 items-center justify-center mt-40">
         <progress className="progress progress-error w-56" value={0} max="100"></progress>
<progress className="progress progress-error w-56" value="10" max="100"></progress>
<progress className="progress progress-error w-56" value="40" max="100"></progress>
<progress className="progress progress-error w-56" value="70" max="100"></progress>
<progress className="progress progress-error w-56" value="100" max="100"></progress>
      </div>
}

if(user){

    return  children
}
else{

    swal({
        title: "Are you sure?",
        text: "Are You want Log In Now?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

            return <Navigate state={location?.pathname} to='/login'></Navigate>

        } else {
          swal(" You have to Login First to Access it !! ");
        }
      });
 
    
}

};

PrivateRoute.propTypes = {
    children:PropTypes.node,
};

export default PrivateRoute;