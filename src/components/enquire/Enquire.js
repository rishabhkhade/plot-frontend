import React from 'react'
import './enquire.scss'
import { Table as AntTable, Button, Menu } from "antd";

function Enquire() {

    const columns = [
        {
            title: "Date",
            dataIndex: "plotId",
            key: "plotId",
            width: "8%",
        },
        {
            title: "Name",
            dataIndex: "cName",
            key: "cName",
            width: "12%",
        },
        {
            title: "Mobile",
            dataIndex: "mob_Number",
            key: "mob_Number",
            width: "8%",
        },
        {
            title: "Address",
            dataIndex: "projectName",
            key: "projectName",
            width: "12%",
        },
        {
            title: "Project Name",
            dataIndex: "plotId",
            key: "plotId",
            width: "12%",
        },
        {
            title: "Plot name ",
            dataIndex: "plotarea",
            key: "plotarea",
            width: "10%",
        },
        {
            title: "Status ",
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
            <div className='parent enquire-parent'>
                <div className='container enquire-cont'>
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

export default Enquire
