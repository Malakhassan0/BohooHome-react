import React from 'react'
import "./Home.css"

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <Helmet>
    <link rel="icon" href="images/icon4.png" />
        <title>BohooHome</title>
    </Helmet>
        {/* <!-- carousel --> */}
        
    <section className=" carousel " >
       <div className="container+ ">
        <div id="carouselExampleSlidesOnly" className="carousel slide position-relative" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="4" aria-label="Slide 5"></button>
              </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="images/Emily-Henderson-Mountain-House-Kitchen-LoRes81.jpg" className=" d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="images/pexels-alex-qian-2343466.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                  <img src="images/pexels-max-vakhtbovych-5998120.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                  <img src="images/pexels-huseyn-kamaladdin-667838.jpg" className=" d-block w-100" alt="..."/>
                </div>
              <div className="carousel-item">
                <img src="images/pexels-andrew-neel-7932264.jpg" className="d-block w-100" alt="..."/>
              </div>
            </div>
          </div>
       </div>
    </section>
    {/* <!-- shipping --> */}
    <section className="shipping">
        <div className="container my-5">
            <div className="row d-flex mb-2 justify-content-around box">
                <div className="col-md-2 py-3 gy-3 border">
                    <div  className="d-flex justify-content-center"><i className="fa-solid fa-truck-fast"></i></div>
                    <div className="text-center"><p className="fs-5 fw-bolder">Free Shipping</p>
                        <p className="text-muted">Orders Over 100$</p></div>
                </div>
                <div className="col-md-2 py-3 gy-3 border box">
                    <div className="d-flex justify-content-center"><i className="fa-solid fa-gifts"></i></div>
                    <div className="text-center"><p className="fs-5 fw-bolder">Smart Gift Card</p>
                        <p className="text-muted">Buy $1000 to get card</p></div>
                    </div>
                <div className="col-md-2 py-3 gy-3 border box">
                    <div className="d-flex justify-content-center"><i className="fa-solid fa-wallet"></i></div>
                    <div className="text-center"><p className="fs-5 fw-bolder">    Quick Payment</p>
                        <p className="text-muted">100% Secure Payment</p></div>
                    </div>
                <div className="col-md-2 py-3 gy-3 border box">
                    <div className="d-flex justify-content-center"><i className="fa-solid fa-headset"></i></div>
                    <div className="text-center"><p className=" fs-5 fw-bolder">24/7 Support</p>
                        <p className=" text-muted">Quick Support</p></div>
                    </div>
                    </div>
                </div>
            {/* </div>
        </div> */}
    </section>

    {/* <!-- shop-now --> */}
    <section className="shop-now">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
                <img src="images/newsletter-2.jpg" className='w-100' alt=""/>
            </div>
            <div className="col-md-6">
                <h2 className="pt-3">Designing Modern, Unique</h2>
                <h2 className="mb-5 pb-3">& <span>Smart Furniture</span></h2>
                <p className="fw-semibold">Shop from the comfort of home and order with the click of a button. Our brand-new exclusive to online print and rug shop-now showcases so much more than we have in-store.</p>
                <button className="mt-5 btn"><Link className="text-decoration-none"to="shop">Shop Now</Link></button>
            </div>
          </div>
        </div>
    </section>

    {/* <!--  collection --> */}
    <section className="collection">
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2>Inspiration collection</h2>
            </div>
            <div className="row d-flex justify-content-around">
                <div className="col-md-3 p-0 mt-5 img-div left-round">
                    {/* <!-- <a href="">
                    </a> --> */}
                    <div className="living">Living Room</div>
                    <img src="images/pexels-ilya-shakir-2440471.jpg " className="img-1 w-100 h-100 " alt=""/>

                </div>
                <div className="col-md-3 p-0 mb-5 img-div overflow-hidden">
                    {/* <!-- <a href="">
                    </a> --> */}
                    <div className="living">Tables</div>
                    <img src="images/Today! Literally Everything’s On Sale at Urban Outfitters.jpg " className="img-2 w-100 h-100 " alt=""/>
                </div>
                <div className="col-md-3 p-0 mt-5 img-div right-round ">
                    {/* <!-- <a href="">
                    </a> --> */}
                    <div className="living">Bohoo</div>
                    <img src="images/Absolutely In Love.jpg " className="img-3 w-100 h-100" alt=""/>
                </div>
            </div>
        </div>

    </section>

    {/* <!--bgimage  --> */}
    <section className="bg-img">
        <div className="main">
        </div>
        <div className="text subs p-5 rounded w-50">
            <p className="text-muted">Join our mailing list!</p>
            <h3>Fancy $30* off your first order?</h3>
            <div className="d-flex mt-5">
                <input type="text" className="form-control  pb-1 w-75 position-relative" placeholder="Enter your email to Subscribe"/>
                <button className="btn position-absolute  ">Subscribe</button>
            </div>
        </div>
    </section>

    {/* <!-- categories --> */}
