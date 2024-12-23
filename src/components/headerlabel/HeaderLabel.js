import React, { useContext } from "react";
import "./headerLabel.scss";
import { CiCalendar } from "react-icons/ci";
import { UserContext } from "../../Context";


function HeaderLabel() {

  const contextData = useContext(UserContext)


  return (
    <>
      <div class="parent header-parent">
        <div class="container header-container">
          <span>{contextData.userName}</span>
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
