import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';

export default function AddProduct() {
  // const token= localStorage.getItem('is_admin')
  const[categoryList,setCategoryList]=useState([])
  const[errorList,setError]=useState([])
  const[productInput,setProduct]=useState({
    name:'',
    description:'',
    quantity:'',
    price:'',
    discount:'',
    category_id:'',

  })
  const[img,setImg]=useState([])
  const handleInput=(e)=>{
    setProduct({...productInput,[e.target.name]:e.target.value})
  }
  const handleImage=(e)=>{
    setImg({image:e.target.files[0]})
  }
  useEffect(()=>{
    Axios.get(`http://127.0.0.1:8000/api/allCategories`).then(res=>{
      if(res.data.status===200){
        setCategoryList(res.data.allcategories);
      }
    })

  },[])

  const admin= localStorage.getItem('id')
  // const token= localStorage.getItem('auth_token')
  // const role = localStorage.getItem('is_admin');
  const submitProduct=(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append('name',productInput.name)
    formData.append('description',productInput.description)
    formData.append('quantity',productInput.quantity)
    formData.append('price',productInput.price)
    formData.append('image',img.image)
    formData.append('discount',productInput.discount)
    formData.append('user_id',admin)
    formData.append('category_id',productInput.category_id)
    Axios.post(`http://127.0.0.1:8000/api/storeProduct`,formData).then(res=>{
      // console.log(formData);
      console.log(res);
      if(res.data.status===200){
        setProduct({...productInput,
          name:'',
          description:'',
          quantity:'',
          price:'',
          discount:'',
          category_id:'',
      
        })
        swal('Success',res.data.message,'success')
        setError([])
      }else if(res.data.status===422){
        swal('All fields are mandetory','','error')
        setError(res.data.errors)
      }else{
        swal('Error',res.data.message,'error')
      }
    })
  }
  
  return (
    <>
    <Helmet>
    <link rel="icon" href="/images/icon4.png" />
        <title>Add Product</title>
    </Helmet>
    <div className="container-fluid px-4">
      <div className="card mt-4">
          <div className="card-header">
            <h4>Add Product
              <Link to='/allProducts' className='btn btn-primary btn-sm float-end'>View Product</Link>
            </h4>
          </div>
          <div className="card-body mb-5">
            <form action="" onSubmit={submitProduct} encType="multipart/form-data">
            <div className="d-flex flex-column align-items-center justify-content-center py-2">
              <select name="category_id" onChange={handleInput} value={productInput.category_id} className='form-control m-auto w-75 mb-2'>
                <option disabled>Select Category</option>
                {categoryList.map((item ,index)=>{
                  return (
                    <option value={item.id} key={index}>{item.name}</option>                   
                  )
                })}
              </select>
              <small className='text-danger'>{errorList.category_id}</small>
                <label htmlFor="Pname" className="mb-1 form-label">Name</label>
                <input type="text"  placeholder="enter product name" onChange={handleInput} value={productInput.name} className="form-control w-50 text-center" id="Pname" name="name"/>  
                <small className='text-danger'>{errorList.name}</small>             
               </div>
            <div className="d-flex flex-column align-items-center justify-content-center py-2">
                <label htmlFor="description" className="mb-1 form-label">Description</label>
                {/* <input type="text" /> */}
                <textarea onChange={handleInput} value={productInput.description} id="description" className="form-control p-5 w-50 text-center" name="description"  placeholder="enter product description"  cols="30" rows="5"></textarea>    
                <small className='text-danger'>{errorList.description}</small>         
               </div>

               <div className='d-flex my-2'>
               <div className="d-flex flex-column align-items-center justify-content-center w-50 py-2">
                <label htmlFor="quantity" className="mb-1 form-label">Quantity</label>
                <input type="number" placeholder="enter qunatity" onChange={handleInput} value={productInput.quantity}  className="form-control w-50 text-center" id="quantity" name="quantity"/>      
                <small className='text-danger'>{errorList.quantity}</small>         
               </div>
            <div className="d-flex flex-column align-items-center justify-content-center w-50 py-2">
                <label htmlFor="price" className="mb-1 form-label">Price</label>
                <input type="number"  placeholder="enter the price" onChange={handleInput} value={productInput.price}   className="form-control w-50 text-center" id="price" name="price"/>  
                <small className='text-danger'>{errorList.price}</small>             
               </div>
            <div className="d-flex flex-column align-items-center justify-content-center w-50 py-2">
                <label htmlFor="discount" className="mb-1 form-label">Discount</label>
                <input type="text"  placeholder="discount" onChange={handleInput} value={productInput.discount}  className="form-control w-50 text-center" id="discount" name="discount"/>   
                {/* <small className='text-danger'>{errorList.dicount}</small>             */}
               </div>
               </div>
            <div className="form-group mb-3 d-flex flex-column mx-4 justify-content-center">
              <label htmlFor="photo" className="form-label mb-2">upload</label>
               <input type="file" className="form-control" onChange={handleImage}  name="image" id="photo"/>
            </div>
            <div className='d-flex justify-content-center'>
               <button type="submit" className='btn btn-info px-4 mt-2'>Submit</button>
            </div>
            </form>
          </div>
      </div>
    </div>
    </>
  )
}
