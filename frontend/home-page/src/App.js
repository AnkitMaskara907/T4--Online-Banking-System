import logo from './logo.svg';
import React from 'react';
// import './ButtonCentering.css'; 
import './App.css';

function App() {
  return (
    <div className="App" style={{
      minHeight: '5vh'
    }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Wells Online Banking</h1>
      </header>
      <section>
        <div class="body" style={{
          minHeight:"70vh", backgroundImage: "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
          backgroundSize: "250vh"        
        }}>
      <div class="columns" style={{
        border:"none"
      }}>
        <div class="ButtonCentering" style={{
        minHeight:"60vh", border:"none"
      }}>
        <button>Login</button>
        </div>
        <div class="ButtonCentering" style={{
        minHeight:"60vh", border:"none"
      }}>
        <button>Register</button>
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

export default App;
