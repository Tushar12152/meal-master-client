import Container from "../Layout/Container";
import Title from "../Shared/Title";

const AboutUs = () => {
    return (
      <Container>

           <div className="my-12"> 
               <Title heading={'About Us '}></Title>
           </div>
           <div className="bg-[#f76042] text-white rounded-lg w-[70%] mx-auto">
                 <p className="text-center p-5">If you are looking to set up a website with a beautiful, clean and flat design style, you will need to check out the Electronics Store Layout Pack for Divi. This modern layout pack beautifully combines touches of colors with clean product photography and well-thought-out typography!</p>

                 <div className="flex flex-col lg:flex-row justify-between">
                     <div className="p-5">
                         <h1 className="font-bold text-xl text-center">Address</h1>
                         <p className="text-center">Los Angeles, USA</p>
                     </div>
                     <div className="p-5">
                          <h1  className="font-bold text-xl text-center">Email</h1>
                          <p className="text-center">mealmaster@gmail.com</p>
                     </div>

                 </div>
        </div>
      </Container>
    );
};

export default AboutUs;