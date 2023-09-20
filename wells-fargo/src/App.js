import logo from './logo.svg';
import './App.css';
import { Main } from './component/Main';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Hello Myself Anubhab, created my first ReactJS app
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <h1>Wells Fargo</h1>
      </header>
      
      <section className='Main'>
        <Main></Main>
      </section>

      <footer className='footer'>
        <Footer></Footer>
      </footer>

    </div>
  );
}

export default App;
