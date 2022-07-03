import React from 'react'
import About from './About';
import Contact from './Contact';
import Services from './Services';
import {NavLink} from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <section id="home">
           <div className='container'>
               <div className='row justify-content-center'>
                   <div className='col-md-8 mt-5'>
                       <h1 className='display-4 fw-bolder mb-4 text-center text-white'>
                           Feel the improvment in your assignments
                       </h1>
                       <p className='lead text-center fs-4 mb-5 text-white'>
                           Start working on your assignments and develop your coding skills by receiving instant feedback.Online education has never been this easy.
                       </p>
                       <div className='buttons d-flex justify-content-center'>
                           <NavLink to='/contact' className='btn btn-light me-4 rounded-pill px-4 py-2'>Get Info</NavLink>
                           <NavLink to='/services' className='btn btn-outline-light rounded-pill px-4 py-2'>Our Services</NavLink>
                       </div>
                   </div>
               </div>
           </div>
        </section>
        <About/>
        <Services/>
        <Contact/>
    </div>
  )
}

export default Home;
