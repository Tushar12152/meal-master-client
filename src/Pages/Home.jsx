import { Helmet } from "react-helmet-async";
import AboutUs from "../Components/AboutUs";
import Banner from "../Components/Banner";
import Contact from "../Components/Contact";
import MealsByCategory from "../Components/MealsByCategory";
import MemberShip from "../Components/MemberShip";

const Home = () => {
    return (
        <div>

             <Helmet>
                  <title>Meal-Master || Home</title>
             </Helmet>
              <Banner></Banner>

              <MealsByCategory></MealsByCategory>
              <MemberShip></MemberShip>
                <AboutUs></AboutUs>
              <Contact></Contact>
        </div>
    );
};

export default Home;