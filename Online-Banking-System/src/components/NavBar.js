// import React from "react";
// import {Link} from 'react-router-dom';
// import '../styles/NavBar.css';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";
// import { faS, fas } from "@fortawesome/free-solid-svg-icons";

// /*
// Install

// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome*/ 

// const NavBar = () =>{
//     library.add(faFortAwesome,faS,fas);
//     return (
//         <nav className="navbar">
//             <ul className="nav-list">
//             <li className="nav-item">
//                     <Link to ="/" className = "nav-link">
//                     <span><FontAwesomeIcon icon="house" /></span> &nbsp;
//                     Home</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link to ="/register" className = "nav-link">
//                     <span><FontAwesomeIcon icon = "camera-retro"></FontAwesomeIcon></span> &nbsp;
//                     Register</Link>
                    
//                 </li>

//                 <li className="nav-item">
//                     <Link to ="/login" className = "nav-link">
//                     <span><FontAwesomeIcon icon = "sign-in"></FontAwesomeIcon></span> &nbsp;    
//                     Login</Link>
//                 </li>

//                 <li className="nav-item">
//                     <Link to ="/about" className = "nav-link">
//                     <span><FontAwesomeIcon icon = "coffee"></FontAwesomeIcon></span> &nbsp;
//                     About Us</Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// }

// export default NavBar;
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/NavBar.css";

// import ThemeToggle from "../../ThemeToggle/ThemeToggle";

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

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0 px";
  } else {
    document.getElementById("navbar").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
}

function MyNavbar({label}) {

  const links = ["home", "register", "login"]; 

  const [active, setActive] = useState("home"); 

  const location = useLocation();

  useEffect(() => {
    const loc = location.pathname.substring(1, location.pathname.length);
    setActive(loc);
  }, [location])

  const navigate = useNavigate(); 

  return (
    <Navbar id='navbar' className="Navbar" fixed="top" expand="lg">
      <Container style={{maxWidth:'90%',color:'antiquewhite'}} >
        <Navbar.Brand className="NavbarBrand" onClick={()=>{ navigate("/");setActive("home")}}>
          Axis Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto"
            onSelect={(eventKey) => {
              setActive(eventKey);
              navigate('/' + eventKey);
              console.log(eventKey);
            }}
            activeKey={active}>
            {links.map((link,i) => (
              <motion.div key={i} className="mx-1 d-flex flex-column align-items-center">
                <motion.div
                  variants={NavLinkVariants}
                  whileHover="hover"
                  >
                  <Nav.Link eventKey={link}>{link.toUpperCase()}</Nav.Link> 
                </motion.div>
                {active === link && underline}
              </motion.div>
            ))}
             <motion.div key={'About Us'} className="mx-1 d-flex flex-column align-items-center">
                <motion.div
                  variants={NavLinkVariants}
                  whileHover="hover"
                  >
                  <Nav.Link eventKey={'About Us'} href="/about-us">About Us</Nav.Link>  
                </motion.div>
                {active === 'docs' && underline}
              </motion.div>
          </Nav>
        </Navbar.Collapse>
        {/* <ThemeToggle/> */}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;