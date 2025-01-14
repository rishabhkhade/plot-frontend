import React, { useState } from "react";
import "./enquireForm.scss";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function EnquireForm() {
  const [enquireForm, setEnquireForm] = useState({
    name: "",
    number: "",
    enquiry: "",
    feedback: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/addEnquiry`,
        enquireForm
      );

      setEnquireForm({
        name: "",
        number: "",
        enquiry: "",
        feedback: "",
        status: "",
      });
       message.success("Enquiry added!");

       navigate("/enquire");
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <>
      <div className=" enquire-form-parent parent">
        <div className="container enquire-form-cont">
          <form class="add-project-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={enquireForm.name}
              onChange={(e) =>
                setEnquireForm({
                  ...enquireForm,
                  name: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Number"
              value={enquireForm.number}
              onChange={(e) =>
                setEnquireForm({
                  ...enquireForm,
                  number: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Enquire"
              value={enquireForm.enquiry}
              onChange={(e) =>
                setEnquireForm({
                  ...enquireForm,
                  enquiry: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Feedback"
              value={enquireForm.feedback}
              onChange={(e) =>
                setEnquireForm({
                  ...enquireForm,
                  feedback: e.target.value,
                })
              }
            />
            <div class="col-md-12">
              <select
                id="inputState"
                value={enquireForm.status}
                onChange={(e) =>
                  setEnquireForm({
                    ...enquireForm,
                    status: e.target.value,
                  })
                }
                class="form-select"
              >
                <option selected hidden>
                  Status
                </option>
                <option value="pqr">Pending</option>
                <option value="pqr">Completed</option>
                <option value="pqr">In Progress</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Add Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EnquireForm;
