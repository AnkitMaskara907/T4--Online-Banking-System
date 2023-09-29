import React,{useState,useEffect} from 'react'
import { useHref, useNavigate,useParams } from 'react-router-dom'
import '../styles/CreateAccount.css';
import UserService from '../service/UserService';
//import '../styles/Register.css';
//import AuthenticationService from '../service/AuthenticationService';

const CreateAccount = () => {
  const history = useNavigate();  // Object to navigate 

  const {id} = useParams();

  //defining state for dealer object
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [number, setNumber] = useState('');
  
  //for updating user
//   useEffect(() => {
//     {
//         UserService.getUserById(id).then((response)=>{
//             const user=response.data;
//             setName(user.name);
//             setEmail(user.email);
//             setAddress(user.address);
//             setDob(user.dob);
//             setAadhaar(user.aadhaar);
//             setPan(user.pan);
//         });
//     }
//   }, [id]);

  const saveOrUpdateUser = (event)=>{
    event.preventDefault();
    const user={name,email,address,dob,aadhaar,pan,number};
   
        UserService.createAccount(user).then(()=>{
            history(`/dashboard/${id}`);
        });
    // }{
    //     UserService.updateUser(user,id).then(()=>{
    //         history(`/dashboard/${id}`);
    //     });
    // }
  };

  const changeNameHandler=(event)=>{
    setName(event.target.value);
  };
  const changeEmailHandler=(event)=>{
    setEmail(event.target.value);
  };
  const changeAddressHandler=(event)=>{
    setAddress(event.target.value);
  };
  const changeDobHandler=(event)=>{
    setDob(event.target.value);
  };
  const changeAadhaarHandler=(event)=>{
    setAadhaar(event.target.value);
  };
  const changePanHandler=(event)=>{
    setPan(event.target.value);
  };
  const changeNumberHandler=(event)=>{
    setNumber(event.target.value);
  };
  const cancel=()=>{
    history('/admin');
  };

  const getTitle = ()=>{
    
        return <h1 className="text-center">Create an account</h1>
    // }else{
    //     return <h1 className='text-center'>Update account details</h1>
    // }
  };
  
  return (
    <div>
        <br></br>
        <div className='createAccount-container'>
            <div className='row'>
                <div className='form-outline mb-4'>
                    {getTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>Name: </label>
                                <input placeholder="Name" name="name" className="form-control" value={name} onChange={changeNameHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>Email: </label>
                                <input placeholder="Email" name="email" className="form-control" value={email} onChange={changeEmailHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>DOB: </label>
                                <input placeholder="yyyy-mm-dd" name="dob" className="form-control" value={dob} onChange={changeDobHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>Number: </label>
                                <input placeholder="Number" name="number" className="form-control" value={number} onChange={changeNumberHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>Address: </label>
                                <input placeholder="Address" name="address" className="form-control" value={address} onChange={changeAddressHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>Aadhaar: </label>
                                <input placeholder="Aadhaar" name="aadhaar" className="form-control" value={aadhaar} onChange={changeAadhaarHandler}/>
                            </div>
                            <div className='form-group'>
                                <label>PAN: </label>
                                <input placeholder="PAN" name="pan" className="form-control" value={pan} onChange={changePanHandler}/>
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateUser}>Save</button>
                            <button className='btn btn-danger' onClick={cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    /*<div><br/>
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
    </div>*/
  )
}

export default CreateAccount