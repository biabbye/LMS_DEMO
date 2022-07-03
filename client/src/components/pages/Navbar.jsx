import React from 'react'
import {NavLink , withRouter} from 'react-router-dom';
import {isAuthenticated, logout} from '../../helpers/auth'
import { Fragment } from 'react';


const Navbar = ({ history})  => {


    const handleLogout = e => {
        logout(() => {
            history.push('/login');
        })
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/services">Services</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    
                </ul>
                <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">CodeWithUs</NavLink>

                {!isAuthenticated() && (
                    <Fragment>
                        <NavLink className='btn btn-outline-primary ms-auto px-4 rounded-pill' to='/login'><i className="fa fa-sign-in me-2"></i>Login</NavLink>
                        <NavLink className='btn btn-outline-primary ms-2 px-4 rounded-pill' to='/register'><i className="fa fa-user-plus me-2"></i>Register</NavLink>
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().role === 0 && (
                    <Fragment>
                        <NavLink className='btn btn-outline-primary ms-auto px-4 rounded-pill' to='/student/dashboard'><i className="fa fa-sign-in me-2"></i>Dashboard</NavLink>
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().role === 1 && (
                    <Fragment>
                        <NavLink className='btn btn-outline-primary ms-auto px-4 rounded-pill' to='/teacher/dashboard'><i className="fa fa-sign-in me-2"></i>Dashboard</NavLink>
                    </Fragment>
                )}

                {isAuthenticated() &&  (
                    <Fragment>
                        <button className='btn btn-outline-primary ms-2 px-4 rounded-pill'><i className="fa fa-sign-in me-2" onClick={handleLogout}></i>Logout</button>
                    </Fragment>
                )}
            
                
                
                
                
                {/* <NavLink className='btn btn-outline-primary ms-2 px-4 rounded-pill' to='/dashboard'><i className="fa fa-sign-out me-2"></i>Dashboard</NavLink>
                <NavLink className='btn btn-outline-primary ms-2 px-4 rounded-pill' to='/logout'><i className="fa fa-sign-out me-2"></i>Logout</NavLink> */}
                
                
                </div>
            </div>
        </nav>
    </div>
  )
}

export default withRouter(Navbar);