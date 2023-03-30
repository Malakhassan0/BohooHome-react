import React from 'react';
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
  return (
    <>
        {/* <!-- footer --> */}
<footer className=" border-top fixed-bottom mt-3+ ">
    <div className="container py-3  d-flex align-items-center justify-content-center">
        
        <p className="m-0">CopyRights &copy; <span><Link to="" onClick={() => window.location.replace("/#first") }className="fw-bolder a text-decoration-none">BohooHome</Link></span></p>
    </div>
</footer>
    </>
  )
}
