import React, { useEffect, useState } from "react";
import "./addCustomer.scss";
import axios from "axios";
import { message } from "antd";

function AddCustomer({ setIsPDFVisible }) {
  const [showBankDetails, setShowBankDetails] = useState(false);

  const [emiDetails, setEmiDetails] = useState(false);

  const date = new Date();
  const [customerAdd, setAddCustomer] = useState({
    customer: {
      progress: "booked",
      cName: "",
      address: "",
      mob_Number: "",
      email: "",
      plotPurchasedType: "",
      projectId: "",
      plotId: "",
      date: date.toLocaleDateString(),
      emiAmt: "",
      emiPeriod: "",
    },
    payment: {
      bookingAmt: "",
      payment_type: "",
      date: date.toLocaleDateString(),
    },
    bankDetails: {
      bankName: "",
      cheqNum: "",
      cheqDate: "",
      branchName: "",
    },
  });

  const paymentType = ["Cheque", "Cash", "Online"];

  const [isCustomerAdd, setIsCustomerAdd] = useState(false);
  const [storedId, setStoredId] = useState([]);

  const [isDisable, setIsDisable] = useState(false);
  const [isdisbledbill, setisdisbledbill] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/customerAdd`,
        customerAdd
      );
      setStoredId(response.data.data);

      setIsCustomerAdd(true);
      message.success("Customer added successfully!");
      setIsDisable(true);
    } catch (error) {
      console.log(error);
      message.error("Failed to add customer. Please try again.");
    }
  };

  const addBill = async (e) => {
    e.preventDefault();
    try {
      const data = {
        customerId: storedId.customerId,
        paymentId: storedId.payment,
        bankDetailsId: storedId.bankdetailsId,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/billing`,
        data
      );

      if (response.data.data !== null) {
        localStorage.setItem("billingId", response.data.data);
      }
      setIsPDFVisible(true);

      //reset fields
      setAddCustomer({
        customer: {
          progress: "booked",
          cName: "",
          address: "",
          mob_Number: "",
          email: "",
          plotPurchasedType: "",
          projectId: "",
          plotId: "",
          date: date.toLocaleDateString(),
        },
        payment: {
          bookingAmt: "",
          payment_type: "",
          date: date.toLocaleDateString(),
        },

        bankDetails: {
          bankName: "",
          cheqNum: "",
          cheqDate: "",
          branchName: "",
        },
      });
      setisdisbledbill(true)
      setShowBankDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  // plots dropdown
  const [plotList, setPlotList] = useState([]);

  const [projectId, setProjectId] = useState("");
  const handleplotList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getAvailablePlots/${projectId}`
      );

      console.log(response, "respopns")
      setPlotList(response.data.data.availabalePlots);
      console.log(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  //project dropdown
  const [projectsList, setProjectList] = useState([]);

  const handleProjectList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getprojectsList`
      );
      setProjectList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //get plot by id
  const [plotListId, setPlotListId] = useState([]);

  const [plotId, setPlotId] = useState("");

  const handlePlotById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotById/${plotId}`
      );
      setPlotListId(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      handleplotList();
    }
    if (plotId) {
      handlePlotById();
    }
    handleProjectList();
  }, [projectId, plotId]);

  useEffect(() => {
    setAddCustomer((item) => ({
      ...item,
      customer: {
        ...item.customer,
        projectId: projectId,
        plotId: plotId,
      },
    }));
  }, [projectId, plotId]);



  return (
    <>
      <div class="add-customer-parent parent">
        <div class="container add-customer-cont">
          <form class="row g-3 add-customer-form" onSubmit={handleSubmit}>
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Customer Name"
                value={customerAdd.customer.cName}
                onChange={(e) =>
                  setAddCustomer({
                    ...customerAdd,
                    customer: {
                      ...customerAdd.customer,
                      cName: e.target.value,
                    },
                  })
                }
                disabled={isDisable}
              />
            </div>
            <div class="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                value={customerAdd.customer.address}
                onChange={(e) =>
                  setAddCustomer({
                    ...customerAdd,
                    customer: {
                      ...customerAdd.customer,
                      address: e.target.value,
                    },
                  })
                }
                disabled={isDisable}
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Mobile No."
                value={customerAdd.customer.mob_Number}
                onChange={(e) =>
                  setAddCustomer({
                    ...customerAdd,
                    customer: {
                      ...customerAdd.customer,
                      mob_Number: e.target.value,
                    },
                  })
                }
                disabled={isDisable}
              />
            </div>
            <div class="col-6">
              <input
                type="email"
                class="form-control"
                id="inputAddress"
                placeholder="Email"
                value={customerAdd.customer.email}
                onChange={(e) =>
                  setAddCustomer({
                    ...customerAdd,
                    customer: {
                      ...customerAdd.customer,
                      email: e.target.value,
                    },
                  })
                }
                disabled={isDisable}
              />
            </div>
            <div class="col-md-6">
              <select
                id="inputState"
                value={projectId || ""}
                onChange={(e) => setProjectId(Number(e.target.value))}
                class="form-select"
                disabled={isDisable}
              >
                <option selected hidden>
                  Projects
                </option>
                {projectsList.map((item, index) => (
                  <option key={index} value={item.projectId}>
                    {item.projectname}
                  </option>
                ))}
              </select>
            </div>

            <div class="col-md-6">
              <select
                id="inputState"
                value={plotId || ""}
                onChange={(e) => setPlotId(Number(e.target.value))}
                class="form-select"
                disabled={isDisable}
              >
                <option selected>Plots</option>
                {plotList.map((item, index) => (
                  <option key={index} value={item.plotId}>
                    {item.plotNumber}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Plot No."
                value={plotListId.plotNumber}
                disabled={isDisable}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Sq. Ft."
                value={plotListId.plotarea}
                disabled={isDisable}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Plot Rate"
                value={plotListId.plotrate}
                disabled={isDisable}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Total Amount"
                value={plotListId.plotamount}
                disabled={isDisable}
              />
            </div>

            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Booking Amount"
                value={customerAdd.bookingAmt}
                onChange={(e) =>
                  setAddCustomer({
                    ...customerAdd,
                    payment: {
                      ...customerAdd.payment,
                      bookingAmt: e.target.value,
                    },
                  })
                }
                disabled={isDisable}
              />
            </div>
            <div className="col-6 d-flex gap-4">
              {paymentType.map((item) => (
                <div className="form-check" key={item}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`paymentType_${item}`}
                    name="paymentType"
                    value={item}
                    checked={customerAdd.payment.payment_type === item}
                    onChange={(e) => {
                      setAddCustomer({
                        ...customerAdd,
                        payment: {
                          ...customerAdd.payment,
                          payment_type: e.target.value,
                        },
                      });
                      setShowBankDetails(e.target.value === "Cheque");
                    }}
                    disabled={isDisable}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`paymentType_${item}`}
                  >
                    {item}
                  </label>
                </div>
              ))}

              <div className="form-check col-4">
                <label className="form-check-label" htmlFor="gridCheck">
                  Purchase Type
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="cash"
                  name="plotPurchasedType"
                  value="Cash"
                  checked={customerAdd.customer.plotPurchasedType === "Cash"}
                  onChange={(e) =>
                    setAddCustomer({
                      ...customerAdd,
                      customer: {
                        ...customerAdd.customer,
                        plotPurchasedType: e.target.value,
                      },
                    })
                  }
                  disabled={isDisable}
                />
                <label className="form-check-label" htmlFor="cash">
                  Cash
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="emi"
                  name="plotPurchasedType"
                  value="EMI"
                  checked={customerAdd.customer.plotPurchasedType === "EMI"}
                  onChange={(e) => {
                    setAddCustomer({
                      ...customerAdd,
                      customer: {
                        ...customerAdd.customer,
                        plotPurchasedType: e.target.value,
                      },
                    });
                    setEmiDetails(true); // Show EMI fields when EMI is selected
                  }}
                  disabled={isDisable}
                />
                <label className="form-check-label" htmlFor="emi">
                  EMI
                </label>
              </div>
            </div>
            {showBankDetails && (
              <>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bank Name"
                    value={customerAdd.bankName}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        bankDetails: {
                          ...customerAdd.bankDetails,
                          bankName: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>

                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Branch Name"
                    value={customerAdd.branchName}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        bankDetails: {
                          ...customerAdd.bankDetails,
                          branchName: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>

                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cheque No."
                    value={customerAdd.cheqNum}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        bankDetails: {
                          ...customerAdd.bankDetails,
                          cheqNum: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cheque Date"
                    value={customerAdd.cheqDate}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        bankDetails: {
                          ...customerAdd.bankDetails,
                          cheqDate: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>
              </>
            )}
            {emiDetails && (
              <>
             
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Emi amount"
                    value={customerAdd.emiAmt}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        customer: {
                          ...customerAdd.customer,
                          emiAmt: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Emi Duration"
                    value={customerAdd.emiPeriod}
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        customer: {
                          ...customerAdd.customer,
                          emiPeriod: e.target.value,
                        },
                      })
                    }
                    disabled={isDisable}
                  />
                </div>
              </>
            )}

            <div className="col-4">
              <button type="submit" disabled={isDisable} class="btn ">
                Add Customer
              </button>
            </div>
            {isCustomerAdd && (
              <div class="col-3">
                <button class="btn" disabled={isdisbledbill} onClick={addBill}>
                  View Bill
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCustomer;
