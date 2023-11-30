import Container from "../Layout/Container";


const Banner = () => {
    return (
         <Container>

<div
            className="relative min-h-screen rounded-lg mt-5 z-0"
            style={{ backgroundImage: `url('https://i.ibb.co/F6k84gc/Screenshot-1.png')`  , backgroundRepeat:'no-repeat',backgroundSize:'cover',}} // Replace 'path_to_your_image.jpg' with the actual path to your image
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center py-20">
                <h1 className="text-xl font-bold mb-4 animate-bounce">Discover Delicious Meals</h1>
                <p className="text-lg mb-4">Explore a Variety of Mouthwatering Recipes</p>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="py-2 px-4 text-black mr-2 w-60 border rounded-l focus:outline-none"
                    />
                    <button className="bg-[#f76042] py-2 px-4 text-white rounded-r">
                        Search
                    </button>
                </div>
            </div>
        </div>
         </Container>
    );
};

export default Banner;
