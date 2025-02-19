import React, { useEffect, useState } from "react";
import "./allPlots.scss";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

function AllPlots() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [allPlots, setAllPlots] = useState([]);

  //   useEffect(() => {
  //     const params = new URLSearchParams(location.search);
  //     const projectId = params.get("totalPlotByProject");
  //   }, [location]);

  const plotsData = async () => {
    try {
      const totalPlotId = searchParams.get("totalPlotByProject");
      const sellPlotId = searchParams.get("sellPlotByProject");
      const remainPlots = searchParams.get("remainingPlotByProject");

      let response;
      if (totalPlotId) {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}/plots/getPlotsByProjectId/${totalPlotId}`
        );
      } else if (sellPlotId) {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}/plots/getSellPlotsByProjectId/${sellPlotId}`
        );
      } else if (remainPlots) {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}/plots/getAvailablePlots/${remainPlots}`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_API_URL}/plots/getPlotList`
        );
      }



      const projectDetails = response?.data.data.projectDetails.map((item,index)=>({
        projectname : item.projectname,
        projectlocation:item.projectlocation,
        projectGatId:item.projectGatId
      }));

      const plotDetails = response?.data.data.plotDetails.map((item,index)=>({
        plotId : item.plotId,
        plotnum:item.plotNumber,
        plotarea:item.plotarea,
        plotrate:item.plotrate,
        plotamount:item.plotamount
      }));

      const mergedArray = [
        ...projectDetails.map((item, index) => ({
          ...item, 
          ...plotDetails[index], 
        }))
      ];
      


      setAllPlots(mergedArray)
    
    } catch (error) {
      console.log(error);
    }
  };


  // const remainPlots = async () => {
  //   try {
  //     const remainPlotId = searchParams.get("remainingPlotByProject");
  //     if (!remainPlotId) return;
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/plots/getAvailablePlots/${remainPlotId}`
  //     );
  //     if (response.data && response.data.data) {
  //       setAllPlots(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const hasRemainingPlots = searchParams.has("remainingPlotByProject");

  //   if (hasRemainingPlots) {
  //     remainPlots();
  //   } else {
  //     plotsData();
  //   }
  // }, [searchParams]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <input
          type="text"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          placeholder={`Search ${dataIndex}`}
          style={{
            marginBottom: 8,
            display: "block",
            width: "100%",
            padding: "4px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      width: "12%",
      ...getColumnSearchProps("projectname"),
    },
  
    {
      title: "Project Location",
      dataIndex: "projectlocation",
      key: "projectlocation",
      width: "12%",
      ...getColumnSearchProps("projectlocation"),
    },
    {
      title: "Projects Gat",
      dataIndex: "projectGatId",
      key: "projectGatId",
      width: "12%",
      ...getColumnSearchProps("projectGatId"),
    },
    {
      title: "Plot Number",
      dataIndex: "plotnum",
      key: "plotnum",
      width: "12%",
      ...getColumnSearchProps("plotnum"),
    },
    {
      title: "Plot Area",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "12%",
      ...getColumnSearchProps("plotarea"),
    },
    {
      title: "Plot Rate",
      dataIndex: "plotrate",
      key: "plotrate",
      width: "12%",
      ...getColumnSearchProps("plotrate"),
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "12%",
      ...getColumnSearchProps("plotamount"),
    },
    
  ];

  return (
    <>
      <div class="all-plots-parent parent">
        <div class="all-plots-cont container">
          <AntTable
            columns={columns}
            dataSource={allPlots}
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

export default AllPlots;
