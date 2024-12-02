import React from "react";
import "./dashboard.scss";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

function Dashboard() {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const data = [
    {
      name: "Pro 1 ",
      uv: 4000,
    },
    {
      name: "Pro 2",
      uv: 3000,
    },
    {
      name: "Pro 3",
      uv: 2000,
    },
    {
      name: "Pro 4",
      uv: 2780,
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <>
      <div class="parent dasboard-parent">
        <div class="container dashboard-container">
          <div class="dashboard-left">
            <div class="box box-1">
              <span>1000</span>
              <p>Total Plots</p>
            </div>
            <div class="box box-2">
              <span>4</span>
              <p>Projects</p>
            </div>
            <div class="box box-3">
              <span>250</span>
              <p>Total Plots Sale</p>
            </div>
            <div class="box box-4">
              <span>250</span>
              <p>Total Customers</p>
            </div>
          </div>
          <div class="dashboard-right">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tick={{ fill: "white" }} stroke="white" />
              <YAxis tick={{ fill: "white" }} stroke="white" />
              <Bar
              
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
