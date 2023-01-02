import logo from "../logo.svg";
import "../App.css";
import { Button } from "antd";
import { employeeLogout } from "../api/authentication.js";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => console.log("test")}>test</button>
        <a
          className="App-link"
          href="/employee-portal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Employee portal
        </a>
        <Button onClick={employeeLogout}>employeeLogout</Button>
      </header>
    </div>
  );
}

export default Home;
