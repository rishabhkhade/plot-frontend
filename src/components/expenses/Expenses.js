import React, { useEffect, useState } from "react";
import "./expenses.scss";
import axios from "axios";
import { message } from "antd";

function Expenses() {
  const [expense, setExpense] = useState({
    projectId: "",
    workDetails: "",
    amount: "",
    date:""
  });

  const handleExpenses = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/expense/addExpenses`,
        expense
      );
      message("Expense Added successfully")
    } catch (error) {
      console.log(error);
    }
  };

  //project list
  const [projectList, setProjectList] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getprojectsList`
      );

      setProjectList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

                {projectList.map((item, index) => (
                  <option>{item.projectname}</option>
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
            <div class="col-12 d-flex flex-column gap-2">
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
