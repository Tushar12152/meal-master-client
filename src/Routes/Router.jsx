import { createBrowserRouter } from "react-router-dom";
import Routs from "../Layout/Routs";
import Login from "../Components/login";
import Register from "../Components/Register";


const Router = createBrowserRouter([
      {
        path:'/',
        element:<Routs></Routs>,
        children:[
          {
             
          }
        ]
      },
      {
          path:'/login',
          element:<Login></Login>
      },
      {
          path:'/register',
          element:<Register></Register>
      },
])

export default Router;