import React from 'react'
import ContactForm from '../ContactForm'

const Contact = () => {
  return (
    <div>
        <section id="contact">
        <div className="row mb-5">
                <div className='col-12'>
                    <h3 className='fs-5 text-center mb-0'>Contact Us</h3>
                    <h1 className='display-6 text-center mb-4'>Have Some <b>Questions?</b></h1>
                    <hr className='w-25 mx-auto'/>
                </div>
            </div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src="/assets/contact.jpg" alt="Contact" className='w-75'></img>
                </div>
                <div className='col-md-6'>
                    <form actions="">
                        <ContactForm />
                    </form>
                   
                </div>
                
            </div>
        </div>
            
        </section>
    </div>
  )
}

export default Contact
