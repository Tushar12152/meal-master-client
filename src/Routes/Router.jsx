import { createBrowserRouter } from "react-router-dom";
import Routs from "../Layout/Routs";
import Login from "../Components/login";
import Register from "../Components/Register";
import Home from "../Pages/Home";
import DashBoard from "../Layout/DashBoard";
import AddMeal from "../DashBoard/AddMeal";
import MealDetails from "../Components/MealDetails";
import Payment from "../Pages/payment/Payment";
import Meals from "../Pages/Meals";
import PrivateRoute from "./PrivateRoute";
import RequestedMeal from "../DashBoard/User/requestedMeal";
import UserProfile from "../DashBoard/User/UserProfile";


const Router = createBrowserRouter([
      {
        path:'/',
        element:<Routs></Routs>,
        children:[
          {
             path:'/',
             element:<Home></Home>
          },
          {
            path:`/detail/:id`,
            element:<MealDetails></MealDetails>,
            loader:({params})=>fetch(`http://localhost:5000/meals/${params.id}`)
          },
          {
            path:"/meals",
            element:<Meals></Meals>

          },
          {
             path:'/payment/:packageName',
             element:<Payment></Payment>,
             loader:({params})=>fetch(`http://localhost:5000/packages/${params.packageName}`)
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
        element:<PrivateRoute>
          <DashBoard></DashBoard>
           </PrivateRoute>,
        children:[
          {
            path:'/dashboard/addmeal',
            element:<AddMeal></AddMeal>
          },
          {
             path:'/dashboard/requestedMeal',
             element:<PrivateRoute>
                  <RequestedMeal></RequestedMeal>
             </PrivateRoute>
          },
          {
             path:'/dashboard/userProfile',
             element:<PrivateRoute>
                        <UserProfile></UserProfile>
                     </PrivateRoute>
          },
        ]
      }
])

export default Router;