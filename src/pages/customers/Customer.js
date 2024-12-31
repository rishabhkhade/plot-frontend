import React, { useEffect, useState } from "react";
import "./customer.scss";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { TiPlus } from "react-icons/ti";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchParmas = useSearchParams("id");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    console.log(id);
  }, [location]);

  //fetch customer
  const [getCustomer, setGetCustomer] = useState([]);
  const [getPlot, setGetPlot] = useState([]);

  const plots = async (id) => {
    try {
      const response = axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getPlotById/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onCustomerHandler = (id) => {
    navigate(`/customer-details?id=${id}`);
  };

  useEffect(() => {
    plots();
  }, []);

  const handleCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getAllCustomers`
      );

      const detailsData = response.data.data.reverse().map((item, index) => ({
        key: item.customerId,
        sr_no: index + 1,
        cName: item.cName,
        address: item.address,
        mob_Number: item.mob_Number,
        email: item.email,
        projectName: item.plotdetails.projectname,
        plotNumber: item.plotdetails.plotId,
        plotarea: item.plotdetails.plotarea,
        plotamount: item.plotdetails.plotamount,
        bookingAmt: item.payments[0].bookingAmt || 0,
        pendingAmount:
          item.plotdetails.plotamount - item.payments[0].bookingAmt,
      }));

      setGetCustomer(detailsData);

      console.log(detailsData, ">>detailsData");
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
      title: "sr. no.",
      dataIndex: "sr_no",
      key: "sr_no",
      width: "5%",
    },
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
      dataIndex: "mob_Number",
      key: "mob_Number",
      width: "12%",
      ...getColumnSearchProps("mob_Number"),
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
      dataIndex: "projectName",
      key: "projectName",
      width: "10%",
      ...getColumnSearchProps("projectName"),
    },
    {
      title: "Plot Number",
      dataIndex: "plotNumber",
      key: "plotNumber",
      width: "10%",
      ...getColumnSearchProps("plotNumber"),
    },

    {
      title: "Plot Area(sq.ft.)",
      dataIndex: "plotarea",
      key: "plotarea",
      width: "8%",
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

  return (
    <>
      <div class="customer-parent parent">
        <div class="customer-cont container">
          <Link to="/add-customers" className="btn plus-icon-btn">
            Add Customers
            <span className="plus-icon">
              {" "}
              <TiPlus />
            </span>
          </Link>
          <AntTable
            columns={columns}
            dataSource={getCustomer}
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

export default Customer;
