import swal from "sweetalert";
import Title from "../Shared/Title";
import Container from "../Layout/Container";

const Contact = () => {

    const handleSend=e=>{
         e.preventDefault()
         swal("success","Your message is successFully send to Admin panel","success")
    }


    return (
        <Container>
   
         <div className="my-10">
         <Title heading={'Contact Us'}></Title>
         </div>

              <form onSubmit={handleSend}>
          


          <div className="flex w-full   gap-2">
             
        


              <div className="form-control w-[50%]">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input  type="text" placeholder="First Name" className="input input-bordered border-[#f76042] w-full" required />
              </div>

              <div className="form-control w-[50%]">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input  type="text" placeholder="Last Name" className="input input-bordered border-[#f76042] w-full" required />
              </div>





          </div>
           

          <div className="flex w-full   gap-2">
             
          <div className="form-control w-[50%]">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input name="description" type="text" placeholder="Email" className="input input-bordered border-[#f76042] w-full " required />
              </div>

              <div className="form-control w-[50%]">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input name="description" type="text" placeholder="Phone" className="input input-bordered border-[#f76042] w-full " required />
              </div>

          </div>

         <textarea placeholder="Write Your Text.................." className="border-2 border-[#f76042] w-full mt-6" name="" id="" cols="30" rows="10"></textarea>
         

             <input className="btn w-full mt-5 bg-[#f76042] text-white" type="submit" value="Send" />
        </form>
        </Container>
    );
};

export default Contact;