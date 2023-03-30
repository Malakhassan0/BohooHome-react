import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import  swal  from 'sweetalert';



export default function Orders() {
    const [loading,setLoading]=useState(false);
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/showOrders`).then(res=>{
            // console.log(res);
            if(res.data.status===200){
                // console.log(res);
                setOrders(res.data.orders)
                setLoading(false);
            }
        })
    },[])

    const deleteorder=(e,id)=>{
        e.preventDefault();
        const thisClicked= e.currentTarget;
        thisClicked.innerText= "Deleting"
        Axios.post(`http://127.0.0.1:8000/api/deleteOrder/${id}`).then(res=>{
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

    let display_orders="";
    if(loading){
        return <h4>Loading Orders...</h4>
    }
    else{
        display_orders=
        orders.map( (item)=>{
            return (
                <tr key={item.id} >
                    <td>{item.id}</td>
                    <td>{item.user.fname}</td>
                    <td>{item.product_id}</td>
                    <td>{item.status}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <Link to={`/updateOrder/${item.id}`}className='btn btn-success btn-sm'>Update</Link>
                        </td>
                    <td><button type='button' onClick={(e)=>{deleteorder(e,item.id)}} className='btn btn-danger btn-sm'>Delete</button></td>
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
            <h4>Orders</h4>
        </div>
        <div className="card-body mb-5">
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Created At</th>
                            <th>update status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_orders}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}
