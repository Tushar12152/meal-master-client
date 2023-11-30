import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import useAuth from "../../Hooks/useAuth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CheakOutForm = ({data}) => {
    const price=data?.price;
    const navigate=useNavigate()
    const packageName=data?.packageName;
    const [clientSecret,SetClientSecret]=useState('')
    const [transactionId,SetTransactionId]=useState('')
    const {user}=useAuth()
    const stripe=useStripe()
    const elements=useElements()
    const axiosSecure=useAxiosSecure()

    useEffect(()=>{
        axiosSecure.post('/create_payment-intent',{price})
        .then(res=>{
            console.log(res.data.clientSecret);
            SetClientSecret(res?.data?.clientSecret)
        })
    },[axiosSecure,price])

    const userEmail=user?.email
    
 
    const { data:userInfo=[] } = useQuery({
     queryKey: ['users'],
     queryFn: async () =>{
         const res=await axiosSecure.get(`/users/${userEmail}`)
 
         return res.data
     }
     
   })
  //  console.log(userInfo._id);

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!stripe || !elements){
            return;
        }

        const card= elements.getElement(CardElement)
        
        if(card===null){
            return
        }

        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('payment error--->' , error);
            toast.error(error.message)
        }else{
            console.log('payment Method--->',paymentMethod);
        }
   
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
             payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'blank',
                    name:user?.displayName || 'blank'
                }
             }
        })

        if(confirmError){
            console.log('error');
        }else{
            //  console.log(paymentIntent,'<---------------payment intenr');

             if(paymentIntent?.status=== "succeeded"){
                SetTransactionId(paymentIntent?.id)

                const payment={
                   date:new Date(),
                   email:user?.email,
                   price:price,
                   transactionId:paymentIntent?.id,
                   packageName:packageName,
                   status:'pending',

                }

                const res=await axiosSecure.post('/payments',payment)
                  if(res.data.insertedId){
                       swal('success', `Your payment is Success . your transaction id is: ${paymentIntent?.id} `,'success')
                       navigate(-1)

                       axiosSecure.patch(`/users/${userInfo?._id}`,{packageName})



                  }
             }
        }


    }



    
   




    // const handleBadge=()=>{
    //    console.log('badge update ',packageName);
    // }




    return (
        <form onSubmit={handleSubmit}> 
               <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#0a0a0a',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    <div className="mt-5">
    <button  className="btn bg-[#f76042] w-full  text-white" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    
    </div>
    {transactionId&& <p className="text-green-600">Your Transaction Id Is : {transactionId}</p>}
        </form>
    );
};

 CheakOutForm.propTypes={
    data:PropTypes.object,

}


export default CheakOutForm;