import React, { useEffect, useState } from "react";
import "./customerDetails.scss";
import { Table as AntTable } from "antd";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

function CustomerDetails() {
  const [customerDetails, setCustomerDetails] = useState([]);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const handleCustomer = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/getCustomerById/${id}`
      );
      setCustomerDetails(response.data.data);

      console.log(response.data.data, "????");
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

  //plot details
  const columns = [
    {
      title: "Plot no.",
      dataIndex: "plotId",
      key: "plotId",
      width: "13%",
    },
    {
      title: "Plot Area",
      dataIndex: "plot_area",
      key: "plot_area",
      width: "8%",
    },
    {
      title: "Plot Rate",
      dataIndex: "plotrate",
      key: "plotrate",
      width: "10%",
    },
    {
      title: "Plot Amount",
      dataIndex: "plotamount",
      key: "plotamount",
      width: "15%",
    },
  ];

  const paymentDetails = (customerDetails.payments || []).map((item) => ({
    bankName: item.bankDetails?.bankName,
    branchName: item.bankDetails?.branchName,
    cheqDate: item.bankDetails?.cheqDate,
    cheqNum: item.bankDetails?.cheqNum,
    payment_type: item?.payment_type,
    bookingAmt: item?.bookingAmt,
  }));

  const totalAmount = (customerDetails.payments || []).reduce(
    (total, item) => total + Number(item.bookingAmt || 0),
    0
  );

  //plot details
  const data = [
    {
      plotId: customerDetails?.plotdetails?.plotId || 0,
      plot_area: customerDetails?.plotdetails?.plotarea || 0,
      plotrate: customerDetails?.plotdetails?.plotrate || 0,
      plotamount: customerDetails?.plotdetails?.plotamount || 0,
    },
  ];

  //payment details
  const columns1 = [
    {
      title: "Date",
      dataIndex: "cheqDate",
      key: "cheqDate",
      width: "8%",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      width: "12%",
    },
    {
      title: "Cheque no.",
      dataIndex: "cheqNum",
      key: "cheqNum",
      width: "10%",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      width: "10%",
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      key: "payment_type",
      width: "10%",
    },
    {
      title: "Amount",
      dataIndex: "bookingAmt",
      key: "bookingAmt",
      width: "10%",
    },
  ];

  return (
    <>
      <div className="parent customer-detail-parent">
        <div className="container customer-detail-cont">
          {/* customer details */}
          <div class="row g-3 customer-detail-form   ">
            <div class="customer-date">
              <h3 style={{ color: "var(--accent)" }}>Customer Details</h3>
              <div className="" style={{display:"flex", gap:"15px",  justifyContent:"center"}}>
                {" "}
                <h4 className="name-class">Date:</h4>
                <span style={{ fontSize: "14px" }}>{customerDetails.date}</span>
              </div>
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

          {/* Projects details */}
          <div class="row g-3 customer-detail-form   ">
            <div class="customer-date">
              <h3 style={{ color: "var(--accent)" }}>Project Details</h3>
            </div>
            <div class="line"></div>
            <div class="col-3  d-flex gap-4 align-contemt-center">
              <h4 className="name-class">Project Name</h4>
              <h4 className="name-class-side">
                {customerDetails?.projectsDetails?.projectname || ""}
              </h4>
            </div>
            <div class="col-3 d-flex gap-4 align-contemt-center">
              <h4 className="name-class">Gat no.</h4>
              <h4 className="name-class-side">
                {customerDetails?.projectsDetails?.projectGatId || "" }
              </h4>
            </div>
          </div>

          {/* plots details */}
          <div class="row g-3 customer-detail-form   ">
            <h3 style={{ color: "var(--accent)" }}>Plots Details</h3>
            <div class="line"></div>
            <AntTable
              columns={columns}
              dataSource={data}
              bordered={true}
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
              dataSource={paymentDetails}
              bordered={true}
              pagination={false}
              className="table1"
                rowClassName={() => "custom-cursor-row"}
            />

            <h3 style={{ display: "flex", justifyContent: "flex-end" }}>
              Total Amount: {totalAmount}.00
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
