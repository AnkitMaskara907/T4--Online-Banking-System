import React, { useState } from "react"
import logo from '../logo.svg';
import '../styles/Login.css';
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //Defining state for email, password
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const [successMessage,setSuccessMessage]=useState('');

  const history =useNavigate(); // navigate programmatically from one component to another component

//A method to handle login process
const handleLogin= async ()=>{
  if(!email||!password){
    setErrorMessage('Please enter both email or Password');
    return ;
  }
  const user={email,password};
  try{
      const loginSuccess=await AuthenticationService.login(user);// invoke service method
      console.log('Await Response: ',loginSuccess);
      if(loginSuccess){
        setSuccessMessage('login Successful ! Redirecting .....');
        setTimeout(()=>{
          history('/');
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
        <div className='login-container' style = {{backgroundColor:"white", marginTop: "100px"}}>
            
            <div className="form-group">
                <label>Email</label>
                <input type='email' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input type='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
        </div>
        
   
  )
}

export default Login