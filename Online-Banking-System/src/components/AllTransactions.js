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
  const [accntId,setAccntId]=useState();
  const [transactions, setTransactions] = useState([{}]);
  const [message, setMessage] = useState("");
//   const [accntId,setAccntId]=useState();
  //react hook to manage lifecycle of a component
  useEffect(() => {
    const fetchTransactions = async()=>{
        try{
            const userResponse=await UserService.getAccountByEmail((await UserService.getUserById1(id)).data.email);
            console.log("accntId:",userResponse.data.uid);
            setAccntId(userResponse.data.uid);
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
                <span style={{ color: (accntId == transaction.toAc) ? 'green' : 'red' }}>
                    {accntId == transaction.toAc ? (
                    <FontAwesomeIcon icon="square-arrow-up-right" />
                    ) : (
                    <FontAwesomeIcon icon="square-arrow-up-right" rotation={180} />
                    )}
                    &nbsp;{transaction.amount}
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
      {/* {message && <div className="alert alert-success">{message}</div>} */}
    </div>
  );
};

export default AllTransactions;