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
import MyReview from "../DashBoard/User/MyReview";
import UpdateReview from "../DashBoard/User/UpdateReview";
import AdminRouts from "./AdminRouts";
import ManageUsers from "../DashBoard/ManageUsers";
import AllMeals from "../DashBoard/AllMeals";
import UpdateMeals from "../DashBoard/UpdateMeals";
import AllReview from "../DashBoard/User/AllReview";
import ServeMeal from "../DashBoard/ServeMeal";
import DashBoardHome from "../DashBoard/DashBoardHome";
import UpComingMeals from "../Pages/UpComingMeals";
import UpcomingMealAdmin from "../DashBoard/User/UpcomingMealAdmin";
import AdmineProfile from "../DashBoard/AdmineProfile";


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
          path:'/upcoming-meals',
          element:<UpComingMeals></UpComingMeals>,
          loader:()=>fetch('http://localhost:5000/upcoming-likes')

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
          },
          
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
              path:'/dashboard',
              element:<DashBoardHome></DashBoardHome>
           },

          {
            path:'/dashboard/addmeal',
            element:<AdminRouts>
                     <AddMeal></AddMeal>
                  </AdminRouts>
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

          {
            path:'/dashboard/review',
            element:<PrivateRoute>
                  <MyReview/>
                   </PrivateRoute>
          },
          {
            path:'/dashboard/update/:id',
            element:<UpdateReview></UpdateReview>,
            loader:({params})=>fetch(`http://localhost:5000/reviews/${params.id}`)
          },
          {
            path:"/dashboard/manageUsers",
            element:<AdminRouts>
              <ManageUsers></ManageUsers>
              </AdminRouts>
          },
          {
            path:'/dashboard/allmeal',
            element:<AdminRouts><AllMeals></AllMeals></AdminRouts>,
            loader:()=>fetch('http://localhost:5000/reviews')
          },
          {
            path:'/dashboard/updateMeal/:id',
            element:<UpdateMeals></UpdateMeals>,
            loader:({params})=>fetch(`http://localhost:5000/meals/${params.id}`)
          },
          {
            path:'/dashboard/allreview',
            element:<AdminRouts>
                      <AllReview></AllReview>
                    </AdminRouts>
          },
          {
             path:'/dashboard/servemeal',
             element:<AdminRouts>
                        <ServeMeal></ServeMeal>
                    </AdminRouts>
          },
          {
            path:'/dashboard/upcomingmeal',
            element:<AdminRouts>
                 <UpcomingMealAdmin></UpcomingMealAdmin>
            </AdminRouts>,
            loader:()=>fetch('http://localhost:5000/upcoming-likes')
          },
          {
            path:'/dashboard/adminProfile',
            element:<AdminRouts>
                 <AdmineProfile/>
            </AdminRouts>,
            loader:()=>fetch('http://localhost:5000/meals/')
          }
        ]
      }
])

export default Router;