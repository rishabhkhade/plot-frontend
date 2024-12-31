import React, { useState } from "react";
import "./addEmployee.scss";
import axios from "axios";
import { message } from "antd";

function AddEmployee() {
  const [employeeAdd, setEmployeeAdd] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        employeeAdd
      );
  

      setEmployeeAdd({
        username: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
    }

    message.success("Project successfully added!");
  };

  return (
    <>
      <div className=" add-projects-table-parent parent">
        <div className="container add-projects-table-cont">
          <form class="add-project-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Employee Name"
              value={employeeAdd.username}
              onChange={(e) =>
                setEmployeeAdd({ ...employeeAdd, username: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Employee Password"
              value={employeeAdd.password}
              onChange={(e) =>
                setEmployeeAdd({ ...employeeAdd, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
              value={employeeAdd.role}
              onChange={(e) =>
                setEmployeeAdd({
                  ...employeeAdd,
                  role: e.target.value,
                })
              }
            />
            <button type="submit" className="btn">
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
