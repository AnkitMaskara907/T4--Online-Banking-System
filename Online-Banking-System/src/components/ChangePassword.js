import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import UserService from '../service/UserService'
import '../styles/ChangePassword.css'
import Sidebar from './Sidebar';

const ChangePassword = () => {
  const history = useNavigate();
  const {id}  = useParams();
  console.log(id)

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit  = (event) => {

    UserService.changePassword(id, oldPassword, newPassword);

    history(`/dashboard/${id}`);
  };
  
  return (
    <div>
    <Sidebar></Sidebar>
    <div className ='password-container'>
      
    <form onSubmit={handleSubmit}>
      <div>
        <label>Old Password:</label>
        <input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
        
      </div>
    <br></br>
      <button type="submit">Change Password</button>
    </form>
    </div>
    </div>
  );
};

export default ChangePassword;
