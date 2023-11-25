import { createBrowserRouter } from "react-router-dom";
import Routs from "../Layout/Routs";
import Login from "../Components/login";
import Register from "../Components/Register";
import Home from "../Pages/Home";
import DashBoard from "../Layout/DashBoard";
import AddMeal from "../DashBoard/AddMeal";
import MealDetails from "../Components/MealDetails";
import Meals from "../Pages/Meals";


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