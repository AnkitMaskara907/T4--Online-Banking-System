import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";

const ViewUser = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    UserService.getAccountById(id)
      .then((res) => {
        console.log("response", res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log("response error", e.message);
      });
  }, [id]); // //values -id triggers re render whenever they are updated in your program,
  //you can add multiple values by separating them by commas

  const backProduct = () => {
    history("/admin");
  };

  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View User Details</h3>
        <hr />
        <div className="card-body">
          <div className="row">
            <label>User Id:</label>
            <div className="text-success fw-bolder">{user.uid}</div>
            <hr />
          </div>
          <div className="row">
            <label>Name:</label>
            <div className="text-success fw-bolder">{user.name}</div>
            <hr />
          </div>
          <div className="row">
            <label>Number:</label>
            <div className="text-success fw-bolder">{user.number}</div>
            <hr />
          </div>
          <div className="row">
            <label>Email address:</label>
            <div className="text-success fw-bolder">{user.email}</div>
            <hr />
          </div>
          <div className="row">
            <label>Address:</label>
            <div className="text-success fw-bolder">{user.address}</div>
            <hr />
          </div>
          <div className="row">
            <label>Date of Birth:</label>
            <div className="text-success fw-bolder">{user.dob}</div>
            <hr />
          </div>
          <div className="row">
            <label>Aadhar Number:</label>
            <div className="text-success fw-bolder">{user.aadhaar}</div>
            <hr />
          </div>
          <div className="row">
            <label>PAN Number:</label>
            <div className="text-success fw-bolder">{user.pan}</div>
            <hr />
          </div>
          <div className="row">
            <label>Status:</label>
            <div className="text-success fw-bolder">{(user.status!=null)?user.status.toString():"Null"}</div>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <button className="btn btn-info w-auto" onClick={backProduct}>
            Back To Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;