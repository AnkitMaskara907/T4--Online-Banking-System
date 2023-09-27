import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../service/UserService'
import '../styles/ChangePassword.css'

const ChangePassword = () => {
  const {id}  = useParams();
  console.log(id)
  // useEffect(() => {
  //   console.log(id)
  // }, [useParams(id)])
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    UserService.changePassword(id, oldPassword, newPassword);
      // .then(response => {
      //   console.log('Password change response:', response.data);
      // })
      // .catch(error => {
      //   console.error('Error changing password:', error);
      // });
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     oldPassword: oldPassword,
    
    //     newPassword: newPassword
    //   })
    // };

    // axios.post(`http://localhost:8085/obs/api/users/${id}/changePassword`, requestData)
    // .then(response => {
    //   console.log('Password change response:', response.data);
    // })
    // .catch(error => {
    //   console.error('Error changing password:', error);
    // });
  };
  
  useEffect(() => {
    if (id) {
      // Fetch the data when id is available
      handleSubmit();
    }
  }, [id]); // Trigger the effect whenever id changes

  return (
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
      <button type="submit">Change Password</button>
    </form>
    </div>
  );
};

export default ChangePassword;
