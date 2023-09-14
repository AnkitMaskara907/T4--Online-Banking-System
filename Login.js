import React from 'react'
import '../styles/Login.css';
import AuthenticationService from '../service/AuthenticationService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // properties- states
  // constructors
  // setters
  // methods

  // definnig a state for email,password
  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const[errorMessage,setErrorMessage]= useState('');
  const[successMessage,setSuccessMessage]= useState('');

  const history =useNavigate(); // navigate programmatically from one component to another component

  // Method to handle Login
  const handleLogin= async ()=>{
    if(!email||!password){
      setErrorMessage('Please enter both email or Password');
      return ;
    }
    const dealer={email,password};
    try{
        const loginSuccess=await AuthenticationService.login(dealer);// invoke service method
        console.log('Await Response: ',loginSuccess);
        if(loginSuccess){
          setSuccessMessage('login Successful ! Redirecting .....');
          setTimeout(()=>{
            history('/about');
          },3000)

        }
        else{
          setErrorMessage('Invalid Email or Password ');
        }
    }
    catch(error){
          console.error('Login error',error);
          setErrorMessage('An Error Ocurred during Login');
    }

  }

  return (
    <div><br/><br/>

      <div className='container'>
      <h2 style ={{color:'green'}}>Dealer Login</h2>
      <div className='form-group'>
        <label>Email:</label>
        <input type='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='form-group'>
        <label>Password:</label>
        <input type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type='password' className='form-control'/>
      </div>
      <button className='btn btn-primary'>Login</button>
      {errorMessage && <p className='error-Message'>{errorMessage}</p>}
      {successMessage && <p className='success-Message'>{successMessage}</p>}
      
      </div>  
      
      
      </div>
  )
}

export default Login