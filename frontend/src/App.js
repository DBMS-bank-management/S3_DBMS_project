import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Contact } from "./pages/contact";
import Home from "./pages/home";
import { PrivateRoute } from "./components/auth";
import Login from "./pages/login";
import AddUser from "./pages/employeePortal/addUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route exact path="/employee-portal" element={<PrivateRoute />}>
            <Route exact path="/employee-portal" element={<Home />} />
            <Route path="/employee-portal/add-user" element={<AddUser />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
          <Route path="contact" element={<Contact />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
