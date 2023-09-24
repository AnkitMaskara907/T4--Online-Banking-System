import React from "react";
import Sidebar from "../components/UserDashboard/Sidebar";

export const TransferFunds = () => {
  return (
    <div className="transfer-funds">
      <Sidebar />
      <h1>Transfer Funds</h1>
    </div>
  );
};

export const NEFT = () => {
  return (
    <div className="funds">
      <Sidebar />
      <h1>NEFT</h1>
    </div>
  );
};

export const RTGS = () => {
  return (
    <div className="funds">
      <Sidebar />
      <h1>RTGS</h1>
    </div>
  );
};
