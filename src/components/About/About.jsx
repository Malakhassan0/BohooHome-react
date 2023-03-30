import React from 'react'
import { Helmet } from 'react-helmet'
import './About.css'

export default function About() {
  return (
    <>
    <Helmet>
 <link rel="icon" href="images/icon4.png" />
     <title>About Bohoo</title>
 </Helmet>
 <section className='about'>
   <div className='im'>
     <img src="images/pexels-mikhail-nilov-6707631.jpg" className='w-100 ' alt="" />
   </div>
   <div className="container text-center mt-5 pb-5">
     <h3 className='h1'> Who we are</h3>
     <p>It is our passion to make people forget their daily stress while indulging in one of our many exclusive pieces. Every piece is a BohooHome of quality, simplicity and style. BohooHome collection is set out as a wide diversified choice and includes systems and furnishing accessories for the whole house or project.</p>
     <p>Over the years, BohooHome continuously adapted its range of proposals to the furniture market, demonstrating a deep ability in gathering the requirements and the tastes of our audience and to anticipate and interpret trends in living.</p>
     <p>BohooHome is an Egyptian Public limited company that was established in 2012. Starting the journey with our first showroom in Nasr city, italy. Followed by the launch of the second showroom in Heliopolis in 2015, and after that, our third branch in New italy in 2019. We’re currently preparing for the opening of our fourth showroom in West italy.</p>
     <p>Our showrooms serve as a source of inspiration, thanks to the comfort and timelessness of its products, with their strong design, expressed in harmony with the collection. Our goal is to create the perfect BohooHome of furniture for each home with impeccable design and quality standards. Original minimalistic contemporary designs with a unique sense of detail are all hallmarks of every BohooHome product.</p>
     <p>We’ve worked with International brands that possess the keen attention to detail. Some of our international brands originate from countries known for their history in the design industry such as Italy, Spain, Portugal and the Netherlands that have been creating cutting-edge designs since the early 1900s.</p>
     <p>BohooHome isn’t just a brand, it’s also a platform that strives on encouraging local talent. Our strength is our endless passion for seeking out new designs and local talent. We take pride in our collaborations with Egyptian designers and innovators who excel in their field, showcasing their innovative creations in our showrooms.</p>
     <p>We make sure everything we do honours that connection between our commitment to excellence and unmatched comfort. All BohooHome products are ISO 9001 or equivalent certified to guarantee their safety and environmental soundness.</p>
     <p className='pb-5'>We’re here to help you make your house a home.</p>
   </div>
 </section>
 </>
  )
}
