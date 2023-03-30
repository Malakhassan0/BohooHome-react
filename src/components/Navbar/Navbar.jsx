import React from 'react'
import Axios  from 'axios';
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  let user_id = localStorage.getItem('id')
    let navigate = useNavigate();
    // useEffect(()=>{
    //   Axios.post(`http://localhost:8000/api/login`,data).then(res)
    // },[])
    async function logoutSubmit(e){
      e.preventDefault();
      await Axios.post(`http://127.0.0.1:8000/api/logout`).then(res=>{
        // console.log(res);
        if(res.data.status===200){
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          localStorage.removeItem('is_admin');
          localStorage.removeItem('id');
          navigate('/');
        }
      })
    }

    let AuthButtons='';
    if(localStorage.getItem('auth_token')&&localStorage.getItem('is_admin')){
      AuthButtons=(
        <div className='d-flex align-items-center'>
        <p className='clr9 fs-5 mb-0 me-3'>Welcome <span>{localStorage.getItem('auth_name')}</span></p>
        <div className="dropdown">
        <button className="dropbtn btn fw-semibold fs-5">Create</button>
      <div className="dropdown-content ">
        <option  className='me-2 d-block' disabled>Category</option>
        <div className='cat-list'>
        <Link to="CreateCategory" className='me-2 Link '>CreateCategory</Link>
        <Link to="ViewCategory" className='me-2  Link'>ViewCategories</Link>
        </div>
        <option  className='d-block' disabled>Product</option>
        <div className='cat-list mb-4'>
        <Link to="addProduct" className='me-2 Link '>CreateProduct</Link>
        <Link to="allProducts" className='me-2  Link'>ViewProducts</Link>
        </div>
      </div>
    </div>
      <Link className='text-decoration-none fw-semibold fs-5 l mb-0 mx-2' to='orders'>Orders</Link>
        {/* <li><Link to="CreateCategory" className='me-2'>CreateCategory</Link></li>
        <li><Link to="CreateProduct" className=''>CreateProduct</Link></li> */}
        <li className='nav-item fs-6'><button onClick={logoutSubmit} className='btn fw-semibold clr9'>Log Out</button></li>
      </div>
      )
    }else if(!localStorage.getItem('auth_token')){
        AuthButtons=(
         <ul className=' d-flex justify-content-around '>
           <li className='d-flex'><Link to="register">Register</Link></li>
          <li className='d-flex ms-5'><Link to="login" >Sign in</Link></li>
         </ul>
        );
    }else{
      AuthButtons=(        
        <div className='d-flex align-items-center'>
          <p className='clr9 fs-5 mb-0 ms-3 me-5'>Welcome <span>{localStorage.getItem('auth_name')}</span></p>
            <li className="position-relative"><Link to="cart"><i className="fa-solid fa-cart-shopping fs-4 shopping"></i></Link>
            </li>
                        {/* <div className="position-absolute cart-icon">
                            <span >0</span></div> */}
                            <li><Link to={`favorite/${user_id}`}><i className='fas fa-heart ms-5 fs-4'></i></Link></li>
          <li className='nav-item ms-2'><button onClick={logoutSubmit} className='btn fw-bold clr9 ms-4'>Log Out</button></li>
        </div>
          );
      }
       
      
  return (
    <>
         {/* <!-- nLinkvbar --> */}
         <nav className="navbar p-1 text-center sticky-top" id='first'>
        <div className="container d-flex justify-content-between align-items-center">
      
             {/* <!-- pages of nav --> */}
             <div className=" w-25 list-one">
                <ul className="list-unstyled d-flex  mb-0 justify-content-around w-100 align-items-center list">
                    <li><Link to="">Home</Link></li>
                    <li><Link to="shop">Shop</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="contact">Contact Us</Link></li>
                </ul>
            </div>
            {/* <!-- logo in nav --> */}
            <div className="d-flex justify-content-between align-items-center logo">
                <div className="me-1"><i className="fa-solid fa-chair chair"></i></div>
                <div>
                    <h1 className="mb-0 bohoo ">Bohoo</h1>
                    <h1 className="home mb-0">Home</h1>
                </div>
            </div>
            {/* <!-- cart and profile in nav --> */}
            <div className="  list-two">
                <ul className="list-unstyled d-flex justify-content-around mb-0 w-100 align-items-center">
                  
                   {AuthButtons}
                </ul>
            </div>
      {/* <!-- bar icon --> */}
      <div className="bar-icon ">
        <i className="fa-solid fa-bars bar"></i>
      </div>
      
        </div>

    </nav>
    </>
  )
}
