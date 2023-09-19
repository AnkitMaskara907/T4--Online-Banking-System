import "./App.css";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, 
    Route, } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import NavBar from './components/NavBar';

const App = () => {
return (
	<div class="body" style={{
		minHeight:"100vh", backgroundImage: "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
		backgroundSize: "250vh"        
	  }}>
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
	<NavBar></NavBar>
		<Routes>	
		{/* <Route exact path="/" element={<Home />} /> */}
		<Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
		<Route path="/account" element={<Account/>} />

			
		{/* <Redirect to="/" /> */}
		</Routes>
	</Router>
	</div>
);
}

export default App;
