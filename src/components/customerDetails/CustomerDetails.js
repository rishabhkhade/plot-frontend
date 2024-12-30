import React, { useEffect, useState } from "react";
import "./customerDetails.scss";
import { Table as AntTable } from "antd";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

function CustomerDetails() {
  const columns = [
    {
      title: "Project Name",
      dataIndex: "pro_name",
      key: "pro_name",
      width: "13%",
    },
    {
      title: "Plot Area",
      dataIndex: "plot_area",
      key: "plot_area",
      width: "8%",
    },
    {
      title: "Plot Amount",
      dataIndex: "plot_amount",
      key: "plot_amount",
      width: "10%",
    },
    {
      title: "Plot Direction",
      dataIndex: "plot_direction",
      key: "plot_direction",
      width: "15%",
    },
  ];

  const data = [
    {
      pro_name: "Sai Plots",
      plot_area: "1241",
      plot_amount: "12000",
      plot_direction: "North",
    },
    {
      pro_name: "Sai Plots",
      plot_area: "1241",
      plot_amount: "12000",
      plot_direction: "North",
    },
  ];

  //payment details
  const columns1 = [
    {
      title: "Date",
      dataIndex: "pro_name",
      key: "pro_name",
      width: "8%",
    },
    {
      title: "Bank Name",
      dataIndex: "plot_area",
      key: "plot_area",
      width: "12%",
    },
    {
      title: "Cheque no.",
      dataIndex: "plot_amount",
      key: "plot_amount",
      width: "10%",
    },
    {
      title: "Branch Name",
      dataIndex: "plot_direction",
      key: "plot_direction",
      width: "10%",
    },
    {
      title: "Payment Type",
      dataIndex: "plot_direction",
      key: "plot_direction",
      width: "10%",
    },
    {
      title: "Amount",
      dataIndex: "plot_direction",
      key: "plot_direction",
      width: "10%",
    },
  ];

  const [customerDetails, setCustomerDetails] = useState([]);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const handleCustomer = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getCustomerById/${id}`
      );
      setCustomerDetails(response.data.data);


      console.log(response.data.data,"????");
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      handleCustomer(id);
    }
  }, [location]);

  return (
    <>
      <div className="parent customer-detail-parent">
        <div className="container customer-detail-cont">
          {/* customer details */}
          <div class="row g-3 customer-detail-form   ">
            <div class="customer-date">
              <h3 style={{ color: "var(--accent)" }}>Customer Details</h3>
              <span style={{ fontSize: "20px" }}>nov 19, 2024</span>
            </div>
            <div class="line"></div>
            <div class="col-3  d-flex gap-4 align-contemt-center">
              <h4 className="name-class">Name</h4>
              <h4 className="name-class-side">{customerDetails.cName}</h4>
            </div>
            <div class="col-3 d-flex gap-4 align-contemt-center">
              <h4 className="name-class">Address</h4>
              <h4 className="name-class-side">{customerDetails.address}</h4>
            </div>
            <div class="col-3 d-flex gap-4 align-contemt-center">
              <h4 className="name-class">Mobile no.</h4>
              <h4 className="name-class-side">{customerDetails.mob_Number}</h4>
            </div>
            <div class="col-3 d-flex gap-4 a lign-contemt-center">
              <h4 className="name-class">Email</h4>
              <h4 className="name-class-side">{customerDetails.email}</h4>
            </div>
          </div>

          {/* plots details */}
          <div class="row g-3 customer-detail-form   ">
            <h3 style={{ color: "var(--accent)" }}>Plots Details</h3>
            <div class="line"></div>
            <AntTable
              columns={columns}
              dataSource={data}
              bordered={true}fantatble
              pagination={false}
              className="table1"
            />
          </div>

          {/* Payment details */}
          <div class="row g-3 customer-detail-form   ">
            <h3 style={{ color: "var(--accent)" }}>Payment Details</h3>
            <div class="line"></div>
            <AntTable
              columns={columns1}
              dataSource={data}
              bordered={true}
              pagination={false}
              className="table1"
            />

            <h3 style={{ display: "flex", justifyContent: "flex-end" }}>
              Total Amount: 10000
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
