import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import  swal  from 'sweetalert';



export default function UpdateOrder() {
    const [selectedOption, setSelectedOption] = useState("");
    let navigate = useNavigate();
    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
      }
      
      const {id} = useParams();
      const update = (e)=>{
    e.preventDefault();
    const data ={
        status:selectedOption
    }
    Axios.post(`http://127.0.0.1:8000/api/updateOrder/${id}`,data).then(res=>{
        console.log(res);
        if(res.data.status===200){
          swal('Status Updated Suceesfully','','success')
          navigate('/orders')
        }else{
          swal('Error',res.data.message,'error')
        }
        })
}
  return (
    <>
<div className="container">
<div className="card-body my-5">
           <div className="row">
            <div className="col-md-4">
                <p>Change Status:</p>
            </div>
            <div className="col-md-4">
            <select name="pay-method" value={selectedOption} onChange={handleOptionChange} className="ms-5">
                                            
                                            <option value="pending">Pending</option>
                                            <option value="inprogress">Inprogress</option>
                                            <option value="delivering">Delivering</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
            </div>
           </div>
        </div>
           <button className='btn btn-info float-end' onClick={update}> Update</button>
        </div>
    </>
  )
}
