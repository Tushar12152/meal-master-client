import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'


import swal from 'sweetalert'
import useAuth from '../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../Hooks/useAxiosSecure'

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user,logOut } = useAuth()
   const userEmail=user?.email
    const axiosSecure=useAxiosSecure()

   const { data=[] } = useQuery({
    queryKey: ['users'],
    queryFn: async () =>{
        const res=await axiosSecure.get(`/users/${userEmail}`)

        return res.data
    }
    
  })

// console.log(data);

  const handleLogOut=()=>{
    logOut()
    .then(()=>{
      swal("Log Out", "You are logged out ", "success");
 
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className='relative z-10'>
      <div className='flex flex-row items-center gap-3'>
        {/* Become A Host btn */}
        <div className='hidden md:block'>
         
        </div>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            {/* Avatar */}
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={user && user.photoURL ? user.photoURL : data?.image}
              alt='profile'
              height='30'
              width='30'
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
           
            {user?<>
          <p className='text-center'>{user && user.photoURL ? user.displayName : data?.name}</p>

              <Link
              to='/dashboard'
              className='px-4 py-3 mx-auto hover:bg-neutral-100 transition font-semibold'
            >
              Dashboard
            </Link>

            <button onClick={handleLogOut}  className='px-4 py-3  hover:bg-neutral-100 transition font-semibold'>Log out</button>
            </>:
              <>
               <button  className='px-4 py-3 mx-auto hover:bg-neutral-100 transition font-semibold'>
            <Link
              to='/login'
             
            >
              Login
            </Link>
              </button>


              <Link
              to='/register'
              className='px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold'
            >
              Register
            </Link>
              </>}
           
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown