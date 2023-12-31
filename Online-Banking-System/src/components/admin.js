import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import UserSearch from "./UserSearch";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const NavLinkVariants = {
  //   color:white,
    hover: {
      scale: 1.1,
      textShadow: ['0px 0px 0px rgb(217,217,217)',"0px 0px 2px rgb(255,255,255)"],
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };
  
  const underline = (
    <motion.div
    transition={{
      layout : {
        ease: "easeInOut",
      }
    }}
    className="underline"
      layoutId="underline" 
    />
  );
  

const Admin = () => {
  const history = useNavigate();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  //react hook to manage lifecycle of a component
  useEffect(() => {
    fetchUsers(); //invokes fetch products method when component is rendered
  }, []);

  const fetchUsers = () => {
    UserService.getUsers().then((response) => {
      setUsers(response.data);
      console.log("resp", response.data);
    });
  };

  const viewUser = (id) => {
    history(`/viewUser/${id}`); //use back quote operator to evaluate the jsx expression
  };

  const deleteUser = (id) => {
    UserService.deleteUser(id).then(() => {
      fetchUsers(); // Refresh products list
      setMessage("Product deleted successfully.");
      // Clear the message after 2 seconds
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });
  };

  const ToggleUserAdmin = async (uid) => {
    try {
      const response = await axios.put(
        "http://localhost:8085/obs/api/toggleUser/" + uid
      );

      console.log(response.data);

      UserService.getUsers()
        .then((response) => {
          setUsers(response.data);
          console.log("response success");
        })
        .catch((e) => {
          console.log("toggle get users response", e);
        });
    } catch (e) {
      console.log("toggle user error", e.message);
    }
  };

  return (

        
    <div>
          <Navbar id='navbar' className="Navbar" fixed="top" expand="lg">
      <Container style={{maxWidth:'90%',color:'antiquewhite'}} >
        <Navbar.Brand className="NavbarBrand">
          Voyager Bank
        </Navbar.Brand>
        </Container>
    </Navbar>
      <br />
      <div className="container"></div>
      <h1 className="text-warning">User List</h1>
      <br />
      <UserSearch/>
      <br />
      {/* <div className="row justify-content-center">
        <button className="btn-btn-info w-auto" onClick={addProduct}>
          Add Product
        </button>
      </div> */}
      <br />
      <div className="row justify-content-center">
        <table className="table table-success w-50">
          <thead>
            <tr className="table-danger">
              <th> User Id</th>
              <th> Name</th>
              <th> Number</th>
              <th> Email</th>
              <th> Address</th>
              <th> Date of Birth</th>
              <th> Aadhar</th>
              <th> PAN</th>
              <th> Status</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td> {user.uid} </td>
                <td> {user.name} </td>
                <td> {user.number} </td>
                <td> {user.email} </td>
                <td> {user.address} </td>
                <td> {user.dob} </td>
                <td> {user.aadhaar} </td>
                <td> {user.pan} </td>
                <td>
                  {" "}
                  {user.status}{" "}
                  <button
                    onClick={(e) => {
                      console.log("clicked here");
                      ToggleUserAdmin(user.uid);
                    }}
                    style={{
                      backgroundColor:
                        user.status === true ? "tomato" : "lightgreen",
                    }}
                  >
                    {user.status === true ? "De-activate" : "Activate"}
                  </button>{" "}
                </td>
                <td>
                  {/* <button
                    className="btn btn-success"
                    onClick={() => editProduct(prod.pid)}
                  >
                    <span>
                      <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                    </span>
                  </button>
                  &nbsp; */}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user.uid)}
                    >
                      <span>
                        <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                      </span>
                    </button>
                    <div style={{ width: 5 }} />
                    &nbsp;
                    <button
                      className="btn btn-primary"
                      onClick={() => viewUser(user.uid)}
                    >
                      <span>
                        <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
    
     </div>
  );
};

export default Admin;
