import { Container, Row, Col } from "react-bootstrap";
import React,{useLayoutEffect} from 'react';
import {motion, useViewportScroll, useTransform} from 'framer-motion';

import MyButton from "./MyButton";
import RegisterSVG from "../Abstracts/RegisterSVG";
import "../styles/RegisterSVG.css";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './NavBar';
import { Parallax } from 'react-scroll-parallax';

const low={
  color:"red",
  width:"min-content",
};
const high={
  color:"green",
  width:"min-content",
};


const Home = () => {

  useLayoutEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'instant',  
    });
  },[]);
  const redirectToLink = () => {
    const targetUrl = 'http://localhost:3000/login';
    window.location.href = targetUrl;
  };
  return (
    
    <Container className="container-lg" style={{backgroundColor:"inherit"}}>
       {/* <Parallax speed={-70}> */}
       <div><NavBar></NavBar></div>
      <motion.div className="banner"
        initial={{ opacity: 0,y: 500, rotate: -90 }}
        animate={{ opacity: 1,y: -100 }}
        transition={{ duration: 1 }}
      >
      </motion.div>

      <Row className="row" style={{marginTop:'10%',backgroundColor:'inherit'}}>
        <Col className="col-7 my-auto">
          <Container className="d-flex flex-column justify-content-center align-content-center">
            <Row className="my-4 align-self-center text-center">Online Banking System</Row>
            
          </Container>
        </Col>
        
        <Col className="col-5" >
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink}>
          <RegisterSVG/>
          Login
          </Row>
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink}>
          <RegisterSVG/>
          Make A Transaction
          </Row>
          <Row className="svg-container svg-link" style={{marginTop:'10%'}} onClick={redirectToLink}>
          <RegisterSVG/>
          Have Queries ?
          </Row>
          {/* <RegisterSVG/>
          Make A Transaction */}
        </Col>
      </Row>
      <Row className="row">
        <Col className="col-7 my-auto">
            {/* <Illustration /> */}
        </Col>
        <Col className="col-5 my-auto">
          <Row></Row>
          <Row className="md-2">
            <Row className="B"><div style={low}></div></Row>
            <Row className="S"><div style={high}></div></Row>
          </Row>
          {/* <Row className="my-4">
            <MyButton text="Explore" link="/explore" />
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;