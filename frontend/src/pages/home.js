import logo from "../logo.svg";
import "../App.css";
import { Button } from "antd";
import { logout } from "../api";
import EmployeePageLayout from "../components/employeePageLayout";

function Home() {
  return (
    <EmployeePageLayout>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => console.log("test")}>test</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button onClick={logout}>logout</Button>
        </header>
      </div>
    </EmployeePageLayout>
  );
}

export default Home;
