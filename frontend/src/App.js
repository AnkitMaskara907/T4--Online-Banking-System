import "./App.css";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, 
    Route, } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
return (
	<>
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
		<Routes>	
		<Route exact path="/" element={<Home />} />
		<Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

			
		{/* <Redirect to="/" /> */}
		</Routes>
	</Router>
	</>
);
}

export default App;
