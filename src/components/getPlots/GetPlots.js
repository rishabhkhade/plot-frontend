import React, { useEffect, useState } from "react";
import "./getPlots.scss";
import { Table as AntTable } from "antd";
import axios from "axios";

function GetPlots() {
  const [plotList, setPlotList] = useState([]);

  const handlePlotList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotList`
      );
      setPlotList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePlotList();
  }, []);

  const columns = [
    {
      title: "sr. no.",
      dataIndex: "sr_no",
      key: "sr_no",
      width: "5%",
    },
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      width: "12%",
    },
   
    {
      title: "Plot Rate",
      dataIndex: "plotrate",
      key: "plotrate",
      width: "10%",
    },
    {
      title: "Plot Number",
      dataIndex: "plotId",
      key: "plotId",
      width: "10%",
    },

    {
      title: "Plot Area(sq.ft.)",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "8%",
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "8%",
    },
    {
      title: "Plot Direction",
      dataIndex: "plotdirection",
      key: "plotdirection",
      width: "8%",
    },
    
  ];

  return (
    <>
      <div className="parent get-plots-parent">
        <div className="container get-plots-cont">
          <AntTable
            columns={columns}
            dataSource={plotList}
            pagination={{ pageSize: 10 }}
            rowClassName={() => "custom-cursor-row"}
            scroll={{ x: "max-content" }}
            bordered={true}
            className="table"
          />
        </div>
      </div>
    </>
  );
}

export default GetPlots;
