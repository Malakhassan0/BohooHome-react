import React, { useEffect, useState } from 'react'
import  Axios  from 'axios';
import { useParams } from 'react-router-dom';
import  swal  from 'sweetalert';


export default function FavoriteList() {
    const [favorite,setFavorite]=useState([]);
    let{id}=useParams()
    let userID= localStorage.getItem('id');

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/favoriteList/${id}`).then(res=>{
            if(res.data.status_code===200){
                setFavorite(res.data.Favorite_list)
                // console.log(res.data);
            }
        })
    },[id])
    const deleteProduct=(e,identifier)=>{
        e.preventDefault();
        console.log(identifier);
        const thisClicked= e.currentTarget;
        thisClicked.innerText= "Deleting"
        let data={
            user_id:userID,
          }
        Axios.post(`http://127.0.0.1:8000/api/deleteFavorite/${identifier}`,data).then(res=>{
        if(res.data.status_code===200){
            swal('Success',res.data.message,'success')
            thisClicked.closest(".row").remove()
        }else{
            swal('Error',res.data.message,'error')
            thisClicked.innerText('Delete') 
        }
        })
        
    }
  return (
    <>
    <section className="container mt-5 m-auto">
        {/* map */}
            {favorite.map((item,index)=>{
        // console.log(item);
        return(
            <div className="row " key={index} >
            <div className="col-md-8">
                <h6>{item.product.name}</h6>
                <p>{item.product.description}</p>
                <small className='mt-5'>Category: {item.product.category.name}</small>
            </div>
            <div className="col-md-2">
                <img src={`http://127.0.0.1:8000/uploads/${item.product.image}`} width="150px" className='rounded' height='150px' alt="" />
            </div>
            <div className="col-md-2">
            <button type='button' onClick={(e)=>{deleteProduct(e,item.product_id)}} className='btn btn-danger btn-sm '>Delete</button>
            </div>
            <hr className='mt-2' />
        </div>
       
        )
    })
    }
    </section>
    </>
  )
}
