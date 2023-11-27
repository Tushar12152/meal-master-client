import { useLoaderData, useNavigate } from "react-router-dom";
import Title from "../Shared/Title";
import swal from "sweetalert";

import { useForm } from "react-hook-form";
import { useState } from "react";

import useAxiosSecure from "../Hooks/useAxiosSecure";



const UpdateMeals = () => {
     const meals=useLoaderData()
    const navigate=useNavigate()

    // console.log(meal._id);
    
      const axiosSecure=useAxiosSecure()
  
   
 
 
 
  
 
 
 
 
     const [category, setCategory] = useState('breakfast');
   
     const handleSelectChange = (event) => {
       setCategory(event.target.value); 
     };
   
     const { register, handleSubmit, formState: { errors }, } = useForm();
     
     const onSubmit = async (data) => {
       try {
        
         const meal = { ...data, Category: category};
        
        //  console.log(meal);
   
      
         const res=await axiosSecure.patch(`/meals/${meals._id}`,meal)
         console.log(res.data.modifiedCount);
         if(res.data.modifiedCount>0){
            swal('success','Your Review is updated success','success')
            navigate(-1)
         }
 
 
 
 
 
       } catch (error) {
         console.error('Error uploading image:', error);
       }
     };
 




    return (
        <div>
            <Title heading={`Update '${meals.Title}'`}></Title>


            <div>
               <form onSubmit={handleSubmit(onSubmit)}>
    

      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input defaultValue={meals?.Title}  {...register("Title")} type="text" placeholder="Meals Title" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <input  defaultValue={meals?.ingredients}  {...register("ingredients")} type="text" placeholder="Ingredients" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input   defaultValue={meals?.description} {...register("description")} type="text" placeholder="Description" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input  defaultValue={meals?.price}  {...register("price")} type="text" placeholder="Price" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input  defaultValue={meals?.rating}  {...register("rating")} type="text" placeholder="Rating" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input  defaultValue={meals?.date}  {...register("date")} type="date" placeholder="Date" className="input input-bordered" required />
        </div>
      </div>


    

      
   


    


      <div className="lg:flex gap-4">
     

      <div className="form-control  w-[100%]">
          
          <label htmlFor="selectOption">Category</label>
      <select className="input input-bordered" id="category" name="category" value={category} onChange={handleSelectChange}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
    
      </select>
        </div>
      </div>



      <div className=" lg:flex gap-4 mt-8">
      <div className="form-control w-[100%]">
         
          <input  type="submit" value='Update Meal'  className="input input-bordered bg-[#f76042] text-white" />
        </div>

    
      </div>

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

    
    </form>
        </div>
            
        </div>
    );
};

export default UpdateMeals;