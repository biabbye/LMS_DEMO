import React from 'react'
import RegisterForm from './RegisterForm'
import { NavLink } from 'react-router-dom'

const Register = () => {
    
  return (
    <div>
        <div className='container shadow my-5'>
            <div className='row justify-content-end mr-0'>
                <div className='col-md-5 p-5 d-flex flex-column align-items-center text-white justify-content-center form order-2'>
                    <h1 className='display-4 fw-bolder text-center'>Hello there!</h1>
                    <p className='lead text-center'>Enter some details in order to register</p>
                    <h5 className='mb-4'>OR</h5>
                    <NavLink to = '/login' className="btn btn-outline-light rounded-pill pb-2 w-50">LOGIN Here</NavLink>
                </div>
                <div className='col-md-6 p-5'>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
