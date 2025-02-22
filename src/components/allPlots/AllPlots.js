import React, { useEffect, useState } from "react";
import "./allPlots.scss";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
function AllPlots() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [allPlots, setAllPlots] = useState([]);

  const [loader, setLoader] = useState(false);

  const totalPlotId = searchParams.get("totalPlotByProject");
  const sellPlotId = searchParams.get("sellPlotByProject");
  const remainPlots = searchParams.get("remainingPlotByProject");

  const plotsData = async () => {
    try {
      setLoader(true);

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
      }

      // Check if response and response.data exist
      console.log("API Response:", response?.data);

      const apiData = response?.data?.data;

      if (!apiData || typeof apiData !== "object") {
        console.error("Unexpected API response format:", response?.data);
        return;
      }

      // Ensure apiData is an array before mapping
      const allTableData = Array.isArray(apiData)
        ? apiData.map((item) => ({
            projectname: item.projectname,
            projectlocation: item.projectlocation,
            projectGatId: item.projectGatId,
            plotnum: item.plotNumber,
            plotarea: item.plotarea,
            plotrate: item.plotrate,
            plotamount: item.projectAmt,
          }))
        : [];

      // Ensure projectDetails and plotDetails are arrays
      const projectDetails = Array.isArray(apiData.projectDetails)
        ? apiData.projectDetails
        : [];

      const plotDetails = Array.isArray(apiData.plotDetails)
        ? apiData.plotDetails
        : [];

      // Format project details
      const formattedProjectDetails = projectDetails.map((item) => ({
        projectname: item.projectname,
        projectlocation: item.projectlocation,
        projectGatId: item.projectGatId,
      }));

      // Format plot details
      const formattedPlotDetails = plotDetails.map((item) => ({
        plotId: item.plotId,
        plotnum: item.plotNumber,
        plotarea: item.plotarea,
        plotrate: item.plotrate,
        plotamount: item.plotamount,
        CustomerName: item.cName,
      }));

      // Merge project and plot details safely
      const mergedArray = formattedProjectDetails.map((item, index) => ({
        ...item,
        ...(formattedPlotDetails[index] || {}),
      }));

      console.log("Merged Data:", mergedArray);
      setAllPlots(mergedArray);
    } catch (error) {
      console.log("Error fetching plots:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (totalPlotId || sellPlotId || remainPlots) {
      plotsData();
    }
  }, []);

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

  if (sellPlotId) {
    columns.push({
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      width: "12%",
      ...getColumnSearchProps("CustomerName"),
    });
  }

  return (
    <>
      {loader && <Loader />}
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
