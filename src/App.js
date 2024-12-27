import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";
import SideBar from "./components/sidebar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import HeaderLabel from "./components/headerlabel/HeaderLabel";
import SignUp from "./pages/signup/SignUp";
import ContextProvider from "./Context";
import { useEffect, useState } from "react";
import AddProjects from "./components/addProjects/AddProjects";
import ViewProjects from "./components/viewprojects/ViewProjects";
import Customer from "./pages/customers/Customer";
import AddCustomer from "./components/addCustomer/AddCustomer";
import AddPlot from "./components/addPlots/AddPlot";
import AllPlots from "./components/allPlots/AllPlots";
import CustomerDetails from "./components/customerDetails/CustomerDetails";

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
                <Route path="/add-projects" element={<AddProjects />} />
                <Route path="/add-customers" element={<AddCustomer />} />
                <Route path="/add-plots" element={<AddPlot />} />
                <Route path="/view-projects" element={<ViewProjects />} />
                <Route path="/all-plots" element={<AllPlots />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
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
