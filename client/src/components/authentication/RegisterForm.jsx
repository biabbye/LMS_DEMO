import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg,showSuccessMsg } from '../../helpers/validationMessage';
import { showLoading } from '../../helpers/loading';
import {Register} from '../../api/auth';
import {setAuthentication , isAuthenticated} from '../../helpers/auth';

const RegisterForm = () => {

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

  const [user,setUser] = useState({
    username : "",
    email : "",
    password: "",
    confirmPassword: "",
    successMsg: false,
    errorMsg: false,
    loading: false
  });

  const {username,email,password,confirmPassword,successMsg,errorMsg,loading} = user; //destructuring state


  const handleInput = (e) =>{
    // let name = e.target.name;
    // let value = e.target.value;

    setUser({
      ...user,
      [e.target.name] : e.target.value,
      successMsg: '',
      errorMsg: ''
    });
    
  }

  // const history = useHistory()


  const handleSubmit = async (e) =>{
      e.preventDefault();

      //client side validation
      if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword))
      {
        setUser({
          ...user, errorMsg : "All input fields are required."
        });
      }else if(!isEmail(email)){
        setUser({
          ...user, errorMsg: "Invalid email."
        })
      }else if(!equals(password,confirmPassword)){
        setUser({
          ...user, errorMsg:"Password doesn't match."
        })
      }else{

        const {username, email, password} = user;
        const data = {username,email,password};

        setUser({ ...user, loading:true});

        Register(data).then((response) =>{
          console.log(response);
          setUser({
            username : "",
            email : "",
            password: "",
            confirmPassword: "",
            loading : false,
            successMsg: response.data.successMessage
          })
        }).catch( (err)=>{
          console.log('Axios sign up error',err);
          setUser({ ...user, loading:false, errorMsg: err.response.data.errorMessage});
        });
        
      }

      
      // const {username, email,password} =  user;
      // try{
      //   const res = await fetch('/register', {
      //     method: 'POST',
      //     headers : {
      //       "Content-Type" : "application/json"
      //     },
      //     body: JSON.stringify({
      //       username,email,password
      //     })
      //   })

      //   if(res.status === 400 || !res){
      //     window.alert("Already registered.")
      //   }else{
      //     window.alert("Registration Successful");
      //     history.push('/login')
      //   }
      // }catch(error){
      //   console.log(error);
      // }
  }

  return (

    

    <form onSubmit={handleSubmit} noValidate>
        {successMsg && showSuccessMsg(successMsg)}
        {errorMsg && showErrorMsg(errorMsg)}
        {loading && <div className='text-center pd-4'>{showLoading()}</div>}
        <div class="mb-3">
            <label for="name" class="form-label">Username</label>
            <input type="text" class="form-control" id="name" name="username" value={username} onChange={handleInput}/>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name="email" value={email} onChange={handleInput}/>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleInput}/>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name="confirmPassword" value={confirmPassword} onChange={handleInput}/>
        </div>
        <button type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">Submit</button>
    </form>
  )
}

export default RegisterForm