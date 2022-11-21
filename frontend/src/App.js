import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Contact } from "./pages/contact";
import Home from "./pages/home";
import { PrivateRoute } from "./components/auth";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route exact path="/employeePortal" element={<PrivateRoute />}>
            <Route exact path="/employeePortal" element={<Home />} />
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
