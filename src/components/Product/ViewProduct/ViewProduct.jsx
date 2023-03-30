import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import  swal  from 'sweetalert';

export default function ViewProduct() {
    const [loading,setLoading]=useState(false);
    const [viewProduct,setProduct]=useState([]);
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/allProducts`).then(res=>{
            // console.log(res);
            if(res.data.status===200){
                console.log(res);
                setProduct(res.data.allproducts)
                // setLoading(false);
            }
            setLoading(false)
        })
    },[])
    const deleteProduct=(e,id)=>{
        e.preventDefault();
        const thisClicked= e.currentTarget;
        thisClicked.innerText= "Deleting"
        Axios.post(`http://127.0.0.1:8000/api/productDelete/${id}`).then(res=>{
        if(res.data.status===200){
            swal('Success',res.data.message,'success')
            thisClicked.closest("tr").remove()
        }else{
            swal('Error',res.data.message,'error')
            thisClicked.innerText('Delete') 
        }
        })
        loading(false)
    }
    let ViewProduct="";
    if(loading){
        return <h4>View Products Loading</h4>
    }
    else{
        ViewProduct=
        viewProduct.map( (item)=>{
            return (
                <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    {/* {item.category.name} */}
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><img src={`http://127.0.0.1:8000/uploads/${item.image}`} width='50px' alt="" /></td>
                    <td>{item.discount}</td>
                    <td>
                        <Link to={`/productUpdate/${item.id}`}className='btn btn-success btn-sm'>Edit</Link>
                        </td>
                    <td><button type='button' onClick={(e)=>{deleteProduct(e,item.id)}} className='btn btn-danger btn-sm'>Delete</button></td>
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
    <div className="card px-4 mt-3">
        <div className="card-header">
            <h4>View Product
                <Link to="/addProduct" className='btn btn-primary btn-sm float-end'>Add Product</Link>
            </h4>
        </div>
        <div className="card-body mb-5">
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Discount</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ViewProduct}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}
