import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Login.css'
import AuthenticationService from '../service/AuthenticationService'
import UserService from '../service/UserService'
import NavBar from './NavBar';
import { useIdContext } from '../Context/IdContext';

const Login = () => {
    //defining state for email and password
    const history = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[successMessage, setSuccessMessage] = useState('');
    const { setAccountId}=useIdContext(); 
    let Tempid='';
    const handleLogin = async () =>{
        if( !email || !password ){
            setErrorMessage('Please enter both email or password');
            return;
        }
        if (email == "admin@gmail.com" && password == "123456"){
            setSuccessMessage('Login Successful. Redirecting to admin page...');
            setTimeout(() => {
            history('/admin'); // Redirect to the admin page
            }, 3000);
        }
        else{
        const dealer = {email, password};

        try{
            const loginSuccess = await AuthenticationService.login(dealer);
            console.log('API response: ', loginSuccess);
            if(loginSuccess)
            { 
                const response = await UserService.getUserByEmail(email);
                console.log("response:",response);
                Tempid = response.data.user_id;
                console.log(response);
                setSuccessMessage('Login Successful, Redirecting....');
                setTimeout(() => {
                    history(`/dashboard/${Tempid}`);//
                }, 3000);
            }
            else{
                setErrorMessage('Invalid email or Password');
            }
        }
        catch (error){
            console.error('Login Error : ', error);
            setErrorMessage('An error occured during login');
        }
    }
};
useEffect(()=>{
    setAccountId(Tempid);
},[Tempid,setAccountId]);
//C:\ReactProjects\Team project\T4--Online-Banking-System\Online-Banking-System\src\components\Login.js
  return (
    <div><NavBar></NavBar> <br/><br/>
        <div className ='login-container'>
            <h2 style = {{color: 'green'}}>User Login</h2>
            <div className ='form-group'>
                <label>Email: </label>
                <input type='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className ='form-group'>
                <label>Password: </label>
                <input type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='btn-btn-primary' onClick={() => handleLogin()}>Login</button>
            {errorMessage && <p className = 'error-message'>{errorMessage}</p>}
            {successMessage && <p className = 'success-message'>{successMessage}</p>}
        </div>
    </div>
  )
}

export default Login