import  { useState } from 'react';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [show,setShow]=useState(true)
    const {SignIn}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()



    
   


    const handleLogin=(e)=>{
           e.preventDefault()
           const form=e.target;
           const email=form.email.value;
           const password=form.password.value;

           SignIn(email,password)
           .then(res=>{
              if(res?.user){
                 toast.success('Logged In')
                 navigate(location?.state ? location.state:"/")
              }
           })
           .catch(err=>{
                toast.error(err.message)
           })
           console.log(email,password);
    }


    return (
        <div>


<Helmet>
                  <title>Meal-Master || Login</title>
             </Helmet>


             <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center ">
      
     
     
    </div>
    
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <img className='w-[30%] mx-auto mt-5 ' src={'https://i.ibb.co/BKMY06W/images.jpg'} alt="" />

    <p className='text-center mt-5 font-bold text-4xl animate-bounce text-[#f76042]'>Login Here !</p>
      <form onSubmit={handleLogin} className="card-body">

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="email" className="input input-bordered input-warning w-full max-w-xs" required />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
             <div className='relative'>
             <input name='password' type={show?"text":"password"} placeholder="password" className="input input-bordered input-warning w-full max-w-xs" required />

             <span onClick={()=>setShow(!show)} className='absolute top-4 right-1'>{show? <FaEye></FaEye>:<FaRegEyeSlash></FaRegEyeSlash>}</span>
             </div>
          <label className="label">
       
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white bg-[#f76042]">Log In</button>

          <p className='text-center py-3'>New Here? Please <Link to='/register'  className='text-[#f76042]'>Register</Link></p>

        </div>
      </form>
     

    </div>
  </div>
</div>
        </div>
    );
};

export default Login;