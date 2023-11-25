

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

import Container from '../Layout/Container';
import MealsCards from '../Components/MealsCards';

const Meals = () => {
  const axiosSecure = useAxiosSecure();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);

  const { data: meals = [] } = useQuery({
    queryKey: ['meal'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals');
      return res.data;
    },
  });

  const handleSearch = () => {
    const filtered = meals.filter((meal) =>
      meal.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  const applyFilters = () => {
    let filtered = [...meals];

    if (selectedCategory) {
      filtered = filtered.filter((meal) => meal.Category === selectedCategory);
    }

    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (meal) => meal.price >= parseFloat(minPrice) && meal.price <= parseFloat(maxPrice)
      );
    }

    setFilteredMeals(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const displayMeals = filteredMeals.length > 0 ? filteredMeals : meals;

  return (
    <Container>
      <div>
        <div className='flex gap-4 items-center justify-between mt-6'>
         <div>
         <input
            type='text'
            placeholder='Search by meal title'
            value={searchQuery}
            onChange={handleInputChange}
            className='input input-bordered'
          />
          <button onClick={handleSearch} className='btn bg-[#f76042] text-white'>
            Search
          </button>
         </div>

         
        <div>
        <select
            className='input input-bordered'
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value=''>All Categories</option>
            <option value='breakfast'>Breakfast</option>
            <option value='lunch'>Lunch</option>
            <option value='dinner'>Dinner</option>
          </select>

        
          <input
            type='number'
            placeholder='Min Price'
            value={minPrice}
            onChange={handleMinPriceChange}
            className='input input-bordered'
          />
          <input
            type='number'
            placeholder='Max Price'
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className='input input-bordered'
          />

          <button onClick={applyFilters} className='btn bg-[#f76042] text-white'>
            Search
          </button>
        </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {displayMeals.map((meal) => (
            <MealsCards key={meal._id} meal={meal} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Meals;
