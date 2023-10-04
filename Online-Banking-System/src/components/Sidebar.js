import React, { useState , useEffect} from "react";
import styled from "styled-components";
import { Link , useParams} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import UserService from '../service/UserService'
import { Container, Row, Col } from "react-bootstrap";
import {motion, useViewportScroll, useTransform} from 'framer-motion';

import RegisterSVG from "../Abstracts/RegisterSVG";
import "../styles/RegisterSVG.css";
import "../styles/Home.css";
import "../styles/shipSvg.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './NavBar';
import { Parallax } from 'react-scroll-parallax';
import Ship from "../Abstracts/Ship";
const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const Greeting = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  color: white;
  font-weight: 900;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = () => {
  const { id } = useParams();
  const redirectToLink1 = () => {
    const targetUrl = 'http://localhost:3000/openNewAccount/'+id;
    window.location.href = targetUrl;
  };
  const redirectToLink2 = () => {
    const targetUrl = 'http://localhost:3000/transaction/'+id;
    window.location.href = targetUrl;
  };
  const redirectToLink3 = () => {
    const targetUrl = 'http://localhost:3000/changePassword/'+id;
    window.location.href = targetUrl;
  };
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);
const [userDetails,setUserDetails]=useState({user_id:"",user_name:"",email:""});
// const [user_name, setUserName] = useState('');
useEffect(() => {
    // Fetch user details based on the ID
    UserService.getUserById1(id)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);
return (
	<>
  <IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
		<NavIcon to="#">
			<FaIcons.FaBars onClick={showSidebar} />
		</NavIcon>&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h1 style={{color:"white"}}> Voyager Bank </h1>
        <Greeting>Hi, {userDetails.user_name}</Greeting>
		</Nav>
		{/* <h1>Hi, {userDetails.user_name}</h1> */}
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
  const linkTo = item.path.replace(':id', id); // Replace :id with the actual id

  
  return (
    <SubMenu
      item={{ ...item, path: linkTo }}
      key={index}
    />
  );
})}
					{/* {SidebarData.map((item, index) => {
//  const linkTo = item.path.includes(':id') ? `/transaction/${id}` : item.path;
  return (
    <SubMenu
      item={{ ...item, path: linkTo }}
      key={index}
    />
  );
})} */}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
  { (window.location.href=="http://localhost:3000/dashboard/"+id)&&
  (<Container className="container-lg" style={{backgroundColor:"inherit"}}>       
      <Row className="row" style={{backgroundColor:'inherit'}}>
        <Col className="col-7 my-auto">
              <Ship/>            
        </Col>
        
        <Col className="col-5" >
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink1}>
          <RegisterSVG/>
          Open Account
          </Row>
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink2}>
          <RegisterSVG/>
          Make A Transaction
          </Row>
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink3}>
          <RegisterSVG/>
          Change Password
          </Row>
          {/* <RegisterSVG/>
          Make A Transaction */}
        </Col>
      </Row>
      <Row className="row">
        <Col className="col-7 my-auto">
            {/* <Illustration /> */}
        </Col>
      </Row>
    </Container>)}
	</>
);
};

export default Sidebar;
