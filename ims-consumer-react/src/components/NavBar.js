import React from "react";
import {Link} from 'react-router-dom';
import '../styles/NavBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

/*
Install

npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome*/ 

const NavBar = () =>{
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to ="/register" className = "nav-link">
                    <span><FontAwesomeIcon icon = "camera-retro"></FontAwesomeIcon></span> &nbsp;
                    Register</Link>
                    
                </li>

                <li className="nav-item">
                    <Link to ="/login" className = "nav-link">
                    <span><FontAwesomeIcon icon = "sign-in"></FontAwesomeIcon></span> &nbsp;    
                    Login</Link>
                </li>

                <li className="nav-item">
                    <Link to ="/about" className = "nav-link">
                    <span><FontAwesomeIcon icon = "coffee"></FontAwesomeIcon></span> &nbsp;
                    About Us</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;