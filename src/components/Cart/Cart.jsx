import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import  Axios  from 'axios';
import  swal  from 'sweetalert';
import { Helmet } from 'react-helmet';


export default function Cart() {
    const [loading,setLoading]=useState(false);
    const [cart,setCart]=useState([]);
    let navigate = useNavigate();
    let total=0;


const id = localStorage.getItem('id')
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/cart/${id}`).then(res=>{
            // console.log(res)
            if(res.data.status===200){
                setCart(res.data.cart_items)
                setLoading(false)
            }else{
                navigate('/')
                swal('Warning',res.data.message,'error')
            }
        })
    },[navigate,id])

    const handleDecrement=(cart_id)=>{
        setCart(cart =>
            cart.map((item)=>
                    cart_id ===item.id ?{...item, quantity:item.quantity - (item.quantity>1?1:0)} : item
        )
        )
        updateQuantity(cart_id,'dec')
    }
    const handleIncrement=(cart_id)=>{
        setCart(cart =>
            cart.map((item)=>
                cart_id ===item.id ?{...item, quantity:item.quantity + (item.quantity<10?1:0)} : item
        ))
        updateQuantity(cart_id,'inc')
    }
    function updateQuantity(cart_id,scope){
        Axios.post(`http://127.0.0.1:8000/api/updatequantity/${cart_id}/${scope}/${id}`).then(res=>{
            if(res.data.status===200){
                // swal('Success',res.data.message,'success')
            }
        })
    }

    const deleteCartItem=(e,cart_id)=>{
        e.preventDefault();
        const thisClicked= e.currentTarget;
        thisClicked.innText='Removing'
        Axios.post(`http://127.0.0.1:8000/api/deleteCart/${cart_id}/${id}`).then(res=>{
            if(res.data.status===200){
                swal('Success',res.data.message,'success')
                thisClicked.closest('tr').remove();
            }else{
                swal('Error',res.data.message,'error')
                thisClicked.innText='Remove'
            }
        })
    }

    if(loading){
        return <h4>Loading Cart Details...</h4>
      }
      var cart_html=''
      if(cart.length>0){
        cart_html=
        <div>
        <div className="table-responsive">
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th className='text-center'>Price</th>
                    <th className='text-center'>Quantity</th>
                    <th className='text-center'>Total Price</th>
                    <th className='text-center'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item , index)=>{
                    total+= item.product.price*item.quantity
                    return(
                        <tr key={index}>
                        <td width='10%'>
                            <img src={`http://127.0.0.1:8000/uploads/${item.product.image}`} alt="" width='50px' height='50px'/>
                        </td>
                        <td>{item.product.name}</td>
                        <td width="15%" className='text-center'>{item.product.price}</td>
                        <td width="15%">
                            <div className="input-group">
                            <button type='button' onClick={()=> handleDecrement(item.id)} className=' input-group-text'>-</button>
                             <div  className=' form-control text-center'>{item.quantity}</div>
                              <button type='button' onClick={()=> handleIncrement(item.id)}  className=' input-group-text'>+</button>
                            </div>
                        </td>
                        <td>{item.quantity*item.product.price}</td>
                        <td className='text-center'><button onClick={(e)=> deleteCartItem(e,item.id)} className='btn btn-danger'>Delete</button></td>
                    </tr>
                    )
                })}
               
            </tbody>
        </table>
    </div>
                <div className="col-md-4">
                <div className="card card-body mt-3">
                    <h4>Sub Total:
                        <span className='float-end'>{total}</span>
                    </h4>
                    {/* <h4>Grand Total:
                        <span className='float-end'>{total}</span>
                    </h4> */}
                    <hr />
                    <Link to={`/checkout`} className="btn btn-info">Checkout</Link>
                </div>
            </div>
            </div>
      }else{
        cart_html=<div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart Is Empty</h4>
            </div>
        </div>
      }
  return (
    <>
           <Helmet>
    <link rel="icon" href="/images/icon4.png" />
        <title>Cart</title>
    </Helmet>
    <div className="py-3 bg-info">
        <div className="container">
            <div className="row">
                <h6>Home/Cart</h6>
            </div>
        </div>
    </div>
    <div className="py-3">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {cart_html}
                </div>
                <div className="col-md-8"></div>

            </div>
        </div>
    </div>
    </>
  )
}
