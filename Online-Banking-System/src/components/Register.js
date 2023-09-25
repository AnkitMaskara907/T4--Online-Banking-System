import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css';
import AuthenticationService from '../service/AuthenticationService';

const Register = () => {
  const history = useNavigate();  // Object to navigate 

  //defining state for dealer object
  const [user, setUser] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  /*
The JavaScript spread operator (...) allows us to quickly copy all or 
part of an existing array or object into another array or object.
*/
//Updates the state of a dealer Object when user enters data in the input fields
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name.includes('.')) {   
    const [parent, child] = name.split('.');
    setUser((prevUser) => ({
      ...prevUser,
      [parent]: {
        ...prevUser[parent],
        [child]: value
      }
    }));
  } 
  else {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length === 0) {
    try {
      await AuthenticationService.registeruser(user);
      setSuccessMessage('Registration successful!');
      // alert("Registration Successful");
      setTimeout(() => {
        history('/login'); // navigates to Login Component
      }, 3000);
    
    } 
    catch (error) {
      console.error('Registration error', error);
      setSuccessMessage('An error occurred during registration.');
    }
  } else {
    setErrors(validationErrors);
  }
};

const validateForm = () => {
  let validationErrors = {};
  if (!user.user_name) {
    validationErrors.user_name = 'User name is required!';
  }
  if (!user.email) {
    validationErrors.email = 'Email is required!';
  }

  if (!user.password) {
    validationErrors.password = 'Password is required.';
  } else if (user.password.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters.';
  }

  return validationErrors;
};



  return (
    <div><br/>
      <div className='registration-container'>
        <h2 style={{color:'brown'}}>User Registration</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Username:</label>
          <input
          type="text"
          name="user_name"
            value={user.user_name}
            onChange={handleChange}
            className={errors.user_name && 'error'}
          />
          {errors.user_name && <p className="error-message">{errors.user_name}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={errors.email && 'error'}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={errors.password && 'error'}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            value={user.password}
            onChange={handleChange}
            className={errors.password && 'error'}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Register
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Register