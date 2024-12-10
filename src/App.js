import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";
import SideBar from "./components/sidebar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import HeaderLabel from "./components/headerlabel/HeaderLabel";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <SideBar />
      <HeaderLabel />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
