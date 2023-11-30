import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheakOutForm from "./CheakOutForm";
import Container from "../../Layout/Container";
import Title from "../../Shared/Title";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
     const data=useLoaderData()
    //  console.log(data);
    return (
       
            <Container>
               <Helmet>
                  <title>Meal-Master || payment</title>
             </Helmet>
                 <div className="mt-5">
                    <Title heading={'Payment'}></Title>

                <div className=" lg:w-[50%] mx-auto mt-10 shadow-2xl rounded-xl bg-gray-200">
                    
                <h1 className="text-xl font-semibold p-10">Total : ${data?.price}</h1>
                <div  className=" mt-10 p-10">
                  <Elements stripe={stripePromise}>
                       <CheakOutForm data={data}></CheakOutForm>
                  </Elements>
               </div>
                </div>
            </div>
            </Container>
        
    );
};

export default Payment;