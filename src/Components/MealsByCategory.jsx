import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Title from '../Shared/Title'
import Container from '../Layout/Container';
import useAxiosSecure from './../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MealsCard from './MealsCard';

const MealsByCategory = () => {

  const axiosSecure=useAxiosSecure()

  const { data:meals=[] } = useQuery({
   queryKey: ['meal'],
   queryFn: async () =>{
       const res=await axiosSecure.get('/meals')

       return res.data
   }
   
 })

console.log(meals);


    return (
     <Container>
            <div className='my-20'>
             
             <Title heading={'Our Meals'}></Title>

             <Tabs>
    <TabList>
      <Tab>All</Tab>
      <Tab>BreakFast</Tab>
      <Tab>Lunch</Tab>
      <Tab>Dinner</Tab>
    </TabList>

    <TabPanel>
      {
         meals.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
      }
    </TabPanel>
    <TabPanel>
      <h2>break fast</h2>
    </TabPanel>

    <TabPanel>
      <h2>lunch</h2>
    </TabPanel>

    <TabPanel>
      <h2>dinner</h2>
    </TabPanel>
  </Tabs>
        </div>
     </Container>
    );
};

export default MealsByCategory;