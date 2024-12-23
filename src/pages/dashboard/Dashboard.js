import React, { useState } from "react";
import "./dashboard.scss";
import { Table as AntTable, Button, Dropdown, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CountUp from "react-countup";

function Dashboard() {
  const statusData = [
    {
      status: "Completed",
      projects_counts: 50,
    },
    {
      status: "In-Progress",
      projects_counts: 50,
    },
    {
      status: "Pending",
      projects_counts: 50,
    },
    {
      status: "Completed",
      projects_counts: 50,
    },
  ];

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
    {
      title: "Name",
      dataIndex: "fname",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("fname"),
    },
    {
      title: "Contact",
      dataIndex: "pnumber",
      key: "phone",
      width: "7%",
      ...getColumnSearchProps("pnumber"),
    },
    {
      title: "Plots",
      dataIndex: "message",
      key: "complaint",
      width: "15%",
      ...getColumnSearchProps("message"),
    },
    {
      title: "Projects",
      dataIndex: "address",
      key: "address",
      width: "12%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Cost",
      dataIndex: "vname",
      key: "village",
      width: "10%",
      ...getColumnSearchProps("vname"),
    },
    {
      title: "Balance",
      dataIndex: "taluka",
      key: "taluka",
      width: "8%",
      ...getColumnSearchProps("taluka"),
    },
    {
      title: "Acres",
      dataIndex: "taluka",
      key: "taluka",
      width: "8%",
      ...getColumnSearchProps("taluka"),
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
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
    },
    {
      fname: "John Doe",
      pnumber: "1234567890",
      message: "plot 1",
      address: "Sai project",
      vname: "1000000",
      taluka: "50000",
      work_status: "In Progress",
      complaint_status: "Pending",
      timestamp: { seconds: 1617171717 },
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
            {statusData.map((item, index) => (
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
