import React from "react";
import "./dashboard.scss";

function Dashboard() {
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
          <div class="dashboard-right">right</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
