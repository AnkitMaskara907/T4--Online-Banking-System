// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import NavBar from './components/NavBar';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSignIn, faCameraRetro, faCoffee} from '@fortawesome/free-solid-svg-icons';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/about';
import AllTransactions from './components/AllTransactions';
import { IdProvider } from './Context/IdContext';
// import Product from './components/Product';
import Home from './components/Home';
import Sidebar from "./components/Sidebar";
import Transaction from './components/Transactions';
import AccountDetails from './components/AccountDetails';

import AccountSummary from './components/AccountSummary';
import ChangePassword from './components/ChangePassword';
import OpenNewAccount from './components/OpenNewAccount';
library.add(faSignIn, faCameraRetro, faCoffee);

/*
	React Router is a standard library for routing in React. 
	It enables the navigation among views of various components in a React Application, 
  allows changing the browser URL, and keeps the UI in sync with the URL. 

	React Router is a JavaScript framework that lets us handle client and server-side 
  routing in React applications. 
  It enables the creation of single-page web or mobile apps that allow navigating without 
  refreshing the page. 
  It also allows us to use browser history features while preserving the right application
   view.

   Used Version6 of Router

 > npm install react-router-dom --save
*/

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Online Banking System</h1>
      </header> */}

      <section>
        <div style = {{
          backgroundColor: '#97144d',
          backgroundSize:'cover',
          minHeight:'140vh',
          minWidth:'100vw', margin: '0', padding:'1px'
        }}>
          <IdProvider>
          <Router>
            {/* <NavBar></NavBar>   */}
            <Routes>
              <Route path='/' element ={<Home/>}></Route>
              <Route path='/home' element ={<Home/>}></Route>
              <Route path='/register' element = {<Register/>}></Route>
              <Route path='/login' element = {<Login/>}></Route>
              <Route path='/about' element = {<About/>}></Route>
              <Route path="/dashboard/:id" element={<Sidebar/>}/>
              <Route path="/accountDetails/:id" element={<AccountDetails/>}/>
              <Route path="/accountSummary/:id" element={<AccountSummary/>}/>
              <Route path="/transaction/:id" element={<Transaction/>}/>
              <Route path="/openNewAccount/:id" element={<OpenNewAccount/>}/>
              <Route path="/changePassword/:id" element={<ChangePassword/>}/>
            </Routes>  
          </Router>
          </IdProvider>
        </div>
      </section>

      <footer className = "footer">
        <p>&copy; All rights reserved to Wells Fargo</p>
      </footer>
    </div>
  );
}

export default App;
