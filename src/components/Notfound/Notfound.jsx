import React from 'react'
import { Helmet } from 'react-helmet';

export default function Notfound() {
  return (
    <>
    <Helmet>
  <link rel="icon" href="images/icon4.png" />
      <title>Error</title>
  </Helmet>
<section className='err-pg'>
<div className="container d-flex justify-content-center py-5 text-center">
    <div className="row w-50">
      <div className='alert alert-danger'>
            <h4>Page Not Found</h4>
            <p>Whoops...!</p>
      </div>
    </div>
  </div>
</section>
  </>
  )
}
