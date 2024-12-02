import React from "react";
import "./headerLabel.scss";
import { CiCalendar } from "react-icons/ci";

function HeaderLabel() {
  return (
    <>
      <div class="parent header-parent">
        <div class="container header-container">
          <span>User Name</span>
          <div class="time">
            <CiCalendar />
            <span>nov 19, 2024</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderLabel;
