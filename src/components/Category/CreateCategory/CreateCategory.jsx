import  Axios  from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, Link } from 'react-router-dom'
import  swal  from 'sweetalert';
export default function CreateCategory() {
    let navigate = useNavigate();
    let[categoryInput,setCategory]=useState({
        name:"",
        desc:'',
        image:'',
        error_list:[]
    })
    // const[img,setImg]=useState([])
    // const handleImage=(e)=>{
    //     setImg({image:e.target.files[0]})
    //   }
    const handleInput=(e)=>{
        setCategory({...categoryInput,[e.target.name]:e.target.value})
    }
    async  function submitCategory(e ){
        e.preventDefault();
        const data={
            name:categoryInput.name,
            desc:categoryInput.desc,
            image:categoryInput.image
        }
        await Axios.post(`http://127.0.0.1:8000/api/createCategory`,data).then(res=>{
            console.log(res);
            if(res.data.status_code===200){
                // console.log(res);
                swal('Success',res.data.message,'success')
                navigate("/ViewCategory");
            }else if(res.data.status===430){
                swal('Error',res.data.message,'error')
            }else{
                setCategory({...categoryInput, error_list: res.data.validation_errors})
            }
        })
    }
    let display_errors=[];
    if(categoryInput.error_list){
        display_errors=[
            categoryInput.error_list.name,
            categoryInput.error_list.desc,
            // categoryInput.error_list.image,
        ]
    }
  return (
    <>
   <Helmet>
    <link rel="icon" href="images/icon4.png" />
        <title>Add Category</title>
    </Helmet>
    <div className="container">
        {
            display_errors.map((err ,index)=>{
                return (<span key={index} className='text-danger '>{err}</span>)
                    })
        }

    <form method='POST' action='' onSubmit={submitCategory} id="CATEGORY-FORM " encType="multipart/form-data">
    <div className="form-group my-3">
    <label htmlFor="catname" className="form-label mb-2">Category Name</label>
    <input type="text" className="form-control" name="name" onChange={handleInput} value={categoryInput.name}  id="catname" placeholder="Enter category name"/>

  </div>
    <div className="form-group mb-3">
    <label htmlFor="descr" className="form-label mb-2">Description</label>
    <input type="text" className="form-control" name="desc"id="descr"onChange={handleInput} value={categoryInput.desc} placeholder="description"/>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="photo" className="form-label mb-2">upload</label>
    <input type="file" className="form-control"  name="image" onChange={handleInput}  id="photo"/>
  </div>
  <button type="submit" className="btn btn-info mb-2">submit</button>
</form>
<div>
    <Link className='list-unstyled d-flex text-decoration-none' to="/ViewCategory">view Categories</Link>
</div>
    </div>
    </>
  )
}
