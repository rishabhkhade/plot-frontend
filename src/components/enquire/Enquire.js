import React, { useEffect, useState } from 'react'
import './enquire.scss'
import { Table as AntTable, Button, Menu } from "antd";
import axios from 'axios';
import { TiPlus } from "react-icons/ti";
import { Link } from 'react-router-dom';

function Enquire() {

    const [enqiryData, setEnquiryData] = useState([]);

    const handleEnquiryData = async (e) => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/customer/getEnquiry`);

            setEnquiryData(response.data.response);


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        handleEnquiryData();
    }, []);

    const columns = [
        // {
        //     title: "Date",
        //     dataIndex: "plotId",
        //     key: "plotId",
        //     width: "8%",
        // },
        {
            title: "Sr. no.",
            dataIndex: "cName",
            key: "id",
            width: "6%",
            render: (text, record, index) => index + 1
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "12%",
        },
        {
            title: "Mobile",
            dataIndex: "number",
            key: "number",
            width: "8%",
        },
        {
            title: "Enquiry",
            dataIndex: "enquiry",
            key: "enquiry",
            width: "12%",
        },
        {
            title: "Feedback ",
            dataIndex: "feedback",
            key: "feedback",
            width: "10%",
        },
        {
            title: "Status ",
            dataIndex: "status",
            key: "status",
            width: "8%",
        },
    ];



    return (
        <>
            <div className='parent enquire-parent'>
                <div className='container enquire-cont'>
                    <Link to="/enquiry-form" className="btn plus-icon-btn">
                        Add Enquiry
                        <span className="plus-icon">
                            {" "}
                            <TiPlus />
                        </span>
                    </Link>
                    <AntTable
                        columns={columns}
                        dataSource={enqiryData}
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
