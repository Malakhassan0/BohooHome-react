import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import  swal  from 'sweetalert';



export default function Checkout() {
    const [loading,setLoading]=useState(false);
    const [cart,setCart]=useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    let navigate = useNavigate();
    let total=0;

    const id = localStorage.getItem('id')
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/cart/${id}`).then(res=>{
            console.log(res)
            if(res.data.status===200){
                setCart(res.data.cart_items)
                setLoading(false)
            }else{
                navigate('/')
                swal('Warning',res.data.message,'error')
            }
        })
    },[navigate,id])
    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
        // console.log(event.target.value);
        // console.log(selectedOption);
      }
      const submitOrder =(e)=>{
        e.preventDefault()
        const data= {
            payement:selectedOption,
            user_id:id,
        }
        Axios.post(`http://127.0.0.1:8000/api/placeOrder`,data).then(res=>{
            // console.log(res);
            // console.log(data);
            if(res.data.status===200){
                swal('Order Placed Successfully',res.data.message,'success')
                navigate('/')
            }
        })
      }


      if(loading){
        <h4>Loading Checkout....</h4>
      }
  return (
    <>
    <div className="py-4">
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Payement</label>
                                        {/* <input type="text" name="pay" className='form-control' id="" /> */}
                                        <select name="pay-method" value={selectedOption} onChange={handleOptionChange} className="ms-5">
                                            <option >choose please:</option>
                                            <option value="visa">Visa</option>
                                            <option value="cash">Cash</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.map((item , index)=>{
                    total+= item.product.price*item.quantity
                    return(
                            <tr key={index}>
                                <th>{item.product.name}</th>
                                <th>{item.product.price}</th>
                                <th>{item.quantity}</th>
                                <th>{item.quantity*item.product.price}</th>
                            </tr>
                    ) })}
                    <tr>
                        <td colSpan="2" className='text-end '>Grand Total</td>
                        <td colSpan="2" className='text-end '>{total}</td>
                    </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-10 mt-5 d-flex justify-content-end">

                <button onClick={submitOrder} className='btn btn-info'>Place Order</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
