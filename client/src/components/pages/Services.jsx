import React from 'react'
import Card from '../Card';

const Services = () => {
  return (
    <div>
        <section id="service">
            <div className='row'>
                        <div className='col-12'>
                            <h3 className='fs-5 text-center mb-0'>Our Services</h3>
                            <h1 className='display-6 text-center mb-4'>Our <b>Awesome</b> Services</h1>
                            <hr className='w-25 mx-auto'/>
                        </div>
            </div>
            <div className='container'>
                
            
                <div className='row'>
                    <div className='col-md-4'>
                        <Card font = {'fa fa-cogs fa-4x mb-4 text-primary'} title='Easy Usage' content='Access your assigned task with only one click and start testing your code right now.'/>
                    </div>
                    <div className='col-md-4'>
                        <Card font = {'fa fa-cogs fa-4x mb-4 text-primary'} title='Instant Feedback' content='Run your solution using only one submit button with the help of our online compiler.'/>
                    </div>
                    <div className='col-md-4'>
                        <Card font = {'fa fa-cogs fa-4x mb-4 text-primary'} title='Optimize your time' content='Reduce your time spending on uploading assignments with our easy dashboard method.'/>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}


export default Services;
