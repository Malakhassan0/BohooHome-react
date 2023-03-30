import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import  Axios  from 'axios';
import swal  from 'sweetalert';
import "./ProductsbyCat.css"


export default function ProductsbyCat() {
  let navigate = useNavigate();
  const [loading,setLoading]=useState(true);
  const [product,setProduct]=useState([]);
  const [category,setCategory]=useState([]);
  const {name}=useParams()
  const productCount= product.length
  


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
    
      const cat=name 
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/products/${cat}`).then(res=>{
            // console.log(res)
            if(res.data.status===200){
                setProduct(res.data.product_data.product)
                setCategory(res.data.product_data.category)
                setLoading(false)
            }else if(res.data.status===400){
                swal('Warning',res.data.message,'')
            }else{
                swal('Warning',res.data.message,'error')
                navigate('/shop')
            }
        })
    },[navigate,cat])
    if(loading){
        return <h4>Loading Product Details...</h4>
    }else{
        var showProductList=''
        if(productCount){

        
        showProductList= product.map((item,index)=>{
            return (
                <div className="col-md-4 my-2 pb-5"key={index} >
                <div className="carddd rounded shadow pb-1" >
           <div >
             <Link to={`/single/${item.id}`}>
             <img src={`http://127.0.0.1:8000/uploads/${item.image}`} alt=""  className='w-100 h-100 rounded '/>
             </Link>     
             </div>
             <div className='ms-3 '>
               <h3>{item.name}</h3>     
               <button className='btn float-end fa'  >
               <i onClick={(e)=>{handleClick(e)}} className='fa-regular fa-heart'></i>  </button>        
               <p>{item.description}</p>
               <div className='d-flex justify-content-between'>
               <span>Price:{item.price}</span> <span className='pe-5'>Discount:{item.discount}</span> 
               </div>             
             </div>
             <div className='d-flex justify-content-center '>
             <button className='btn mt-2 ' id='button1'>Add To Cart</button>
             </div>
           </div>
           </div>
            )
        })
      }else{
        showProductList=
        

        <div className="col-md-12 mt-5 ">
          <h4 className='foun'>No Products Found For {cat} Category</h4>
        </div>
       
      }
    }
  return (
    <>
        <Helmet>
   <link rel="icon" href="/images/icon4.png" />
       <title>Shop-Now</title>
   </Helmet>
   <div className="container">

       <div className="row flex-wrap">
        {showProductList}
       </div>
   </div>
    </>
  )
}
