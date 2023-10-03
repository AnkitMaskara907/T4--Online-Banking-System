import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UserService from '../service/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountSummary = () => {
  const {id} =useParams();
  const [accntId,setAccntId]=useState();
  const [user,setUser]=useState([]);
  const [transactions, setTransactions] = useState([{}]);
  const [balance,setBalance]=useState();

  useEffect(()=>{
    const fetchTransactions=async()=>{
      try{
        const userResponse=await UserService.getAccountByEmail((await UserService.getUserById1(id)).data.email);
        console.log("Asking for last 10 transactions");
        setUser(userResponse.data);
        setAccntId(userResponse.data.uid);
        setBalance(userResponse.data.balance);
        const response=await AuthenticationService.lastTenTransactions(id);
        console.log("Transactions",response);
        setTransactions(Object.values(response));
      }
      catch(error){
        console.log("Recent Transactions Error",error);
      }
    }
    fetchTransactions();
  },[id]);
  return (
    <div>
        <Sidebar/>
        <div className="container"></div>
      <div>
        <h1><span style={{color:'orange'}}>Account Summary</span></h1>
      </div>
      <br/>
      <div className="row justify-content-center">
        <table className="table table-success w-50">
          <thead>
            <tr className="table-danger">
              <th> Account Number</th>
              <th> Name</th>
              <th> Email-id</th>
              <th> Date of Birth</th>
              <th> Aadhar</th>
              <th> PAN </th>
              <th> Phone No.</th>
              <th> Balance</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={user.transactionId}>
                <td> {user.uid} </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.dob} </td>
                <td> {user.aadhaar} </td>
                <td> {user.pan} </td>
                <td> {user.number} </td>
                <td> <FontAwesomeIcon icon="indian-rupee-sign"/>{user.balance}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
<br/><br/>
      <h1 className="text-warning">Recent Transactions</h1>
      <br />
      <div className="row justify-content-center">
        <table className="table table-success w-50">
          <thead>
            <tr className="table-danger">
              <th> Transaction ID</th>
              <th> Date</th>
              <th> Mode of Transaction</th>
              <th> Amount</th>
              <th> Transaction Type</th>
              <th> Account</th>
              <th> Remarks</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td> {transaction.transactionId} </td>
                <td> {transaction.date} </td>
                <td> {transaction.transactionTypeId} </td>
                <td>
                <span style={{ color: (accntId == transaction.toAc) ? 'green' : 'red' }}>
                    {accntId == transaction.toAc ? (
                    <FontAwesomeIcon icon="square-arrow-up-right" />
                    ) : (
                    <FontAwesomeIcon icon="square-arrow-up-right" rotation={180} />
                    )}
                    &nbsp;<FontAwesomeIcon icon="indian-rupee-sign"/>{transaction.amount}
                </span>
                </td>
                <td> {accntId==transaction.toAc?"Credit":"Debit"} </td>
                <td> {(accntId==transaction.toAc)?transaction.fromAc:transaction.toAc} </td>
                <td> {transaction.remarks} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AccountSummary