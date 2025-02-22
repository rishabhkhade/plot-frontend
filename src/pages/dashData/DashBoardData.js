import React from 'react'
import Table from '../../components/table/Table'
import { useSearchParams } from 'react-router-dom';

const DashBoardData = () => {


    const [searchParmas] = useSearchParams();

    const getAllplot = searchParmas.get("")

    const columns = [
        {
          title: "Project Name",
          dataIndex: "projectname",
          key: "projectname",
          width: "12%",
         
        },
    
        {
          title: "Project Location",
          dataIndex: "projectlocation",
          key: "projectlocation",
          width: "12%",
          
        },
        {
          title: "Projects Gat",
          dataIndex: "projectGatId",
          key: "projectGatId",
          width: "12%",
          
        },
        {
          title: "Plot Number",
          dataIndex: "plotnum",
          key: "plotnum",
          width: "12%",
         
        },
        {
          title: "Plot Area",
          dataIndex: "plotarea",
          key: "plotarea",
          width: "12%",
         
        },
        {
          title: "Plot Rate",
          dataIndex: "plotrate",
          key: "plotrate",
          width: "12%",
          
        },
        {
          title: "Plot Amount",
          dataIndex: "plotamount",
          key: "plotamount",
          width: "12%",
        
        },
      ];
  return (
    <>
      <Table  columns={columns} dataSource={dataSource} />
    </>
  )
}

export default DashBoardData
