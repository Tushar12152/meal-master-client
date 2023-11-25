import Banner from "../Components/Banner";
import MealsByCategory from "../Components/MealsByCategory";
import MemberShip from "../Components/MemberShip";

const Home = () => {
    return (
        <div>
              <Banner></Banner>

              <MealsByCategory></MealsByCategory>
              <MemberShip></MemberShip>
        </div>
    );
};

export default Home;