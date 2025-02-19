import React, { useEffect, useState } from "react";
import "./allPlots.scss";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

function AllPlots() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [allPlots, setAllPlots] = useState([]);

    //   useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const projectId = params.get("totalPlotByProject");
    //   }, [location]);

    const plotsData = async () => {
        try {
            const sellPlotId = searchParams.get("totalPlotByProject");
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/plots/getPlotsByProjectId/${sellPlotId}`
            );

            setAllPlots(response.data.data);
            console.log(response.data.data,"response.data.data");
            
        } catch (error) {
            console.log(error);
        }
    };

    const remainPlots = async () => {
        try {
            const remainPlotId = searchParams.get("remainingPlotByProject");
            if (!remainPlotId) return;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/plots/getAvailablePlots/${remainPlotId}`)
            if (response.data && response.data.data) {
                setAllPlots(response.data.data);
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const hasRemainingPlots = searchParams.has("remainingPlotByProject");

        if (hasRemainingPlots) {
            remainPlots();
        } else {
            plotsData();
        }
    }, [searchParams]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

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

    const columns = [
        {
            title: "Project Name",
            dataIndex: "projectname",
            key: "projectname",
            width: "12%",
            ...getColumnSearchProps("projectname"),
        },
        {
            title: "Project Area",
            dataIndex: "projectarea",
            key: "projectarea",
            width: "12%",
            ...getColumnSearchProps("projectarea"),
        },
        {
            title: "Project Location",
            dataIndex: "projectlocation",
            key: "projectlocation",
            width: "12%",
            ...getColumnSearchProps("projectlocation"),
        },
        {
            title: "Projects Gat",
            dataIndex: "projectGatId",
            key: "projectGatId",
            width: "12%",
            ...getColumnSearchProps("projectGatId"),
        },
        {
            title: "Plot Area",
            dataIndex: "plotarea",
            key: "plotarea",
            width: "12%",
            ...getColumnSearchProps("plotarea"),
        },
        {
            title: "Plot Rate",
            dataIndex: "plotrate",
            key: "plotrate",
            width: "12%",
            ...getColumnSearchProps("plotrate"),
        },
        {
            title: "Plot Amount",
            dataIndex: "plotamount",
            key: "plotamount",
            width: "12%",
            ...getColumnSearchProps("plotamount"),
        },
        {
            title: "Plot Direction",
            dataIndex: "plotdirection",
            key: "plotdirection",
            width: "12%",
            ...getColumnSearchProps("plotdirection"),
        },
    ];

    return (
        <>
            <div class="all-plots-parent parent">
                <div class="all-plots-cont container">
                    <AntTable
                        columns={columns}
                        dataSource={allPlots}
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

export default AllPlots;
