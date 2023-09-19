import React from "react"
import {Link} from "react-router-dom"
import '../styles/NavBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logo from '../logo.svg';

//Arrow functional component
const NavBar = () => {
    return(
        <nav className="navbar">
            
            <img src={logo} className="Home-logo" alt="logo" />
        <h2>Wells Online Banking</h2>
    
            <ul className="nav-list">
                {/* <li className="nav-item">
                    <Link to="/product" className="nav-link"> <span><FontAwesomeIcon icon="bomb"></FontAwesomeIcon></span> &nbsp;
                    Products</Link>                    
                </li> */}
                <li className="nav-item">  
                    <Link to="/register" className="nav-link"> <span><FontAwesomeIcon icon="camera-retro"></FontAwesomeIcon></span> &nbsp;
                    Register</Link>                    
                </li>
                <li className="nav-item">                
                    <Link to="/login" className="nav-link"><span><FontAwesomeIcon icon="sign-in"></FontAwesomeIcon></span> &nbsp;
                    Login</Link>                    
                </li>
                {/* <li className="nav-item">                
                    <Link to="/about" className="nav-link"><span><FontAwesomeIcon icon="coffee"></FontAwesomeIcon></span> &nbsp;About Us</Link>                    
                </li> */}
            </ul>
        </nav>
    );
}

export default NavBar;