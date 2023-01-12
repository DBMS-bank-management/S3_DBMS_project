import logo from "../logo.svg";
import "../App.css";
import { Button } from "antd";
import { employeeLogout } from "../api/authentication.js";
import { Logo } from "../components/logo";

function Home() {
  return (
    <div style={{minHeight: '100%'}}>
      <header className="App-header" style={{minHeight: '100%', width:'100%'}}>
        <div style={{minHeight: '100%', width: '100%', alignContent: 'center', fontSize: 100,display: 'contents'}}>
          <Logo />
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => console.log("test")}>test</button> */}
        {/* <a
          className="App-link"
          href="/employee-portal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Employee portal
        </a>
        <Button onClick={employeeLogout}>employeeLogout</Button> */}
      </header>
    </div>
  );
}

export default Home;
