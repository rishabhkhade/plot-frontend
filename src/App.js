import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";
import SideBar from "./components/sidebar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import HeaderLabel from "./components/headerlabel/HeaderLabel";
import SignUp from "./pages/signup/SignUp";
import ContextProvider from "./Context";
import { useEffect, useState } from "react";

function App() {
  const [isLogedIn, setIslogdin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIslogdin(!!token);
  }, []);

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          {isLogedIn && (
            <>
              <SideBar setIslogdin={setIslogdin} />
              <HeaderLabel />
            </>
          )}
          <Routes>
            {isLogedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            ) : (
              <Route path="*" element={<Login setIslogdin={setIslogdin} />} />
            )}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
