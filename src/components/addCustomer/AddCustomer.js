import React, { useEffect, useState } from "react";
import "./addCustomer.scss";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";

function AddCustomer() {
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
    },
    payment: {
      bookingAmt: "",
      payment_type: "",
    },

    bankDetails: {
      bankName: "",
      cheqNum: "",
      cheqDate: "",
      branchName: "",
    },
  });

  const paymentType = ["Cheque", "Cash", "Online"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/customerAdd`,
        customerAdd
      );

      console.log(response, "res>>>>");

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
        },
        payment: {
          bookingAmt: "",
          payment_type: "",
        },

        bankDetails: {
          bankName: "",
          cheqNum: "",
          cheqDate: "",
          branchName: "",
        },
      });

      message.success("Customer added successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to add customer. Please try again.");
    }
  };

  // plots dropdown
  const [plotList, setPlotList] = useState([]);

  const [projectId, setProjectId] = useState("");

  const handleplotList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotsByProjectId/${projectId}`
      );
      setPlotList(response.data.data);
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
              />
            </div>
            <div class="col-md-6">
              <select
                id="inputState"
                value={projectId || ""}
                onChange={(e) => setProjectId(Number(e.target.value))}
                class="form-select"
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
              >
                <option selected>Plots</option>
                {plotList.map((item, index) => (
                  <option key={index} value={item.plotId}>
                    {item.plotId}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Plot No."
                value={plotListId.plotId}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Sq. Ft."
                value={plotListId.plotarea}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Plot Rate"
                value={plotListId.plotrate}
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                class="form-control"
                placeholder="Total Amount"
                value={plotListId.plotamount}
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
              />
            </div>
            <div className="col-6 d-flex gap-4">
              {paymentType.map((item) => (
                <div className="form-check" key={item}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`paymentType_${item}`}
                    name="paymentType" // Ensures all radio buttons are grouped
                    value={item}
                    checked={customerAdd.payment.payment_type === item} // Single selection
                    onChange={(e) =>
                      setAddCustomer({
                        ...customerAdd,
                        payment: {
                          ...customerAdd.payment,
                          payment_type: e.target.value, // Update with selected value
                        },
                      })
                    }
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
                  Payment Process
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
                  onChange={(e) =>
                    setAddCustomer({
                      ...customerAdd,
                      customer: {
                        ...customerAdd.customer,
                        plotPurchasedType: e.target.value,
                      },
                    })
                  }
                />
                <label className="form-check-label" htmlFor="emi">
                  EMI
                </label>
              </div>
            </div>

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
              />
            </div>

            <div class="col-2">
              <button type="submit" class="btn ">
                Add Customer
              </button>
            </div>
            <div class="col-3">
              <Link class="btn ">View Bill</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCustomer;
