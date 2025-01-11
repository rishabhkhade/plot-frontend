import React, { useState } from "react";
import "./addpayment.scss";
import axios from "axios";
import { message } from "antd";

function AddPayment() {
  const [addPay, setAddPay] = useState({
    bookingAmt: "",
    payment_type: "",
    date: "",
    bankName: "",
    cheqNum: "",
    cheqDate: "",
    branchName:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/addpayment`,
        addPay
      );
      setAddPay({
        bookingAmt: "",
        payment_type: "",
        date: "",
        bankName: "",
        cheqNum: "",
        cheqDate: "",
        branchName:""
      });
      
    } catch (error) {
      console.log(error);
    }
     message.success("Amount Updated!");
  };

  return (
    <>
      <div className=" add-projects-table-parent parent">
        <div className="container add-projects-table-cont">
          <form class="add-project-form" onSubmit={handleSubmit}>
            <label style={{ width: "100%" }} for="">
              Payment :
            </label>
            <input
              type="text"
              placeholder="Amount"
              value={addPay.bookingAmt}
              onChange={(e) =>
                setAddPay({ ...addPay, bookingAmt: e.target.value })
              }
            />
            <div class="col-md-12">
              <select
                id="inputState"
                value={addPay.status}
                onChange={(e) =>
                  setAddPay({
                    ...addPay,
                    payment_type: e.target.value,
                  })
                }
                class="form-select"
              >
                <option selected hidden>
                  Payment Mode
                </option>
                <option value="pqr">Online</option>
                <option value="pqr">Cash</option>
                <option value="pqr">Cheque</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Date"
              value={addPay.date}
              onChange={(e) => setAddPay({ ...addPay, date: e.target.value })}
            />

            <label style={{ width: "100%" }} for="">
              Bank Details :
            </label>
            <input
              type="text"
              placeholder="Bank Name"
              value={addPay.bankName}
              onChange={(e) =>
                setAddPay({ ...addPay, bankName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cheque no."
              value={addPay.cheqNum}
              onChange={(e) =>
                setAddPay({ ...addPay, cheqNum: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cheque Date"
              value={addPay.cheqDate}
              onChange={(e) =>
                setAddPay({ ...addPay, cheqDate: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Branch Name"
              value={addPay.branchName}
              onChange={(e) =>
                setAddPay({ ...addPay, branchName: e.target.value })
              }
            />

            <button type="submit" className="btn">
              Add Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPayment;

//     "payment":{
//         "customerId":6,
//         "bookingAmt":10000,
//         "payment_type":"online",
//         "date":""
//     },
//  "bankDetails":   {
//         "bankName":"bank of india",
//         "cheqNum":"",
//         "cheqDate":"",
//         "branchDate":""
//     }
// }
