import  Axios  from 'axios';
import React, { useEffect, useState }  from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
export default function EditCategory() {
  const [loading,setLoading]=useState(true);
  const [categoryInput,setcategory]=useState([]);   
  const [error,setError]=useState([]);   
    let navigate = useNavigate();
   
    const {id}= useParams();
    
    
    const category_id=id;
    useEffect(()=>{  
      Axios.get(`http://127.0.0.1:8000/api/categoryEdit/${category_id}`).then(res=>{
          // console.log(res);
          if(res.data.status===200){
              
              setcategory(res.data.category)
          }else{
            swal('Error',res.data.message,"error")
              navigate('/ViewCategory');
            }
            setLoading(false)
      });
    },[id,category_id,navigate]);
    const handleInput=(e)=>{
        setcategory({...categoryInput,[e.target.name]:e.target.value})
    }
    const updateCategory=(e)=>{
      e.preventDefault()
      const data=categoryInput;
      Axios.post(`http://127.0.0.1:8000/api/categoryUpdate/${category_id}`,data).then(res=>{
        if(res.data.status===200){
          console.log(res);
          swal('Success',res.data.message,"success")
          setError([])
          navigate('/ViewCategory');
        }else if(res.data.status===422){
          swal('Name is mandatory',"","error")
          setError(res.data.errors);
        }else{
          swal('Error',res.data.message,"error")
          navigate('/ViewCategory');
        }
      })
    }
    if(loading){
    return <div className="container mt-5"> <h4>Loading Edit Category...</h4></div>
}
  return (
    <>
      <Helmet>
    <link rel="icon" href="/images/icon4.png" />
        <title>Add Category</title>
    </Helmet>
    <div className="container px-4 py-3">
    <div className="container">
        {/* {
            display_errors.map((err ,index)=>{
                return (<span key={index} className='text-danger '>{err}</span>)
                    })
        } */}
    <h4>Edit Category 
        <Link to="/ViewCategory" className='btn btn-primary btn-sm float-end'>Back</Link>
    </h4>
    <form  onSubmit={updateCategory} encType="multipart/form-data">
    <div className="form-group my-3">
    <label htmlFor="catname" className="form-label mb-2">Category Name</label>
    <input type="text" className="form-control" name="name" onChange={handleInput} value={categoryInput.name}  id="catname" placeholder="Enter category name"/>
        <small className='text-danger'>{error.name}</small>
  </div>
    <div className="form-group mb-3">
    <label htmlFor="descr" className="form-label mb-2">Description</label>
    <input type="text" className="form-control" name="desc"id="descr"onChange={handleInput} value={categoryInput.desc} placeholder="description"/>
  </div>
  <div className="form-group mb-3">
    <img src={`http://127.0.0.1:8000/uploads/${categoryInput.image}`}alt=""  className="d-block m-auto w-50 py-3"/>
    {/* <label htmlFor="photo" className="form-label mb-2">upload</label> */}
    <input type="file" className="form-control" onChange={handleInput}  name="image"   id="photo"/>
  </div>
  <button type="submit" className="btn btn-info mb-5">Update</button>
</form>
{/* <div>
    <Link className='list-unstyled d-flex text-decoration-none' to="/ViewCategory">view Categories</Link>
</div> */}
    </div>
    </div>
    </>
  )
}
