import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Container from "../Layout/Container";



import UpcomingMealCard from "../Components/UpcomingMealCard";
import { useLoaderData } from "react-router-dom";


const UpComingMeals = () => {
const upcomingLikes=useLoaderData()

  const axiosSecure = useAxiosSecure();


  // console.log(upcomingLikes);




  const { data = [],refetch } = useQuery({
    queryKey: ["upcoming-meal"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upcoming-meals`);
      return res.data;
    },
  });

  const upcoming=[...data]
// console.log(upcoming);
  return (
    <Container>
      <div className="mt-10">

        
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {
          upcoming.map(meal => <UpcomingMealCard key={meal._id} meal={meal} refetch={refetch} liked={upcomingLikes}></UpcomingMealCard> )
          }
        </div>
      </div>
    </Container>
  );
};

export default UpComingMeals;
