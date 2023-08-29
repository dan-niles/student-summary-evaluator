import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import TextField from './components/TextField';
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <Routes>
              {/* <Route path="/" element={<TextField />} /> */}
              <Route path="/" element={<Form />} />
    </Routes>
    </Router>
      
  );
}

export default App;













{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}