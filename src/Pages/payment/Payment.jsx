import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheakOutForm from "./CheakOutForm";
import Container from "../../Layout/Container";
import Title from "../../Shared/Title";
import { useLoaderData } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
     const data=useLoaderData()
    //  console.log(data);
    return (
       
            <Container>
                 <div className="mt-5">
                    <Title heading={'Payment'}></Title>
                <div  className=" mt-10">
                  <Elements stripe={stripePromise}>
                       <CheakOutForm data={data}></CheakOutForm>
                  </Elements>
            </div>
            </div>
            </Container>
        
    );
};

export default Payment;