import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";
import UserSearch from "./UserSearch";
import AuthenticationService from "../service/AuthenticationService";
import Sidebar from "./Sidebar";


const AllTransactions = ()=>{
  const {id}=useParams();
  const [accnt,setAccnt]=useState([]);
  const [transactions, setTransactions] = useState([{}]);
  const [message, setMessage] = useState("");
//   const [accntId,setAccntId]=useState();
  //react hook to manage lifecycle of a component
  useEffect(() => {
    const fetchTransactions = async()=>{
        try{
            const userResponse=await UserService.getAccountByEmail((await UserService.getUserById1(id)).data.email);
            console.log("accntId:",userResponse.data.uid);
            setAccnt(userResponse.data);
            const response=await AuthenticationService.allTransactions(id);
            console.log("Response:",response);
            setTransactions(Object.values(response));
        }
        catch(error){
            console.log("Fetching All Transactions Error:",error);
        }
    }
    fetchTransactions(); //invokes fetch products method when component is rendered
  },[id]);

  return (
    <div>
      <Sidebar></Sidebar>
      <br/>
      <div style={{border:'1px solid',width:'30%',borderRadius: '10px',padding:'5px',verticalAlign:'middle !important'}}>
        <h4 style={{color:'#f7786f',textAlign:'center'}}>Your Current Bank Balance: {<FontAwesomeIcon icon="indian-rupee-sign"/>}{accnt.balance}</h4>
      </div>
      <div className="container"></div>
      <h1 className="text-warning">All Transactions</h1>
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
                <span style={{ color: (accnt.uid == transaction.toAc) ? 'green' : 'red' }}>
                    {accnt.uid == transaction.toAc ? (
                    <FontAwesomeIcon icon="square-arrow-up-right" />
                    ) : (
                    <FontAwesomeIcon icon="square-arrow-up-right" rotation={180} />
                    )}
                    &nbsp;<FontAwesomeIcon icon="indian-rupee-sign"/>{transaction.amount}
                </span>
                </td>
                <td> {accnt.uid==transaction.toAc?"Credit":"Debit"} </td>
                <td> {(accnt.uid==transaction.toAc)?transaction.fromAc:transaction.toAc} </td>
                <td> {transaction.remarks} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {message && <div className="alert alert-success">{message}</div>} */}
    </div>
  );
};

export default AllTransactions;