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



const Transaction = () => {


const history = useNavigate();
const [account, setAccount] = useState({
    fromAc:'',
    toAc: '',
    date:'2023-09-26',
    amount: 0,
    transactionTypeId:'',
    remarks: '',
  });
const {id} = useParams();
const [accountId, setAccountId] = useState('');
const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

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
        history('/allTransactions/'+accountId); // navigates to Login Component
    }, 3000);
    
    } 
    catch (error) {
    console.error('Transaction error', error);
    setSuccessMessage('An error occurred during Transaction.');
    }
} else {
    setErrors(validationErrors);
}
};

const validateForm = () => {
    let validationErrors = {};
    if (!account.toAc) {
      validationErrors.toAc = 'toAc is required!';
    }
    if (!account.amount) {
      validationErrors.amount = 'Email is required!';
    }
    if (!account.transactionTypeId) {
      validationErrors.transactionTypeId = 'Transaction type is required';
    } 
    return validationErrors;
  };
  useEffect(() => {
    
    const fetchAccountId = async () => {
        try {
          const response = await UserService.getAccountByEmail((await UserService.getUserById(id)).data.email);
          console.log("Account=",response);
          const fetchedAccountId = response.data.uid;
          setAccountId(fetchedAccountId);
          setAccount((prevAccount) => ({
            ...prevAccount,
            fromAc: fetchedAccountId,
          }));
        } catch (error) {
          console.error('Error fetching accountId', error);
        }
      };

    fetchAccountId();
  }, [id]);

  useLayoutEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'instant',  
    });
  },[]);
  return (

<div><br/>
      <div className='transaction-container'>
        <h2 style={{color:'brown'}}>Transaction</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>toAc:</label>
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
          <label>amount:</label>
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
          <label>transactionTypeId:</label>
          <input
            type="text"
            name="transactionTypeId"
            value={account.transactionTypeId}
            onChange={handleChange}
            className={errors.transactionTypeId && 'error'}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>remarks:</label>
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
            submit
          </button>
        </div>
        </form>
      </div>
    </div>
)};

export default Transaction;