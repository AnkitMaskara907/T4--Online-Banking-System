import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Wells Fargo</h1>
      </header>

      <section>
        <div
          style={{
            backgroundImage: "url(/images/back.png)",
            backgroundSize: "cover",
            minHeight: "140vh",
            minWidth: "100vw",
            margin: 0,
            padding: "1px",
          }}
        >
          <h2>Welcome to Online Banking System</h2>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; All rights reserved to Wells Fargo</p>
      </footer>
    </div>
  );
}

export default App;
