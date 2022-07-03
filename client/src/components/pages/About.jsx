import React from 'react'

const About = () => {
  return (
    <div>
        <section id='about'>
            <div className='container my-5 py-5'>
                <div className='row' >
                    <div className='col-md-6'>
                        <img src="/assets/about1.jpg" alt="About" className='w-75 mt-5'></img>
                    </div>
                    <div className='col-md-6'>
                        <h3 className='fs-5 mb-0'>About us</h3>
                        <h1 className='display-6 mb-2'>Who <b>We</b> Are</h1>
                        <hr className='w-50'/>
                        <p className='lead mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan blandit arcu, sed pellentesque mauris mollis et. Nullam vitae erat vel est ultrices varius. Nullam quis posuere magna, ut sollicitudin lacus. Nulla ipsum libero, consequat id nunc id, rutrum dictum est. Ut lobortis elementum lectus, sed rutrum mi pellentesque sit amet. Vivamus mi purus, tempor eget arcu lacinia, pretium vestibulum nibh. Quisque sed euismod lacus, nec volutpat justo.</p>
                        <button className='btn btn-primary rounded-pill px-4 py-2'>Get Started</button>
                        <button className='btn btn-outline-primary rounded-pill px-4 py-2 ms-2'>Contact Us</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About;
