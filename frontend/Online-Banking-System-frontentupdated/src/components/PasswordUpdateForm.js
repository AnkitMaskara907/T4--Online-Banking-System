import React, { useState } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import '../styles/Login.css'
import NavBar from './NavBar';
import axios from 'axios';

function PasswordUpdateForm() {
  const history = useNavigate();
  const { uid } = useParams();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState('');

  

  const handleUpdatePassword = async () => {
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8085/obs/api/users/${uid}/password`, {
        oldPassword,
        newPassword,
      });
      console.log('API response: ', response);
      if(response)
      {
      setMessage('Password Updated Successfully, Redirecting....');
      setTimeout(() => {
        history(`/dashboard/${uid}`);
    }, 3000);
}else{
  setMessage('Please check your Password and try Again!');
}
    
    } catch (error) {
      setMessage('Password update failed. Please check your old password and try Again!');
    }
  };

  return (
  <div><NavBar></NavBar> <br/><br/>
  <div className ='login-container'>
    <h2 style = {{color: 'green'}}>Set New Password</h2>
    <form onSubmit={handleUpdatePassword}>
    <div className ='form-group'>
      <input
        className='form-control'
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
    </div>
    <div className ='form-group'>
      <input
      className='form-control'
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>
    <div className ='form-group'>
      <input
      className='form-control'
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => {
        
          setPasswordsMatch(newPassword === confirmPassword);
          
        }}
        
      />
     {!passwordsMatch && <p style={{ color: 'red' }}>Password does not match.</p>} 
    </div>
      
      <button className='btn-btn-primary' type="submit" disabled={!passwordsMatch}>Update Password</button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
}

export default PasswordUpdateForm;
