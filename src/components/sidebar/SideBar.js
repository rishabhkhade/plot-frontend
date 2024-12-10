import React, { useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { GoProjectRoadmap } from "react-icons/go";
import { PiUsers } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

function SideBar() {
  const [navbar, setNavbar] = useState(false);

  const data = [
    {
      link_name: "Dashboard",
      link_path: "/",
      icon: <GoHome />,
    },
    {
      link_name: "Our Projects",
      link_path: "/",
      icon: <GoProjectRoadmap />,
      
    },
    {
      link_name: "Our Customer",
      link_path: "/",
      icon: <PiUsers />,
    },
    {
      link_name: "Statement",
      icon: <RiBillLine />,
      link_path: "/",
    },
    {
      link_name: "Add Employee",
      icon: <IoMdAdd />,
      link_path: "/",
    },
  ];

  return (
    <>
      <div className={navbar ? "sidebar active" : "sidebar"}>
        <span
          className={navbar ? "arrow-icon " : "arrow-icon active"}
          onClick={() => setNavbar(!navbar)}
        >
          <IoIosArrowForward />
        </span>
        <h2 className="h2">{navbar ? <RiBillLine /> : "Admin Panel"}</h2>

        <div class="sidebar-headings">
          {data.map((item, index) => (
            <Link key={index} to={item.link_path}>
              {" "}
              <span className={navbar ? "icon active" : "icon"}>
                {item.icon}
              </span>{" "}
              <span className={navbar ? "text active" : "text"}>
                {item.link_name}
              </span>
            </Link>
          ))}
        </div>
        <span className="logout-icon">
          <IoMdLogOut />{" "}
        </span>
        <Link className="btn logout-btn">Log Out</Link>
      </div>
    </>
  );
}

export default SideBar;
