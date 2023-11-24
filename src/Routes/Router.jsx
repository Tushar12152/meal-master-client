import { createBrowserRouter } from "react-router-dom";
import Routs from "../Layout/Routs";
import Login from "../Components/login";
import Register from "../Components/Register";
import Home from "../Pages/Home";
import DashBoard from "../Layout/DashBoard";
import AddMeal from "../DashBoard/AddMeal";


const Router = createBrowserRouter([
      {
        path:'/',
        element:<Routs></Routs>,
        children:[
          {
             path:'/',
             element:<Home></Home>
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

      {
        path:'/dashboard',
        element:<DashBoard></DashBoard>,
        children:[
          {
            path:'/dashboard/addmeal',
            element:<AddMeal></AddMeal>
          }
        ]
      }
])

export default Router;