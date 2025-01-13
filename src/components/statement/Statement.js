import React from 'react'
import "./statement.scss"
import { Table as AntTable, Button, Menu } from "antd";

function Statement() {

    const columns = [
        {
            title: "Customer Name",
            dataIndex: "cName",
            key: "cName",
            width: "15%",
        },
        {
            title: "Account Number",
            dataIndex: "mob_Number",
            key: "mob_Number",
            width: "18%",
        },
        {
            title: "Account Type",
            dataIndex: "projectName",
            key: "projectName",
            width: "15%",
        },
        {
            title: "Date",
            dataIndex: "plotId",
            key: "plotId",
            width: "8%",
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
            title: "Balance ",
            dataIndex: "totalBookingAmount",
            key: "totalBookingAmount",
            width: "8%",
        },
    ];


    const data = [
        {

        }
    ]


    return (
        <>
            <div className="parent table_parent">
                <div className="container">
                    <AntTable
                        columns={columns}
                        dataSource={data}
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
