import React, { useState } from "react";
import "./addpayment.scss";
import axios from "axios";
import { message } from "antd";

function AddPayment() {
  const [addPay, setAddPay] = useState({
    payment: {
      bookingAmt: "",
      payment_type: "",
      date: "",
    },
    bankDetails: {
      bankName: "",
      cheqNum: "",
      cheqDate: "",
      branchName: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/addpayment`,
        addPay
      );
      setAddPay({
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
      message.success("Amount Updated!");
    } catch (error) {
      console.log(error);
      message.error("Failed to update payment.");
    }

  };

  return (
    <>


      <div className="popup"> 
          <form class="add-project-form" onSubmit={handleSubmit}>
        <label style={{ width: "100%" }}>
          Payment :
        </label>
        <input
          type="text"
          placeholder="Amount"
          value={addPay.payment.bookingAmt}
          onChange={(e) =>
            setAddPay({
              ...addPay,
              payment: {
                ...addPay.payment,
                bookingAmt: e.target.value,
              },
            })
          }
        />
        <div class="col-md-12">
          <select
            id="inputState"
            value={addPay.payment.payment_type}
            onChange={(e) =>
              setAddPay({
                ...addPay,
                payment: {
                  ...addPay.payment,
                  payment_type: e.target.value,
                },
              })
            }
            className="form-select"
          >
            <option selected hidden>
              Payment Mode
            </option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <label style={{ width: "100%" }} for="">
          Bank Details :
        </label>
        <input
          type="text"
          placeholder="Bank Name"
          value={addPay.bankDetails.bankName}
          onChange={(e) =>
            setAddPay({
              ...addPay,
              bankDetails: {
                ...addPay.bankName,
                bankName: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Cheque no."
          value={addPay.bankDetails.cheqNum}
          onChange={(e) =>
            setAddPay({
              ...addPay,
              bankDetails: {
                ...addPay.bankDetails,
                cheqNum: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Cheque Date"
          value={addPay.bankDetails.cheqDate}
          onChange={(e) =>
            setAddPay({
              ...addPay,
              bankDetails: {
                ...addPay.bankDetails,
                cheqDate: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Branch Name"
          value={addPay.bankDetails.branchName}
          onChange={(e) =>
            setAddPay({
              ...addPay,
              bankDetails: {
                ...addPay.bankDetails,
                branchName: e.target.value,
              },
            })
          }
        />

        <button type="submit" className="btn">
          Add Payment
        </button>
      </form>
      </div>


    </>
  );
}

export default AddPayment;
