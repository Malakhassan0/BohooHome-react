import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import './Shop.css'
import { Link } from 'react-router-dom';
import  Axios  from 'axios';


export default function Shop() {
    const[categoryList,setCategoryList]=useState([])
    const[productList,setProducts]=useState([])
    const [loading,setLoading]=useState(false);
  
  
let userID= localStorage.getItem('id');

    const handleClick = (e,id) => {
      e.preventDefault();   
      let current = e.currentTarget
      if(current.classList.contains('fa-regular')){
        let data={
          user_id:userID,
          product_id:id
        }
        current.classList.add('fa-solid')
        current.classList.remove('fa-regular')
        Axios.post(`http://127.0.0.1:8000/api/addtofavorites`,data)
//         .then(res=>{
//           if(res.data.status_code===200){
// console.log(res);
//           }
//         })
      }else {
        let data={
          user_id:userID
        }
        current.classList.add('fa-regular')
        current.classList.remove('fa-solid')
        Axios.post(`http://127.0.0.1:8000/api/deleteFavorite/${id}`,data)
        // .then()
      }
    };
  
//  const {id}=useParams()
useEffect(()=>{
//  let isMontered=true
   Axios.get(`http://127.0.0.1:8000/api/allProducts`).then(res=>{
    if(res.data.status===200){
      setProducts(res.data.allproducts)
    }
   })
    Axios.get(`http://127.0.0.1:8000/api/allCategories`).then(res=>{
      // if(isMontered){
        if(res.data.status===200){
          // console.log(res);
          setCategoryList(res.data.allcategories);
          setLoading(false)
        }
      // }
      // return ()=>{
      //   isMontered = false
      // }
    })

  },[])
  if(loading){
    return <h4>Loading Products</h4>
  }
  return (
    <>
    <Helmet>
   <link rel="icon" href="images/icon4.png" />
       <title>Shop-Now</title>
   </Helmet>

   <section className='products'>
     <div className="container ">
       <div className="row flex-wrap">
          <div className='mt-3 mb-4 d-flex'>
  <div name="categories" id="categories">
    {/* <button className='btn' ><Link>All</Link></button> */}
  {categoryList.map((item ,index)=>{
                  return (
                    <button className='btn' key={index}><Link to={`/shop/${item.name}`} className='text-decoration-none it-cat' >{item.name}</Link></button>
                  )
                })}
</div>

          </div>
          {productList.map((item,index)=>{
            return(
              <div className="col-md-4 mb-3 pb-5" key={index}>
              <div className="carddd rounded shadow pb-2" key={item.id}>
         <div >
           <Link to={`/single/${item.id}`}>
           <img src={`http://127.0.0.1:8000/uploads/${item.image}`} alt=""  className='w-100 h-100 rounded '/>
           </Link>     

           </div>
           <div className='ms-3 mt-4'>
             <h3>{item.name}</h3>
             <button className='btn float-end fa'  >
               <i onClick={(e)=>{handleClick(e,item.id)}} className='fa-regular fa-heart'></i>  </button>
             <p>{item.description}</p>
             <div className='d-flex justify-content-between'>
             <span>Price:{item.price}</span> <span className='pe-5'>Discount:  {item.discount}%</span> 
             </div>             
           </div>
           <div className='d-flex justify-content-center '>
            
           <button className='btn mt-3 ' id='button1'><Link className='text-decoration-none' id='ink' to={`/single/${item.id}`}>Add To Cart</Link></button>
            
           </div>
         </div>
         </div>
            )          
          })}
       </div>
     </div>
   </section>   
   </>
  )
}
