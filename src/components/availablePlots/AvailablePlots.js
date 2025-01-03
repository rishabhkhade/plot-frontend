import React, { useEffect, useState } from "react";
import "./availablePlots.scss";
import { Table as AntTable } from "antd";
import axios from "axios";

function AvailablePlots() {
  const [remainPlots, setRemainPlots] = useState([]);

  const handleRemainingPlots = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/availablePlots`
      );

      setRemainPlots(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRemainingPlots();
  }, []);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      width: "12%",
    },
    {
      title: "Plot Area",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "12%",
    },
    {
      title: "Plot Rate",
      dataIndex: "plotrate",
      key: "plotrate",
      width: "12%",
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "12%",
    },
    {
      title: "Plot Direction",
      dataIndex: "plotdirection",
      key: "plotdirection",
      width: "12%",
    },
  ];


  return (
    <>
      <div class="all-plots-parent parent">
        <div class="all-plots-cont container">
          <AntTable
            columns={columns}
            dataSource={remainPlots}
            pagination={{ pageSize: 10 }}
            rowClassName="editable-row"
            scroll={{ x: "max-content" }}
            bordered={true}
            className="table"
          />
        </div>
      </div>
    </>
  );
}

export default AvailablePlots;
