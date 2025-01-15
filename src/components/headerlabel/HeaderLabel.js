import React, { useContext } from "react";
import "./headerLabel.scss";
import { CiCalendar } from "react-icons/ci";
import { UserContext } from "../../Context";

function HeaderLabel() {
  const contextData = useContext(UserContext);
  const date = new Date();

  return (
    <>
      <div class="parent header-parent">
        <div class="container header-container">
          <span>{contextData.userName}</span>
          <div class="time">
            <span>{date.toDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderLabel;
