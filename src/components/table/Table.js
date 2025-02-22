import React, { useState } from "react";
import { Table as AntTable, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Table = ({ columns, dataSource, pageSize = 10 }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <input
          type="text"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  // Add search functionality to columns dynamically
  const updatedColumns = columns.map((col) => ({
    ...col,
    ...getColumnSearchProps(col.dataIndex),
  }));

  return (
    <AntTable
      columns={updatedColumns}
      dataSource={dataSource}
      pagination={{ pageSize }}
      rowClassName="editable-row"
      scroll={{ x: "max-content" }}
      bordered={true}
      className="table"
    />
  );
};

export default Table;
