import axios from "axios";


const axiosSecure=axios.create({
     baseURL:'https://meal-master-server-three.vercel.app'
})


const useAxiosSecure = () => {

//      axiosSecure.interceptors.request.use(function(config) {
//         const token=localStorage.getItem('access-token')
//         //    console.log('request stop',token);
//            config.headers.authorization=`Bearer ${token}`
//           return config
//      },function(error){
//         return Promise.reject(error)
//      })

// axiosSecure.interceptors.response.use(function(response){
//     return response;
// },(error)=>{
//     console.log('status error',error);
//     return Promise.reject(error);
// })
     


    return axiosSecure;
};

export default useAxiosSecure;