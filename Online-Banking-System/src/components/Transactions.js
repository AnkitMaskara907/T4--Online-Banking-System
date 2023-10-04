import React,{useEffect, useLayoutEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import {motion, useViewportScroll, useTransform} from 'framer-motion';
import "../styles/RegisterSVG.css";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Transactions.css";
import AuthenticationService from '../service/AuthenticationService';
import { useParams } from "react-router-dom";
// import { useIdContext } from "../Context/IdContext";
import UserService from '../service/UserService';
import Sidebar from './Sidebar';

const Transaction = () => {
const history = useNavigate();
const [account, setAccount] = useState({
    fromAc:'',
    toAc: '',
    date:new Date(),
    amount: 0,
    transactionTypeId:'',
    remarks: '',
  });
const [currentTime, setCurrentTime] = useState(new Date());
const {id} = useParams();
const [accountId, setAccountId] = useState('');
const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');
const [paymentMode, setPaymentMode] = useState('');


useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentTime(new Date()); 
  }, 1000); 
  return () => {
    clearInterval(intervalId);
  };
}, [id]); 

const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {   
      const [parent, child] = name.split('.');
      setAccount((prevAccount) => ({
        ...prevAccount,
        [parent]: {
          ...prevAccount[parent],
          [child]: value
        }
      }));
    } 
    else {
      if (name === 'transactionTypeId') {
        setPaymentMode(value);
      }
      setAccount((prevAccount) => ({
        ...prevAccount,
        [name]: value
      }));
    }
};
const handleSubmit = async (e) => {
e.preventDefault();
const validationErrors = validateForm();
if (Object.keys(validationErrors).length === 0) {
    try {
        console.log("Account Id:",account.fromAc);
    console.log(account);
    await AuthenticationService.executeTransaction(account);
    setSuccessMessage('Transaction successful!');
    alert("Your Transaction is Successful !");
    console.log(accountId);
    setTimeout(() => {
        history('/allTransactions/'+id); // navigates to Login Component
    }, 3000);
    
    } 
    catch (error) {
    console.error('Transaction error', error);
    setSuccessMessage('An error occurred during Transaction.');
    }
} else {
    setErrors(validationErrors);
    console.log("Error submitting the transaction");
}
};

const validateForm = () => {
    let validationErrors = {};
    if(!account.fromAc){
      validationErrors.fromAc='The Account does not exist or might not have been activated yet !';
    }
    if (!account.toAc) {
      validationErrors.toAc = 'Beneficiary account does not exist!';
    }
    if (!account.amount) {
      validationErrors.amount = 'Enter non-null amount!';
    }
    if (!account.transactionTypeId) {
      validationErrors.transactionTypeId = 'Transaction type is required';
    } 
    return validationErrors;
  };
  useEffect(() => {
    
    const fetchAccountId = async () => {
        try {
          const response = await UserService.getAccountByEmail((await UserService.getUserById1(id)).data.email);
          console.log("Account=",response);
          let fetchedAccountId = response.data.uid;
          {console.log("Time:",currentTime)}
          if(!response.data.status)
            fetchAccountId=null;
          setAccountId(fetchedAccountId);
          // setCurrentTime(currentTime);
          setAccount((prevAccount) => ({
            ...prevAccount,
            date:currentTime.toLocaleString(),
            fromAc: fetchedAccountId,
          }));
        } catch (error) {
          console.error('Error fetching accountId', error);
        }
        console.log("Currenttime is :",account.date);
      };

    fetchAccountId();
  }, [id]);
  useEffect(()=>{
    const toAccountDetails=async()=>{
      try{
        setErrors({});
        const response = await UserService.getAccountById(account.toAc);
        if(!response.data.status){
          setAccount((prevAccount)=>({
            ...prevAccount,
            toAc: null
          }));
        }
      }
      catch(error){
        setAccount((prevAccount)=>({
          ...prevAccount,
          toAc: null
        }));
      }
    };
    toAccountDetails();
  },[account.toAc])

  useLayoutEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'instant',  
    });
  },[]);
  return (
<div>
<Sidebar/>
      <div className='transaction-container'>
        <h2 style={{color:'brown'}}>Transaction</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
        {errors.fromAc && <p className="error-message">{errors.fromAc}</p>}
        </div>
      <div className="form-group">
          <label>Beneficiary Account Number<span style={{color:'red'}}>*</span>:</label>
          <input
          type="text"
          name="toAc"
            value={account.toAc}
            onChange={handleChange}
            className={errors.toAc && 'error'}
          />
          {errors.toAc && <p className="error-message">{errors.toAc}</p>}
        </div>
        <div className="form-group">
          <label>Amount To Transfer<span style={{color:'red'}}>*</span>:</label><br></br>
          <input
            type="number"
            name="amount"
            value={account.amount}
            onChange={handleChange}
            className={errors.amount && 'error'}
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
        </div>
        <div className="form-group">
          <label>Transaction type<span style={{color:'red'}}>*</span>:</label>
          <br/>
          <select
            name="transactionTypeId"
            value={paymentMode}
            onChange={(handleChange)}
            className={errors.transactionTypeId && 'error'}
          >
            <option value="">Select..</option>
            <option value="NEFT">NEFT</option>
            <option value="IMPS">IMPS</option>
            <option value="RTGS">RTGS</option>
          </select>
          {errors.transactionTypeId && <p className="error-message">{errors.transactionTypeId}</p>}
        </div>

        <div className="form-group">
          <label>Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={account.remarks}
            onChange={handleChange}
            // className={errors.password && 'error'}
          />
          {/* {errors.password && <p className="error-message">{errors.password}</p>} */}
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
// </div>

)};

export default Transaction;