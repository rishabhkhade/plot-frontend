import React, { useEffect, useState } from "react";
import "./statement.scss";
import { Table as AntTable, Button, Menu } from "antd";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function Statement() {
  const [listCustomer, setListCustomer] = useState([]);

  const [customerProjectStatement, setCustomerProjectStatement] = useState([]);

  const [projectList, setProjectList] = useState([]);

  const handleTotalInvest = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getprojectsList`
      );
      const totalProjectAmt = response.data.data.reduce((total, item) => {
        const amount = Number(item?.projectAmt.replace(/,/g, '')) || 0;
        return total + amount;
      }, 0);
      
      // Start with 0
      const responseexp = await axios.get(
        `${process.env.REACT_APP_API_URL}/statement/getStatement`
      );



      const totalAmounts = responseexp.data.response.reduce(
        (totals, item) => {
          const payAmount = item?.paymentDetails?.pay_amount
            ? parseInt(item.paymentDetails.pay_amount, 10)
            : 0;
          const expAmount = item?.expenseDetails?.exp_amount
            ? parseInt(item.expenseDetails.exp_amount, 10)
            : 0;
          return {
            totalPayAmount: totals.totalPayAmount + payAmount,
            totalExpAmount: totals.totalExpAmount + expAmount,
          };
        },
        { totalPayAmount: 0, totalExpAmount: 0 }
      );
      

      const profit =  totalAmounts.totalPayAmount - totalProjectAmt + totalAmounts.totalExpAmount 



      const countData = [
        {
          status: "Total Investment",
          projects_counts: totalProjectAmt,
        },
        {
          status: "Total Expenses",
          projects_counts: totalAmounts.totalExpAmount,
        },
        {
          status: "Payments",
          projects_counts:  totalAmounts.totalPayAmount,
        },
        {
          status: "Profit",
          projects_counts: profit,
        },
      ];

      setProjectList(countData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatement = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/statement/getStatement`
      );
      const customerStatement =
        response.data.response &&
        response.data.response.map((item) => ({
          date:
            item?.date ||
            item?.paymentDetails?.date ||
            item?.expenseDetails?.date ||
            "N/A",
          customerName: item?.paymentDetails?.customerName || "N/A",
          projectname: item?.expenseDetails?.projectname || "N/A",
          pay_amount: item?.paymentDetails?.pay_amount || "N/A",
          exp_amount: item?.expenseDetails?.exp_amount || "N/A",
          method: item?.paymentDetails?.method || "N/A",
          description: item?.expenseDetails?.description || "N/A",
        }));

      const totalAmounts = response.data.response.reduce(
        (totals, item) => {
          const payAmount = item?.paymentDetails?.pay_amount
            ? parseInt(item.paymentDetails.pay_amount, 10)
            : 0;
          const expAmount = item?.expenseDetails?.exp_amount
            ? parseInt(item.expenseDetails.exp_amount, 10)
            : 0;
          return {
            totalPayAmount: totals.totalPayAmount + payAmount,
            totalExpAmount: totals.totalExpAmount + expAmount,
          };
        },
        { totalPayAmount: 0, totalExpAmount: 0 }
      );
      console.log("Total Pay Amount:", totalAmounts.totalPayAmount);
      console.log("Total Expense Amount:", totalAmounts.totalExpAmount);

      setListCustomer(customerStatement);
    } catch (error) {
      console.error("Error fetching statement data:", error);
    }
  };

  

  useEffect(() => {
    handleStatement();
    handleTotalInvest();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "8%",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: "15%",
    },
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      width: "15%",
    },
    {
      title: "Description ",
      dataIndex: "description",
      key: "description",
      width: "8%",
    },

    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
      width: "15%",
    },
    {
      title: "Credit ",
      dataIndex: "pay_amount",
      key: "pay_amount",
      width: "8%",
    },
    {
      title: "Debit ",
      dataIndex: "exp_amount",
      key: "exp_amount",
      width: "10%",
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
            {projectList.map((item, index) => (
              <SwiperSlide>
                <Link to={item.link_path} className="box" key={index}>
                  <h3 className="status">{item.status}</h3>
                  <h3 className="count">
                    <CountUp
                      start={0}
                      end={item.projects_counts}
                      duration={2}
                      separator=","
                    />
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="parent dasboard-parent ">
        <div className="container ">
          <AntTable
            columns={columns}
            dataSource={listCustomer}
            pagination={{ pageSize: 10 }}
            rowClassName={() => "custom-cursor-row"}
            scroll={{ x: "max-content" }}
            bordered={true}
            className="table"
          />
        </div>
      </div>
    </>
  );
}

export default Statement;
