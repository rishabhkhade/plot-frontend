import React, { useState } from "react";
import "./expenses.scss";
import axios from "axios";

function Expenses() {
  const [expense, setExpense] = useState({
    projectId: "",
    workDetails: "",
    amount: "",
  });

  const handleExpenses = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/expense/addExpenses`,
        expense
      );

      console.log(response, ">>response");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="parent add-plot-parent">
        <div class="container add-plot-cont">
          <form class="row g-3 add-plot-form" onSubmit={handleExpenses}>
            <div class="col-12 d-flex flex-column gap-2">
              <label for="">Projects</label>
              <select
                id="inputState"
                class="form-select"
                value={expense.projectId}
                onChange={(e) =>
                  setExpense({ ...expense, projectId: Number(e.target.value) })
                }
              >
                <option hidden>Projects</option>
                {expense.map((item, index) => (
                  <option key={index} value={item.projectId}>
                    {item.projectname}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-12 d-flex flex-column gap-2">
              <label for="">Work Details</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Work Details"
                value={expense.workDetails}
                onChange={(e) =>
                  setExpense({ ...expense, workDetails: e.target.value })
                }
              />
            </div>
            <div  class="col-12 d-flex flex-column gap-2">
              <label for="">Amount</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({ ...expense, amount: Number(e.target.value) })
                }
              />
            </div>
            <div class="col-12  w-auto ">
              <button type="submit" class="btn ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Expenses;