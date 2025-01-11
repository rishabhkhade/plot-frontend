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
import GetPlots from "./components/getPlots/GetPlots";
import AddEmployee from "./components/addEmployee/AddEmployee";
import BillView from "./components/billView/BillView";
import { PDFViewer } from "@react-pdf/renderer";
import AvailablePlots from "./components/availablePlots/AvailablePlots";
import Expenses from "./components/expenses/Expenses";
import Statement from "./components/statement/Statement";
import Enquire from "./components/enquire/Enquire";
import EnquireForm from "./components/enquireform/EnquireForm";
import AddPayment from "./components/addPayment/AddPayment";

function App() {
  const [isLogedIn, setIslogdin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIslogdin(!!token);
  }, []);
  const [isPDFVisible, setIsPDFVisible] = useState(false);
  return (
    <div className="App">
      {isPDFVisible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Dim background
            zIndex: 9999,
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsPDFVisible(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "10px 15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              zIndex: 10000, // Ensure the button is on top
            }}
          >
            Close
          </button>

          {/* PDF Viewer */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PDFViewer style={{ width: "80%", height: "90%" }}>
              <BillView />
            </PDFViewer>
          </div>
        </div>
      )}

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
                <Route
                  path="/add-customers"
                  element={<AddCustomer setIsPDFVisible={setIsPDFVisible} />}
                />
                <Route path="/add-employees" element={<AddEmployee />} />
                <Route path="/enquiry-form" element={<EnquireForm />} />


                <Route path="/add-plots" element={<AddPlot />} />
                <Route path="/view-projects" element={<ViewProjects />}  />
                <Route path="/all-plots" element={<AllPlots />} />
                <Route path="/available-plots" element={<AvailablePlots />} />
                <Route path="/add-pay" element={<AddPayment />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/get-plots" element={<GetPlots />} />
                <Route path="/statement" element={<Statement />} />
                <Route path="/enquire" element={<Enquire />} />
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