<section className="categories ">
    <div className="container my-5">
        <div className="row d-flex justify-content-between">
            <div className="col-md-3 position-relative g-2 rounded cardd">
                <img src="images/kitchen.png" className="w-100 h-100"alt=""/>
                <div className="bg-white position-absolute rounded  card-1 top-50 start-50"><button className="btn">Kitchen</button></div>
            </div>
            <div className="col-md-3  g-2">
                <div className="position-relative cardd ">
                    <img src="images/istockphoto-1293762741-170667a.jpg" className="w-100 h-100"alt=""/>
                    <div className="bg-white position-absolute  rounded card-1 top-50 start-50 "><button className="btn">Living</button></div>
                </div>
                <div className="position-relative mt-4 cardd"><img src="images/istockphoto-1329433253-170667a.jpg" className="w-100 h-100 "alt=""/>
                    <div className="bg-white position-absolute rounded  card-1 top-50 start-50"><button className="btn">Storage</button></div></div> 
            </div>
            <div className="col-md-3 g-2 position-relative cardd">
                <img src="images/This Cozy Cocoon Chair Is Perfect For Reading.jpg" className="w-100"alt=""/>
                <div className="bg-white position-absolute rounded  card-1 top-50 start-50"><button className="btn">Chair</button></div>
            </div>
        </div>
    </div>
</section>

<section className='welcome'>
<div className="container py-5">
    <div className="row">
        <div className="col-md-8 d-flex flex-column align-items-center">
            <p className='h1 welcome-p'> Welcome To BOhooHOme</p>
            <p className='ms-5 design'>Make Your House Design</p>
        </div>
        <div className="col-md-3 d-flex align-items-center">
       
            <button className='btn '> Buy Now</button>
            
        </div>
    </div>
</div>
</section>
{/* footer */}
<section className='foot pb-5'>
<div className="container ">
    <div className="row pb-4 justify-content-between">
        <div className="col-md-6 d-flex align-items-center">
            <div className='d-flex align-items-center'>
            <img src="images/icon4.png" className="w-75"alt="" />
            </div>
            <div>
          <p>  <i className="fa-solid fa-phone me-3"></i>
            <span>Phone: +2002100400</span></p>
          <p>  <i className="fa-regular fa-envelope me-3"></i>
            <span>Email: info@Bohoo.com</span></p>
          <p>  <i className="fa-solid fa-location-dot me-3"></i>
            <span>Address:street,Cairo,Egypt</span></p>
            </div>

        </div>
        <div className="col-md-6 d-flex justify-content-around">
            <div className='d-flex flex-column text-center support'>
                <h4>Support</h4>
                <Link to="contact" className='supp-link'>Contactus</Link>
                <Link to="about" className='supp-link'>About</Link>
            </div>
      
            <div className='d-flex flex-column text-center  support'>
                <h4>Products</h4>
                <Link to="shop" className='supp-link'>Shop</Link>
            </div>
            </div>
   
</div>
</div>
</section>
    </>
  )
}
