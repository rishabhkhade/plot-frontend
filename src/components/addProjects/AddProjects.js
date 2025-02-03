import React, { useState } from "react";
import "./addProjects.scss";
import axios from "axios";
import { message } from "antd";

function AddProjects({fetchProjects}) {
  const [projectAdd, setProjectAdd] = useState({
    projectname: "",
    projectarea: "",
    projectlocation: "",
    projectGatId: "",
    projectAmt: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/addprojects`,
        projectAdd
      );
      message.success("Project successfully added!");
      setProjectAdd({
        projectname: "",
        projectarea: "",
        projectlocation: "",
        projectGatId: "",
        projectAmt: "",
      });
      fetchProjects();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <div className=" add-projects-table-parent parent">
        <div className="container add-projects-table-cont">
          <form class="add-project-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Project Name"
              value={projectAdd.projectname}
              name="projectname"
              onChange={(e) =>
                setProjectAdd({ ...projectAdd, projectname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Project Area"
              value={projectAdd.projectarea}
              name="projectarea"
              onChange={(e) =>
                setProjectAdd({ ...projectAdd, projectarea: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Project Location"
              value={projectAdd.projectlocation}
              name="projectlocation"
              onChange={(e) =>
                setProjectAdd({
                  ...projectAdd,
                  projectlocation: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Project Amount"
              value={projectAdd.projectAmt}
              name="projectAmt"
              onChange={(e) =>
                setProjectAdd({
                  ...projectAdd,
                  projectAmt: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Gat Number"
              value={projectAdd.projectGatId}
              onChange={(e) =>
                setProjectAdd({ ...projectAdd, projectGatId: e.target.value })
              }
            />
            <button type="submit" className="btn">
              Add Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProjects;
