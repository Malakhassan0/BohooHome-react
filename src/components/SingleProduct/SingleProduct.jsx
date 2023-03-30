import React, { useEffect, useState } from 'react'
import  Helmet  from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import  Axios from 'axios';
import './SingleProduct.css'
import  swal  from 'sweetalert';


export default function SingleProduct() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [Product,getProduct]=useState([])
    const [loading,setLoading]=useState(false);
    const [quantity,setQuantity]=useState(1)
  
    const handleClick = (e) => {
      e.preventDefault();   
      let current = e.currentTarget
      // console.log(current.className)
      if(current.classList.contains('fa-regular')){
        current.classList.add('fa-solid')
        current.classList.remove('fa-regular')
      }else{
        current.classList.add('fa-regular')
        current.classList.remove('fa-solid')
      }
    };

    const handleDecrement=()=>{
      if(quantity>1){

        setQuantity(prevCount => prevCount - 1)
      }
    }
    const handleIncrement=()=>{
      if(quantity<10){
        setQuantity(prevCount => prevCount + 1)
      }
    }
    const us_id= localStorage.getItem('id')
const addToCart=(e)=>{
  e.preventDefault()
  const data={
    product_id: Product.id,
    quantity: quantity,
    user_id:us_id,
    // checked:1
  }
  Axios.post(`http://127.0.0.1:8000/api/storeCart`,data).then(res=>{
    console.log(res);
    if(res.data.status===200){
      swal('Successfully',res.data.message,'success')
      navigate('/shop')
    }
    else{
      swal('Warning',res.data.message,'warning')
    }
  })
}

    useEffect(()=>{
      Axios.get(`http://127.0.0.1:8000/api/product/${id}`).then(res=>{
        if(res.data.status===200){
          // console.log(res);
          getProduct(res.data.product)
          setLoading(false)
        }else if(res.data.status===409){
          swal('Warning',res.data.message,'warning')
        }else{
          swal('Warning',res.data.message,'error')
        }
      })
    },[id])
    if(loading){
      return <h4>Loading Products</h4>
    }else{
      var avail_stock=''
      if(Product.quantity>0){
      avail_stock = <div>
            <label htmlFor="" className='btn btn-success px-4 mt-4'>In Stock</label>
            <div className="input-group w-25 mt-5 m-auto">
              <button type='button' onClick={handleDecrement} className=' input-group-text'>-</button>
              <div  className=' form-control text-center'>{quantity}</div>
              <button type='button' onClick={handleIncrement}  className=' input-group-text'>+</button>
            </div>
      </div>
      }else{
        avail_stock = <div>
            <label htmlFor="" className='btn btn-danger px-4 mt-4'>Out of Stock</label>
            </div>
      }
    }
  return (
    <>
    <Helmet>
    <link rel="icon" href="/images/icon4.png" />
        <title>Bhoo</title>
    </Helmet>
      <section className='single'>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-4">
            <img src={`http://127.0.0.1:8000/uploads/${Product.image}`} alt=""  className='w-100 h-100 rounded '/>
            </div>
            <div className="col-md-6">
            <h3>{Product.name}</h3>
            <button className='btn float-end fa'  >
               <i onClick={(e)=>{handleClick(e)}} className='fa-regular fa-heart'></i>  </button> 
              <p className='text-muted'>{Product.description}</p>
              <div className='d-flex justify-content-between'>
              <span>Price:{Product.price}</span> <span className='pe-5'>Discount:{Product.discount}</span>
              </div>  
                {avail_stock}
            </div>
              <div className='d-flex justify-content-center '>
            <button className='btn mt-3 w-25 ' onClick={addToCart} id='button2'>Add To Cart</button>
            </div>
          </div>
        </div>
        </section>  
        </>
  )
}
