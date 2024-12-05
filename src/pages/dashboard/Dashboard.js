import React, { useState } from "react";
import "./dashboard.scss";
import { BarChart, Bar, Cell, XAxis, YAxis } from "recharts";
import { Table as AntTable, Button, Space, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const data = [
    { name: "Pro 1", uv: 4000 },
    { name: "Pro 2", uv: 3000 },
    { name: "Pro 3", uv: 2000 },
    { name: "Pro 4", uv: 2780 },
  ];

  const getMenu = (record, key) => (
    <Menu>
      <Menu.Item key="1">
        <Button>{record[key]}</Button>
      </Menu.Item>
    </Menu>
  );

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
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
        <Button type="link" size="small" onClick={() => close()}>
          Close
        </Button>
      </div>
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
    { title: "Name", dataIndex: "fname", key: "name", width: "10%", ...getColumnSearchProps("fname") },
    { title: "Contact", dataIndex: "pnumber", key: "phone", width: "7%", ...getColumnSearchProps("pnumber") },
    { title: "Plots", dataIndex: "message", key: "complaint", width: "15%", ...getColumnSearchProps("message") },
    { title: "Projects", dataIndex: "address", key: "address", width: "12%", ...getColumnSearchProps("address") },
    { title: "Cost", dataIndex: "vname", key: "village", width: "10%", ...getColumnSearchProps("vname") },
    { title: "Balance", dataIndex: "taluka", key: "taluka", width: "8%", ...getColumnSearchProps("taluka") },
    { title: "Acres", dataIndex: "taluka", key: "taluka", width: "8%", ...getColumnSearchProps("taluka") },
    {
      title: "Status",
      dataIndex: "work_status",
      key: "work_status",
      width: "10%",
      render: (_, record) => (
        <Dropdown overlay={getMenu(record, "work_status")} trigger={["click"]}>
          <Button>{record.work_status} <DownOutlined /></Button>
        </Dropdown>
      ),
    },
  ];

  const tableData = [
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
    { fname: "John Doe", pnumber: "1234567890", message: "plot 1", address: "Sai project", vname: "1000000", taluka: "50000", work_status: "In Progress", complaint_status: "Pending", timestamp: { seconds: 1617171717 } },
  ];

  return (
    <>
      <div className="parent dasboard-parent">
        <div className="container dashboard-container">
          <div className="dashboard-left">
            <div className="box box-1">
              <span>1000</span>
              <p>Total Plots</p>
            </div>
            <div className="box box-2">
              <span>4</span>
              <p>Projects</p>
            </div>
            <div className="box box-3">
              <span>250</span>
              <p>Total Plots Sale</p>
            </div>
            <div className="box box-4">
              <span>250</span>
              <p>Total Customers</p>
            </div>
          </div>
          <div className="dashboard-right">
            <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: "white" }} stroke="white" />
              <YAxis tick={{ fill: "white" }} stroke="white" />
              <Bar dataKey="uv" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>

      <div className="parent">
        <div className="container">
          <AntTable
            columns={columns}
            dataSource={tableData}
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

export default Dashboard;
