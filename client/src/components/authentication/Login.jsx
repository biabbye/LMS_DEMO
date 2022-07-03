import React from 'react';
import {NavLink} from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div>
        <div className='container shadow my-5'>
            <div className='row'>
                <div className='col-md-5 p-5 d-flex flex-column align-items-center text-white justify-content-center form'>
                    <h1 className='display-4 fw-bolder'>Good to see you!</h1>
                    <p className='lead text-center'>Enter your credentials</p>
                    <h5 className='mb-4'>OR</h5>
                    <NavLink to = '/register' className="btn btn-outline-light rounded-pill pb-2 w-50">Register Here</NavLink>
                </div>
                <div className='col-md-6 p-5'>
                    <h1 className='display-6 mb-5 fw-bolder'>LOGIN</h1>
                    <LoginForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
