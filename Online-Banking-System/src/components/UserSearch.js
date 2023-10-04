import React from "react";
import { useState } from "react";
import UserService from "../service/UserService";
import "../styles/UserSearch.css";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await UserService.searchUserByName(searchTerm);
      if (data.length === 0) {
        setMessage("No users found");
        setUsers([]);
      } else if (data.staus === 404) {
        setMessage("No users found");
        setUsers([]);
      } else {
        setMessage("");
        setUsers(data);
      }
    } catch (error) {
      console.error("Error searching for User: ", error);
      setMessage("No users found");
      setUsers([]);
    }
  };

  return (
    <div>
      <br />
      <div className="user-search-container">
        <h2 style={{ color: "green" }}>User Search</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter user name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {message && <p className="message">{message}</p>}
        {users.length > 0 && (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Made In</th>
                <th>Price</th>
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
                <td> {user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
