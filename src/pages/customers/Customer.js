import React, { useEffect, useState } from "react";
import "./customer.scss";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

function Customer() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  //fetch customer
  const [getCustomer, setGetCustomer] = useState([]);
  const [getPlot, setGetPlot] = useState([]);

  const plots = async (id) => {
    try {
      const response = axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotById/${id}`,
        getPlot
      );
      console.log(response, ">>>getplot");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    plots();
  }, []);

  const handleCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getAllCustomers`,
        getCustomer
      );
      setGetCustomer(response.data.data);
      console.log(response.data.data, ">>>>>>>>>>>");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCustomer();
  }, []);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "cName",
      key: "cName",
      width: "12%",
      ...getColumnSearchProps("cName"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "12%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Mobile Number",
      dataIndex: "mnumber",
      key: "mnumber",
      width: "11%",
      ...getColumnSearchProps("mnumber"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Project Name",
      dataIndex: "proname",
      key: "proname",
      width: "10%",
      ...getColumnSearchProps("proname"),
    },
    {
      title: "Plot Name",
      dataIndex: "pname",
      key: "pname",
      width: "10%",
      ...getColumnSearchProps("pname"),
    },

    {
      title: "Plot Area",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "8%",
      ...getColumnSearchProps("plotarea"),
    },
    {
      title: "Plot Rate",
      dataIndex: "plotrate",
      key: "plotrate",
      width: "8%",
      ...getColumnSearchProps("plotrate"),
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "8%",
      ...getColumnSearchProps("plotamount"),
    },
  ];

  return (
    <>
      <div class="customer-parent parent">
        <div class="customer-cont container">
          <Link to="/add-customers" className="btn plus-icon-btn">
            Add Customers
          <span className="plus-icon">  <TiPlus /></span>
          </Link>
          <AntTable
            columns={columns}
            dataSource={getCustomer}
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

export default Customer;
