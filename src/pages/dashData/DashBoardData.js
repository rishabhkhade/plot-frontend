import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useSearchParams } from "react-router-dom";
import "../../components/viewprojects/viewProjects.scss";
import axios from "axios";
const DashBoardData = () => {
  const [searchParmas] = useSearchParams();

  const [data,setData] = useState([])

  const getAllData = async () => {
    let response;

    try {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotList`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      width: "12%",
    },

    {
      title: "Project Location",
      dataIndex: "projectlocation",
      key: "projectlocation",
      width: "12%",
    },
    {
      title: "Projects Gat",
      dataIndex: "projectGatId",
      key: "projectGatId",
      width: "12%",
    },
    {
      title: "Plot Number",
      dataIndex: "plotNumber",
      key: "plotNumber",
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
  ];
  return (
    <>
      <div class="table_parent parent">
        <div class="table_cont container">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
};

export default DashBoardData;
