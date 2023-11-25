import { Link, useLoaderData } from "react-router-dom";
import Container from "../Layout/Container";
import MealDetailCard from "./MealDetailCard";

const MealDetails = () => {
    const data=useLoaderData()

    

    // console.log(data);
    return (
          <Container>
                 <MealDetailCard meal={data}></MealDetailCard>

                <div className="flex  py-10 justify-center">
                <Link to='/meals' className="btn bg-[#f76042] text-white">See All</Link>
                </div>
          </Container>
    );
};

export default MealDetails;