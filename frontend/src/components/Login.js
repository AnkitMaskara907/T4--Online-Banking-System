import React, { useState } from "react"

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
  const dealer={email,password};
  try{
      const loginSuccess=await AuthenticationService.login(dealer);// invoke service method
      console.log('Await Response: ',loginSuccess);
      if(loginSuccess){
        setSuccessMessage('login Successful ! Redirecting .....');
        setTimeout(()=>{
          history('/product');
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
    <div>
        <br/><br/>
        <div className='container' style={{
        minHeight:"100vh", backgroundImage: "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
        backgroundSize: "250vh"        
      }}>
            <h2 style={{color:'green'}}>Dealer Login</h2>
            <div className="form-group">
                <label>Email :</label>
                <input type='email' className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label>Password :</label>
                <input type='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
        </div>
        
    </div>
  )
}

export default Login