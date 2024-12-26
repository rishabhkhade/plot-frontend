import React, { PureComponent, useState } from "react";
import "./viewProjects.scss";
import { Cell, Pie, PieChart } from "recharts";
import { Table as AntTable, Button, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

function ViewProjects() {
  //table

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getMenu = (record, key) => (
    <Menu>
      <Menu.Item key="1">
        <Button>{record[key]}</Button>
      </Menu.Item>
    </Menu>
  );

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
      title: "Project Name",
      dataIndex: "pname",
      key: "pname",
      width: "12%",
      ...getColumnSearchProps("pname"),
    },
    {
      title: "Project Area",
      dataIndex: "parea",
      key: "parea",
      width: "12%",
      ...getColumnSearchProps("parea"),
    },
    {
      title: "Project Location",
      dataIndex: "plocation",
      key: "plocation",
      width: "12%",
      ...getColumnSearchProps("plocation"),
    },
    {
      title: "Projects Gat",
      dataIndex: "pgat",
      key: "pgat",
      width: "12%",
      ...getColumnSearchProps("pgat"),
    },

    {
      title: "Status",
      dataIndex: "work_status",
      key: "work_status",
      width: "10%",
      render: (_, record) => (
        <Dropdown overlay={getMenu(record, "work_status")} trigger={["click"]}>
          <Button>
            {record.work_status} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const tableData = [
    {
      pname: "Tom Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
    {
      pname: "John Doe",
      parea: "1234567890",
      plocation: "plot 1",
      pgat: "Sai project",
    },
  ];

  const data = [
    {
      counts: "500",
      plots: "Total Plots",
      link_path: "/all-plots",
    },
    {
      counts: "500",
      plots: "Sell Plots",
    },
    {
      counts: "500",
      plots: "Remaining Plots",
    },
    {
      counts: "500",
      plots: "Total Customers",
    },
  ];

  const pie_data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];

  const COLORS = ["#16325b", "#227b94"];

  return (
    <>
      <div className="view-project-parent parent">
        <div className="view-project-cont container">
          <div className="view-projects-left">
            {data.map((item, index) => (
              <Link to={item.link_path} class="v-p-box">
                <h2>{item.counts}</h2>
                <p style={{ color: "var(--accent)", fontSize: "20px" }}>
                  {item.plots}
                </p>
              </Link>
            ))}
          </div>
          <div className="view-projects-right">
            <div class="pie-chart">
              <PieChart width={900} height={300}>
                <Pie
                  data={pie_data}
                  cx={120}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pie_data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </PieChart>
            </div>
            <div class="projects-values">
              <div class="project-value">
                <p style={{ fontSize: "24px" }}>
                  Total projects values : 50000000
                </p>
              </div>
              <div class="project-expenses">
                <span
                  style={{ background: "var(--accent)" }}
                  className="small-box"
                ></span>
                <p style={{ fontSize: "20px" }}>Expenses : 10000</p>
              </div>
              <div class="project-expenses">
                <span
                  style={{ background: "var(--teal)" }}
                  className="small-box"
                ></span>
                <p style={{ fontSize: "20px" }}>Selling : 10000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" table_parent parent">
        <div className="container table_cont">
          <div class="buttons">
            <Link to="/add-customers" className="btn plus-icon-btn1">
              Add Customers
              <span className="plus-icon">
                {" "}
                <TiPlus />
              </span>
            </Link>
            <Link to="/add-plots" className="btn plus-icon-btn1">
              Add Plots
              <span className="plus-icon">
                {" "}
                <TiPlus />
              </span>
            </Link>
          </div>
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

export default ViewProjects;
