import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../Api/UploadImage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import swal from "sweetalert";


const AddMealForm = () => {
  
    const { user } = useAuth()
    const userEmail=user?.email
     const axiosSecure=useAxiosSecure()
 
    const { data=[] } = useQuery({
     queryKey: ['users'],
     queryFn: async () =>{
         const res=await axiosSecure.get(`/users/${userEmail}`)
 
         return res.data
     }
     
   })



 




    const [category, setCategory] = useState('breakfast');
  
    const handleSelectChange = (event) => {
      setCategory(event.target.value); 
    };
  
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const onSubmit = async (data) => {
      try {
        const imageFile = data.image[0]; 
  
        const imageUrl = await imageUpload(imageFile);
        // console.log('Image URL--------->', imageUrl.display_url);
        const image=imageUrl?.data?.display_url
  
       
        const meal = { ...data, Category: category, imageUrl: image };
        // console.log( meal);
  
       
        const res=await axiosSecure.post('/meals',meal)
        if(res?.data?.insertedId){
            swal("Wow!", "Your Meal is uploaded Succesfully", "success")
        }





      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };



    return (
        <div>
               <form onSubmit={handleSubmit(onSubmit)}>
    

      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input  {...register("Title")} type="text" placeholder="Meals Title" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <input  {...register("ingredients")} type="text" placeholder="Ingredients" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input  {...register("description")} type="text" placeholder="Description" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input  {...register("price")} type="text" placeholder="Price" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input  {...register("rating")} type="text" placeholder="Rating" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input  {...register("date")} type="date" placeholder="Date" className="input input-bordered" required />
        </div>
      </div>


    

      
      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Likes</span>
          </label>
          <input defaultValue='00' {...register("likes")} type="text" placeholder="Likes"  className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Review</span>
          </label>
          <input defaultValue='00'  {...register("review")} type="text" placeholder="Review" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Admin Name</span>
          </label>
          <input defaultValue={ data?.name} {...register("admin_name")} type="text" placeholder="Distributor Name" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          <label className="label">
            <span className="label-text">Admin Email</span>
          </label>
          <input defaultValue={data.email}  {...register("admin_email")} type="email" placeholder="Distributor Email" className="input input-bordered" required />
        </div>
      </div>


      <div className="lg:flex gap-4">
      <div className="form-control w-[50%]">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input  {...register("image")} type="file" placeholder=""   accept='image/*' id="image" className="input input-bordered" required />
        </div>

      <div className="form-control  w-[50%]">
          
          <label htmlFor="selectOption">Category</label>
      <select className="input input-bordered" id="category" name="category" value={category} onChange={handleSelectChange}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
    
      </select>
        </div>
      </div>



      <div className=" lg:flex gap-4 mt-8">
      <div className="form-control w-[50%]">
         
          <input  type="submit" value='Add Meal'  className="input input-bordered bg-[#f76042] text-white" />
        </div>

      <div className="form-control  w-[50%]">
         
          <input value='Add To Upcoming'   type="submit" className="input input-bordered bg-[#f76042] text-white"  />
        </div>
      </div>

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

    
    </form>
        </div>
    );
};

export default AddMealForm;