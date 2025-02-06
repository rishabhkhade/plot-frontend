import React, { useEffect, useState } from "react";
import "./viewProjects.scss";
import { Cell, Pie, PieChart } from "recharts";
import { Table as AntTable, Button, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import Loader from "../../components/loader/Loader";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import axios from "axios";
 
function ViewProjects() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("");

  //loader
  const [loading, setLoading] = useState(false);

  //table

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
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

  const handleTotalPlots = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotsByProjectId/${id}`
      );

      setPlotTotal(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  //total customer
  const [totalCustomer, setTotalCustomer] = useState([]);
  const [totalSellingAmount, setTotalSellingAmount] = useState(0);
  //get all customer table
  const [allCustomer, setAllCustomer] = useState([]);

  const handleAllCustomer = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getCustomerByProjId/${id}`
      );

      setTotalCustomer(response.data.data.length);
      const sellingAmount = response.data.data.reduce(
        (total, item) => total + item.plotdetails.plotamount,
        0
      );

      setTotalSellingAmount(sellingAmount);

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
          progress: item.progress,
          pendingAmount: item.plotdetails.plotamount - item.paymentTotalAmount,
        }));

      setAllCustomer(detailsCustomer);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "No data found") {
        setAllCustomer([]);
        setTotalCustomer(0);
        setTotalSellingAmount(0);
      }
    } finally {
      setLoading(false);
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
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      width: "8%",
      ...getColumnSearchProps("progress"),
    },
  ];

  const data = [
    {
      counts: plotTotal,
      plots: "Total Plots",
      link_path: `/all-plots?totalPlotByProject=${id}`,
    },
    {
      counts: totalCustomer,
      plots: "Sell Plots",
      link_path: `/all-plots?sellPlotByProject=${id}`,
    },
    {
      counts: plotsRemain,
      plots: "Remaining Plots",
      link_path: `/all-plots?remainingPlotByProject=${id}`,
    },
    {
      counts: totalCustomer,
      plots: "Total Customers",
    },
  ];
  const [totalAmount, setTotalAmount] = useState([]);
  const [expemseAmt, setExpenseAmt] = useState(null);
  const pie_data = [
    { name: "Group A", value: expemseAmt },
    { name: "Group B", value: totalSellingAmount },
  ];

  const COLORS = ["#16325b", "#227b94"];

  const onCustomerHandler = (id) => {
    navigate(`/customer-details?id=${id}`);
  };

  const handleToatalprojectAmt = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getProjectById/${id}`
      );

      setTotalAmount(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpense = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/expense/getExpenseByProjId/${id}`
      );
      setExpenseAmt(response.data.totalamount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      handleAllCustomer(id);
      handleRemainingPlots(id);
      handleToatalprojectAmt(id);
      totalExpense(id);
      handleTotalPlots(id);
    }
  }, [location]);

  const addImage = async (e) => {
    e.preventDefault();
    try {
      const id = searchParams.get("id");
      const formData = new FormData();
      formData.append("projectId", id);
      formData.append("image", imageFile);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/addImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct Content-Type
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="view-project-parent parent">
        <div className="view-project-cont container">
          <div className="view-projects-left">
            {data &&
              data.map((item, index) => (
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
                  Total projects values :{" "}
                  {`${totalAmount.projectAmt}.00` || "nan"}
                </p>
              </div>
              <div class="project-expenses">
                <span
                  style={{ background: "var(--accent)" }}
                  className="small-box"
                ></span>
                <p style={{ fontSize: "20px" }}>Expenses : {expemseAmt}.00</p>
              </div>
              <div class="project-expenses">
                <span
                  style={{ background: "var(--teal)" }}
                  className="small-box"
                ></span>
                <p style={{ fontSize: "20px" }}>
                  Selling : {totalSellingAmount}.00
                </p>
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
            <div class="btn  btn2">
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="img_input"
              />
              Add Images
              <span className="plus-icon">
                {" "}
                <TiPlus />
              </span>
            </div>
            {imageFile !== "" && (
              <button className="btn" onClick={addImage}>
                Submit
              </button>
            )}
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
