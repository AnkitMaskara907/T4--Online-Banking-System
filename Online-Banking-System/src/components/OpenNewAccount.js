import React,{useState,useEffect} from 'react'
import { useHref, useNavigate,useParams } from 'react-router-dom'
import '../styles/CreateAccount.css';
import UserService from '../service/UserService';
import Sidebar from './Sidebar'

const OpenNewAccount = () => {
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
        <Sidebar></Sidebar>
        <h1>Open New Account</h1>
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
</div>
    
  )
}

export default OpenNewAccount