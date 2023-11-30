import { Link, useLoaderData } from "react-router-dom";
import Container from "../Layout/Container";
import MealDetailCard from "./MealDetailCard";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const MealDetails = () => {
    const data=useLoaderData()

    

    // console.log(data);
    return (
          <Container>
                 <MealDetailCard meal={data}></MealDetailCard>

                <div className="flex  py-10 justify-center">
                <Link to='/meals'>

                   <AwesomeButton 
                    type="anchor"
                    className="custom-awesome-btn"
                    style={{ backgroundColor: "#f76042", color: "white" }}>
                        See All
                   </AwesomeButton>
                   </Link>

                </div>
          </Container>
    );
};

export default MealDetails;