import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { imageUpload } from "../Api/UploadImage";

const Register = () => {

    const [show,setShow]=useState(true)


    const handleLogin=async(e)=>{
           e.preventDefault()
           const form=e.target;
           const email=form.email.value;
           const password=form.password.value;
           const name= form.name.value;
           const photo=form.photo.files[0]
           const img=await imageUpload(photo)
           const image=img?.data?.display_url

           

           


           

           console.log(email,password,name,image);
    }




    return (
        <div>
             <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center ">
      
     
     
    </div>
    
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <img className='w-[30%] mx-auto mt-5 ' src={'https://i.ibb.co/BKMY06W/images.jpg'} alt="" />

    <p className='text-center mt-5 font-bold text-4xl animate-pulse text-[#f76042]'>Register Now !</p>
      <form onSubmit={handleLogin} className="card-body">





      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name='name' type="text" placeholder="Name" className="input input-bordered  w-full max-w-xs" required />
         
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input
                required
                type='file'
                id='image'
                name='photo'
                accept='image/*'
              />
         
        </div>



        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="email" className="input input-bordered  w-full max-w-xs" required />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
             <div className='relative'>
             <input name='password' type={show?"text":"password"} placeholder="password" className="input input-bordered  w-full max-w-xs" required />

             <span onClick={()=>setShow(!show)} className='absolute top-4 right-1'>{show? <FaEye></FaEye>:<FaRegEyeSlash></FaRegEyeSlash>}</span>
             </div>
          <label className="label">
       
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white bg-[#f76042]">Register</button>

          <p className='text-center py-3'>Have An Account? Please <Link to='/login'  className='text-[#f76042]'>Log In</Link></p>

        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;