import React, { useState, useEffect } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg } from '../../helpers/validationMessage';
import { showLoading } from '../../helpers/loading';
import {Login} from '../../api/auth';
import {setAuthentication , isAuthenticated} from '../../helpers/auth';

const LoginForm = () => {

  const history = useHistory();

  useEffect(() =>{
    if ( isAuthenticated() && isAuthenticated().role === 1){
      console.log("Redirect to teacher dashboard")
      history.push('/teacher/dashboard')
    }else if(isAuthenticated() && isAuthenticated().role === 0){
        console.log("Redirect to student dashboard")
        history.push('/student/dashboard')
    }
  }, [history])

  const[loginData, setLoginData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false
})

const { email, password, errorMsg, loading } = loginData;

const handleChange = e => {
  //console.log(e);
  setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
      successMsg: '',
      errorMsg: ''
  });
}  

  const handleSubmit = async (e) =>{
    e.preventDefault();


    //client side validation
    if(isEmpty(email) || isEmpty(password))
    {
      setLoginData({
        ...loginData, errorMsg : "All input fields are required."
      });
    }else if(!isEmail(email)){
      setLoginData({
        ...loginData, errorMsg: "Invalid email."
      })
    }else{

      const {email, password} = loginData;
      const data = {email,password};

      setLoginData({ ...loginData, loading:true});

      await Login(data).then( (response) =>{
          setAuthentication(response.data.token , response.data.user);

          if ( isAuthenticated() && isAuthenticated().role === 1){
              console.log("Redirect to teacher dashboard")
              history.push('/teacher/dashboard')
          }else{
              console.log("Redirect to student dashboard")
              history.push('/student/dashboard')
          }

      }).catch( (err) =>{
        console.log('login api function error', err);
        setLoginData({
          ...loginData,
          loading: false,
          errorMsg: err.response.data.errorMessage
        })
      })
      
    }
    
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
        {errorMsg && showErrorMsg(errorMsg)}
        {loading && <div className='text-center pd-4'>{showLoading()}</div>}
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={email} onChange={handleChange}/>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleChange}/>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-4">Login</button>
    </form>
  )
}

export default LoginForm;
