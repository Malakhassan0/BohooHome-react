import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import './Contact.css'
import  Axios from 'axios';
import  swal  from 'sweetalert';


export default function Contactus() {
  const [IsLoading ,setIsLoading]= useState(false);
  let [user,setUser]= useState({
    fname:"",
    lname:"",
    email:"",
    message:"",
    error_list:[]
 });

 function contact(e) {
  let ucontact = {...user};
  ucontact[e.target.name]=e.target.value;
   setUser(ucontact);
  //  console.log(user);
 }
async function createContact(e){
  e.preventDefault();
  setIsLoading(true);
  let data={
    fname:user.fname,
    lname:user.lname,
    email:user.email,
    message:user.message,
  }
  await Axios.post(`http://127.0.0.1:8000/api/createContactus`,data).then(res=>{
    if(res.data.status===200){
      // setUser({...user,
      //   fname:'',
      //   lname:'',
      //   email:'',
      //   message:'',
      //   error_list:[]
      // })
      swal('Sucsessfully',res.data.message,'success')
      setIsLoading(false)
    }
    else{
      setUser({...user, error_list: res.data.validation_errors});
      setIsLoading(false)
    }
  })
}

  return (
    <>
    <Helmet>
    <link rel="icon" href="images/icon4.png" />
 <title>ContactUS</title>
</Helmet>
<section className='contact'>
<div>
<div className="container pt-5">
 <h1>Contact Us</h1>
</div>
</div>
<div className="bg-cont">
 <img src="images/About-title-img.jpg" className="w-100 h-100" alt="" />
 </div>
 <div className="container py-5 h-75 ">
 <div className="row align-items-center pt-5">
   <div className="col-md-6 ">
   <h2 className='fw-bold'>LET'S MAKE SOMETHING </h2>
   <h2 className='fw-bold'>UNIQUE TOGETHER</h2>
   <h3 className='ms-5'>Contact us</h3>
   </div>
  <div className="col-md-6">

   <form method='POST' onSubmit={createContact}>
    <div className="d-flex justify-content-between">

     <div className='d-flex flex-column me-5 my-3'>
     <input type="text"  className='form-control mb-2'  onChange={contact}  name='fname' placeholder='First Name'/>
     <small className='text-danger d-block'>{user.error_list.fname}</small>
     </div>
     <div className='d-flex  flex-column me-5 my-3'>
     <input type="text"  className='form-control mb-3' onChange={contact}  name='lname' placeholder='Last Name'/>
     <small className='text-danger d-block'>{user.error_list.lname}</small>
     </div>
    </div>
     <input type="text" className='form-control d-block mb-3'name='email' onChange={contact}  placeholder='Email Address' />
     <small className='text-danger'>{user.error_list.email}</small>
     <textarea className=' form-control mt-4 mb-2' name='message' onChange={contact}  placeholder='Leave Your Message Here'>
     </textarea>
     <small className='text-danger'>{user.error_list.message}</small>
       
     <div className="d-flex w-100 justify-content-center">

     <input type="submit"   className='btn rounded' id='cont-btn' />
     </div>
   </form>

  </div>
 </div> 
 </div>


</section>

</>
  )
}
