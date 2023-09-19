import "./App.css";
// importing components from react-router-dom package
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import Home from "./components/Home";
import Account from "./pages/Account";
import AccountDetails from "./pages/AccountDetails";
import AccountSummary from "./pages/AccountSummary";
import AddPayee from "./pages/AddPayee";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import OpenAccount from "./pages/OpenAccount";
import Register from "./pages/Register";
import { NEFT, RTGS, TransferFunds } from "./pages/TransferFunds";
import Home from "./components/Home";

const App = () => {
  return (
    <div
      class="body"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
        backgroundSize: "250vh",
      }}
    >
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />

          {/* <Redirect to="/" /> */}
        </Routes>
        <Routes>
          <Route path="/account-details" element={<AccountDetails />} />
          <Route path="/account-summary" element={<AccountSummary />} />
          <Route path="/add-payee" element={<AddPayee />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/transfer-funds" element={<TransferFunds />} />
          <Route path="/transfer-funds/NEFT" element={<NEFT />} />
          <Route path="/transfer-funds/RTGS" element={<RTGS />} />
          <Route path="/open-account" element={<OpenAccount />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
