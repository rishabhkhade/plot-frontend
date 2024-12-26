import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { Table as AntTable, Button, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { TiPlus } from "react-icons/ti";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CountUp from "react-countup";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  //length of projects plots

  const [totalProjectPlots, setTotalProjectPlots] = useState([]);

  const handleLength = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/plots/getAllLength`
      );

      const { avilablePlots, sellPlots, totalPlots, totalProject } =
        response.data.data;

      const countData = [
        {
          status: "Total Projects",
          projects_counts: avilablePlots,
        },
        {
          status: "Total Plots",
          projects_counts: sellPlots,
        },
        {
          status: "Sale Plots",
          projects_counts: totalPlots,
        },
        {
          status: "Remaining Plots",
          projects_counts: totalProject,
        },
      ];

      setTotalProjectPlots(countData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLength();
  }, []);

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

  const [customerDetails, setCustomerDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch customer list and plot details
  const getCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getAllCustomers`
      );
      const customers = response.data.data;

      console.log(customers, "Sdcfds");

      // Fetch plot details for each customer
      const plotDetailsPromises = customers.map(async (customer) => {
        const plotResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/plots/getPlotById/${customer.plotId}`
        );
        return { ...customer, plotDetails: plotResponse.data.data };
      });

      const detailsWithPlots = await Promise.all(plotDetailsPromises);
      setCustomerDetails(detailsWithPlots);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer or plot details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "cName",
      key: "cName",
      width: "15%",
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
      title: "Project Name",
      dataIndex: "message",
      key: "complaint",
      width: "15%",
      ...getColumnSearchProps("message"),
    },
    {
      title: "Plot Details",
      key: "plotDetails",
      render: (text, record) =>
        record.plotDetails
          ? `Area: ${record.plotDetails.area}, Location: ${record.plotDetails.location}`
          : "No Details Available",
    },
    {
      title: "Sq. ft.",
      dataIndex: "vname",
      key: "village",
      width: "10%",
      ...getColumnSearchProps("vname"),
    },
    {
      title: "Amount",
      dataIndex: "taluka",
      key: "taluka",
      width: "8%",
      ...getColumnSearchProps("taluka"),
    },
    {
      title: "Pending",
      dataIndex: "taluka",
      key: "taluka",
      width: "8%",
      ...getColumnSearchProps("taluka"),
    },
  ];

  return (
    <>
      <div className="parent dasboard-parent">
        <div className="container dashboard-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: false,
            }}
            navigation={false}
            breakpoints={{
              340: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {totalProjectPlots.map((item, index) => (
              <SwiperSlide>
                <div className="box" key={index}>
                  <h3 className="status">{item.status}</h3>
                  <h3 className="count">
                    <CountUp
                      start={0}
                      end={item.projects_counts}
                      duration={2}
                      separator=","
                    />
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className=" table_parent parent">
        <div className="container">
          <div style={{ paddingTop: "30px", display: "flex", gap: "20px" }}>
            <Link to="/add-customers" className="btn plus-icon-btn1">
              Add Customers
              <span className="plus-icon">
                {" "}
                <TiPlus />
              </span>
            </Link>
          </div>
          <AntTable
            columns={columns}
            dataSource={customerDetails}
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
