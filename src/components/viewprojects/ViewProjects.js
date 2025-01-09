import React, { useEffect, useState } from "react";
import "./viewProjects.scss";
import { Cell, Pie, PieChart } from "recharts";
import { Table as AntTable, Button, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import axios from "axios";

function ViewProjects() {

  const navigate = useNavigate();

  //table

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    console.log(id);
  }, [location]);

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

  //remainning plots
  const [plotsRemain, setPlotsRemain] = useState([]);

  const handleRemainingPlots = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getAvailablePlots/${id}`
      );

      setPlotsRemain(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  //total plots
  const [plotTotal, setPlotTotal] = useState([]);

  const handleTotalPlots = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotsByProjectId/12`
      );

      setPlotTotal(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleTotalPlots();
  }, []);
  //total customer
  const [totalCustomer, setTotalCustomer] = useState([]);

  //get all customer table
  const [allCustomer, setAllCustomer] = useState([]);

  const handleAllCustomer = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getCustomerByProjId/${id}`
      );

      setTotalCustomer(response.data.data.length);

      const detailsCustomer =
        response.data.data &&
        response.data.data.map((item) => ({
          key: item.customerId,
          cName: item.cName,
          address: item.address,
          mob_Number: item.mob_Number,
          projectName: item.plotdetails.projectname,
          plotId: item.plotdetails.plotId,
          plotarea: item.plotdetails.plotarea,
          plotamount: item.plotdetails.plotamount,
          bookingAmt: item.paymentTotalAmount,
          pendingAmount: item.plotdetails.plotamount - item.paymentTotalAmount,
        }));

      setAllCustomer(detailsCustomer);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "No data found") {
        setAllCustomer([]);
        setTotalCustomer(0);
      }
    }
  };



  const columns = [
    {
      title: "Customer Name",
      dataIndex: "cName",
      key: "cName",
      width: "13%",
      ...getColumnSearchProps("cName"),
    },
    {
      title: "Contact",
      dataIndex: "mob_Number",
      key: "mob_Number",
      width: "8%",
      ...getColumnSearchProps("mob_Number"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "15%",
      ...getColumnSearchProps("projectName"),
    },
    {
      title: "Plot Number",
      dataIndex: "plotId",
      key: "plotId",
      width: "10%",
      ...getColumnSearchProps("plotId"),
    },
    {
      title: "Plot Area(sq.ft.)",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "10%",
      ...getColumnSearchProps("plotarea"),
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "8%",
      ...getColumnSearchProps("plotamount"),
    },
    {
      title: "Received Amount",
      dataIndex: "bookingAmt",
      key: "bookingAmt",
      width: "8%",
      ...getColumnSearchProps("bookingAmt"),
    },
    {
      title: "Pending Amount",
      dataIndex: "pendingAmount",
      key: "pendingAmount",
      width: "8%",
      ...getColumnSearchProps("pendingAmount"),
    },
  ];

  const data = [
    {
      counts: plotTotal,
      plots: "Total Plots",
      link_path: "/all-plots",
    },
    {
      counts: totalCustomer,
      plots: "Sell Plots",
    },
    {
      counts: plotsRemain,
      plots: "Remaining Plots",
    },
    {
      counts: totalCustomer,
      plots: "Total Customers",
    },
  ];

  const pie_data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];

  const COLORS = ["#16325b", "#227b94"];

  const onCustomerHandler = (id) => {
    navigate(`/customer-details?id=${id}`);
  };




  const [totalAmount, setTotalAmount] = useState([]);

  const handleToatalExpense = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/getprojectsList`)
      const data = response.data.data.filter((item) =>
        String(item.projectId) === String(id)
      );
      console.log(data,"llllllll");

      if (data.length > 0) {
        setTotalAmount(data[0]); // Assuming you need the first match
      } else {
        console.warn("No matching project found!");
      }
      
      setTotalAmount(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  console.log(totalAmount.projectAmt, ">>>>totalAmount");

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      handleAllCustomer(id);
      handleRemainingPlots(id);
      handleToatalExpense(id);
    }
  }, [location]);

 


  return (
    <>
      <div className="view-project-parent parent">
        <div className="view-project-cont container">
          <div className="view-projects-left">
            {data && data.map((item, index) => (
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
                  Total projects values : {totalAmount.projectAmt || "na"}
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
            <Link to="/expenses" className="btn plus-icon-btn1">
              Add Expenses
              <span className="plus-icon">
                {" "}
                <TiPlus />
              </span>
            </Link>
          </div>
          <AntTable
            columns={columns}
            dataSource={allCustomer}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
            bordered={true}
            className="table"
            rowClassName={() => "custom-cursor-row"}
            onRow={(record) => ({
              onClick: () => onCustomerHandler(record.key),
            })}
          />
        </div>
      </div>
    </>
  );
}

export default ViewProjects;
