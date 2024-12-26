import React, { useEffect, useState } from "react";
import "./addPlot.scss";
import axios from "axios";
import { message } from "antd";

function AddPlot() {
  const direction = ["North", "South", "East", "West"];

  const [projectsList, setProjectsList] = useState([]);

  const handleList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getprojectsList`
      );

      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleList();
  }, []);

  const [plotAdd, setPlotAdd] = useState({
    projectId: "",
    plotarea: "",
    plotrate: "",
    plotdirection: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/plots/addPlot`,
        plotAdd
      );
      setPlotAdd({
        projectId: "",
        plotarea: "",
        plotrate: "",
        plotdirection: "",
      });
      message.success("Project successfully added!");
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="parent add-plot-parent">
        <div class="container add-plot-cont">
          <form class="row g-3 add-plot-form" onSubmit={handleSubmit}>
            <div class="col-md-12">
              <select
                id="inputState"
                class="form-select"
                value={plotAdd.projectId}
                onChange={(e) =>
                  setPlotAdd({ ...plotAdd, projectId: Number(e.target.value) })
                }
              >
                <option value="" selected disabled hidden>
                  Projects
                </option>
                {projectsList.map((item, index) => (
                  <option key={index} value={item.projectId}>
                    {item.projectname}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-12">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Plot Area"
                value={plotAdd.plotarea}
                name="plot area"
                onChange={(e) =>
                  setPlotAdd({ ...plotAdd, plotarea: e.target.value })
                }
              />
            </div>
            <div class="col-12">
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Plot Rate"
                value={plotAdd.plotrate}
                name="plot area"
                onChange={(e) =>
                  setPlotAdd({ ...plotAdd, plotrate: e.target.value })
                }
              />
            </div>
            <div class="col-md-12">
              <select
                id="inputState"
                class="form-select"
                value={plotAdd.plotdirection}
                name="plot direction"
                onChange={(e) =>
                  setPlotAdd({ ...plotAdd, plotdirection: e.target.value })
                }
              >
                <option selected hidden>
                  Plot Direction
                </option>
                {direction.map((item, index) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div class="col-12  w-auto ">
              <button type="submit" class="btn ">
                Add Plot
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPlot;
