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

// console.log(meals);
const breakfast=meals.filter(meal=>meal.Category==='breakfast')
const lunch=meals.filter(meal=>meal.Category==='lunch')
const dinner=meals.filter(meal=>meal.Category==='dinner')

// console.log(breakfast,lunch,dinner);

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
      {
         meals.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
      }
      </div>
    </TabPanel>
    <TabPanel>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
      {
         breakfast.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
      }
      </div>
    </TabPanel>

    <TabPanel>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
      {
         lunch.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
      }
      </div>
    </TabPanel>

    <TabPanel>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
      {
         dinner.map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
      }
      </div>
    </TabPanel>
  </Tabs>
        </div>
     </Container>
    );
};

export default MealsByCategory;