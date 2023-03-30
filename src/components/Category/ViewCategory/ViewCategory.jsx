import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import  swal  from 'sweetalert';


export default function ViewCategory() {
    const [loading,setLoading]=useState([]);
    const [catergoryList,setCatergoryList]=useState([]);
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/allCategories`).then(res=>{
            if(res.data.status===200){
                // console.log(res);
                setCatergoryList(res.data.allcategories)
            }
            setLoading(false)
        })
    },[])
    const deleteCategory=(e,id)=>{
        e.preventDefault();
        const thisClicked= e.currentTarget;
        thisClicked.innerText= "Deleting"
        Axios.post(`http://127.0.0.1:8000/api/categoryDelete/${id}`).then(res=>{
        if(res.data.status===200){
            swal('Success',res.data.message,'success')
            thisClicked.closest("tr").remove()
        }else{
            swal('Error',res.data.message,'error')
            thisClicked.innerText('Delete') 
        }
        })
    }
    let ViewCategory_html="";
    if(loading){
        return <div className="container mt-5"> <h4>Loading Category...</h4></div>
    }else{
        ViewCategory_html=
        catergoryList.map((item,index)=>{
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td><img src={`http://127.0.0.1:8000/uploads/${item.image}`} width='50px' alt="" /></td>
                    <td><Link to={`/categoryUpdate/${item.id}`}className='btn btn-success btn-sm'>Edit</Link></td>
                    <td><button type='button' onClick={(e)=>{deleteCategory(e,item.id)}} className='btn btn-danger btn-sm'>Delete</button></td>
                </tr>
            )
        })
    }
  return (
    <>
     <Helmet>
    <link rel="icon" href="/images/icon4.png" />
        <title>Add Category</title>
    </Helmet>
    <div className="container mt-5">
        <div className="card">
            <div className="card-header">
                <h5 className='d-flex me-5 justify-content-end '>
                    <Link  className='list-unstyled  text-decoration-none' to="/CreateCategory">Add Category</Link>
                </h5>
            </div>
            <div className="card-body mb-5">
            <table className="table table-striped">
                <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">name</th>
                <th scope="col">Description</th>
                <th scope="col">image</th>
                </tr>
            </thead>
            <tbody>
                {ViewCategory_html}
            </tbody>
            </table>
            </div> 
        </div>
    </div>
    </>
  )
}
