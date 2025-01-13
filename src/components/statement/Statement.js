import React, { useEffect, useState } from 'react'
import "./statement.scss"
import { Table as AntTable, Button, Menu } from "antd";
import axios from 'axios';

function Statement() {

    const [listCustomer, setListCustomer] = useState([]);

    const handleStatement = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/statement/getStatement`);
            const customerStatement =
                response.data.response &&
                response.data.response.map((item) => ({
                    date: item?.date || item?.paymentDetails?.date || item?.expenseDetails?.date || "N/A",
                    customerName: item?.paymentDetails?.customerName || "N/A",
                    projectname: item?.expenseDetails?.projectname || "N/A",
                    pay_amount: item?.paymentDetails?.pay_amount || "0",
                    method: item?.paymentDetails?.method || "N/A",
                    description: item?.expenseDetails?.description || "N/A",
                }));
    
            setListCustomer(customerStatement);
        } catch (error) {
            console.error("Error fetching statement data:", error);
        }
    };

    useEffect(() => {
        handleStatement()
    }, [])

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
            title: "Payment",
            dataIndex: "pay_amount",
            key: "pay_amount",
            width: "18%",
        },
        {
            title: "Payment Method",
            dataIndex: "method",
            key: "method",
            width: "15%",
        },
        {
            title: "Debit ",
            dataIndex: "plotarea",
            key: "plotarea",
            width: "10%",
        },
        {
            title: "Credit ",
            dataIndex: "plotamount",
            key: "plotamount",
            width: "8%",
        },
        {
            title: "Description ",
            dataIndex: "description",
            key: "description",
            width: "8%",
        },

    ];

    return (
        <>
            <div className="parent table_parent">
                <div className="container">
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
    )
}

export default Statement
