import React, { useState } from 'react'
import "./Register.css"
import { Helmet } from 'react-helmet';
import  Axios  from 'axios';
import { useNavigate } from "react-router-dom";
import Joi from 'joi';

export default function Register() {
    let navigate = useNavigate();
    const [IsLoading ,setIsLoading]= useState(false);
    let [user,setUser]= useState({
      fname:"",
      lname:"",
      email:"",
      password:"",
     phone:"",
     address:"",
     error_list:[]
   });
   function userRegistrationForm(e) {
     let newUser = {...user};
     newUser[e.target.name]=e.target.value;
     setUser(newUser);
    //  console.log(newUser);
     
   };
   async function submitRegesteration(e){   
    e.preventDefault();
    setIsLoading(true)
    let data = {
      fname:user.fname,
      lname:user.lname,
      email:user.email,
      password:user.password,
     phone:user.phone,
     address:user.address,
    }
    // Axios.get('/sanctum/csrf-cookie').then(async response => {
      await Axios.post(`http://localhost:8000/api/register`,data).then( res=>{
        // console.log(res); 
      if(res.data.status_code===200){
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_name',res.data.data.fname);
        
        setIsLoading(false)
        navigate('/login');
        // console.log('hii')
      }else{
        setUser({...user, error_list: res.data.validation_errors});
        setIsLoading(false)
        // console.log("error");
      }
      });
      // e.target.reset();
  // });
   }

  //  function validationRegister(){
  //   let scheme=Joi.object({
  //     fname: Joi.string().min(3).max(15).required,
  //     lname:Joi.string().min(3).max(15).required,
  //     email: Joi.string().email({tlds:{allow:["com","org","net"]}}).required,
  //     password: Joi.string().pattern(/^[A-Z][a-z]{3,6}$/),
  //     phone: Joi.string().required(),
  //     address: Joi.string().min(5).max(100).required
  //   })
  //   scheme.validate(user)
  //  }
  return (
    <>
           <Helmet>
    <link rel="icon" href="images/icon4.png" />
        <title>Sign-up</title>
    </Helmet>
     {/* <!-- htmlForm Registeration --> */}
     <section className="regist ">
        <div className="container d-flex justify-content-center pb-3 ">
            <form method='POST' action="" className="py-3 my-4 rounded w-50 htmlForm" onSubmit={submitRegesteration}>
              
               <div className=" d-flex flex-column align-items-center justify-content-center">
               {/* <input type="hidden" name="_token" value={token}></input> */}
                <label htmlFor="first-name" className="mb-1 form-label">First Name</label>
                <input type="text" onChange={userRegistrationForm} value={user.fname} placeholder="enter your first name" className="form-control w-50 text-center" id="first-name" name="fname"/>
               <span className='text-danger'>{user.error_list.fname}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="last-name" className="mb-1 form-label">Last Name</label>
                <input type="text" onChange={userRegistrationForm} value={user.lname}  placeholder="enter your last name" className="form-control w-50 text-center" id="first-name" name="lname"/>
               <span className='text-danger'>{user.error_list.lname}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="email" className="mb-1 form-label">Email</label>
                <input type="email" onChange={userRegistrationForm} value={user.email} placeholder="enter your email" className="form-control w-50 text-center" id="email" name="email"/>
               <span className='text-danger'>{user.error_list.email}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="pass" className="mb-1 form-label">Password</label>
                <input type="password" onChange={userRegistrationForm} value={user.password} placeholder="enter password" className="form-control w-50 text-center"  id="pass" name="password"/>
               <span className='text-danger'>{user.error_list.password}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="num" className="mb-1 form-label">Mobile Number</label>
                <input type="text" onChange={userRegistrationForm} value={user.phone}  placeholder="enter your phone number" className="form-control w-50 text-center" id="num" name="phone"/>
               <span className='text-danger'>{user.error_list.phone}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="add" className="mb-1 form-label">Address</label>
                <input type="text" onChange={userRegistrationForm} value={user.address} placeholder="enter your address" className="form-control w-50 text-center" id="add" name="address"/>
               <span className='text-danger'>{user.error_list.address}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center mt-2">
                <button className="btn" name="register-btn" id="regist-btn">{IsLoading == true?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
                </div>
            </form>
        </div>
       </section>
    </>
  )
}
