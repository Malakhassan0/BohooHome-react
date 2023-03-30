import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function Login() {
  let navigate = useNavigate();
  const [IsLoading ,setIsLoading]= useState(false);
  let [userCred,setUserCred]= useState({
    email:"",
    password:"",
    error_list:[]
 });
  function login(e) {
   let user = {...userCred};
    user[e.target.name]=e.target.value;
    setUserCred(user);
  }

  async function userLoginForm(e){
  e.preventDefault();
  setIsLoading(true)
  let data={
    email:userCred.email,
    password:userCred.password,
  }
    await Axios.post(`http://localhost:8000/api/login`,data).then(res=>{
    // console.log(res);
    if(res.data.status_code===200){
      localStorage.setItem('auth_token',res.data.token);
      localStorage.setItem('auth_name',res.data.userData.fname);
      localStorage.setItem('id',res.data.userData.id)
      if(res.data.userData.role==='admin'){
        localStorage.setItem('is_admin',res.data.userData.role);
      }
      setIsLoading(false)
      navigate('/');
    }
    else{
      setUserCred({...userCred, error_list: res.data.validation_errors});
      setIsLoading(false)
    }
  });
 }
  return (
    <>
       <Helmet>
    <link rel="icon" href="images/icon4.png" />
        <title>Sign-In</title>
    </Helmet>
         {/* <!-- htmlForm login --> */}
         <section className="login mb-2">
        <div className="container d-flex justify-content-center align-items-center h-100">
            <form method='POST' onSubmit={userLoginForm} action="" className="mt-4 py-4 rounded w-50" >
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="email form-label" className="mb-1">Email</label>
                <input type="email" onChange={login} placeholder="enter your email" className="form-control w-50 text-center" id="email" name="email"/>
                <span className='text-danger'>{userCred.error_list.email}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="pass" className="mb-1 form-label">Password</label>
                <input type="password" onChange={login} placeholder="enter your password" className="form-control w-50 text-center"  id="pass" name="password"/>
                <span className='text-danger'>{userCred.error_list.password}</span>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center mt-4
               ">
                <button className="btn" name="log-btn" id="login-btn">{IsLoading === true?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>
                </div>
            </form>
        </div>
       </section>
    </>
  )
}
