import logo from '../logo.svg';
import React from 'react';
import { Link } from "react-router-dom"; 
import './Home.css';

function Home() {
  return (
    <div className="Home" style={{
      minHeight: '5vh'
    }}>
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h1>Wells Online Banking</h1>
      </header>
      <section>
        <div class="body" style={{
          minHeight:"80vh", backgroundImage: "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
          backgroundSize: "250vh"        
        }}>
      <div class="columns" style={{
        border:"none"
      }}>
        <div class="ButtonCentering" style={{
        minHeight:"60vh", border:"none"
      }}>
        <Link to="/login"><button>Login</button></Link>
        </div>
        <div class="ButtonCentering" style={{
        minHeight:"60vh", border:"none"
      }}>
        <Link to="/register"><button>Register</button></Link>
        </div>
        <div class="ButtonCentering" style={{
        minHeight:"60vh", border:"none"
      }}>
        <button>Open new account</button>
        </div>
      </div>
      </div>
      </section>
      <footer className="footer">
        <p>&copy; All Right Reserved to Wells</p>
      </footer>
    </div>

  );
}

export default Home;