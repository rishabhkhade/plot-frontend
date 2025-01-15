import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { GoProjectRoadmap } from "react-icons/go";
import { PiUsers } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import axios from "axios";

function SideBar({ setIslogdin }) {
  const [navbar, setNavbar] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(null);


  const fetchProjectId = (id) => {
    navigate(`./view-projects?id=${id}`); 
  };

 
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      setProjectId(id); 
    }
  }, [id]);

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
      hasDropdown: true,
    },
    {
      link_name: "Our Customer",
      link_path: "/customer",
      icon: <PiUsers />,
    },
    ...(role === "Admin"
      ? [
          {
            link_name: "Statement",
            icon: <RiBillLine />,
            link_path: "/statement",
          },
          {
            link_name: "Add Employee",
            icon: <IoMdAdd />,
            link_path: "/add-employees",
          },
          {
            link_name: "Enquiry",
            icon: <IoMdAdd />,
            link_path: "/enquire",
          },
        ]
      : []),
  ];

  const logOutUser = () => {
    localStorage.removeItem("token");
    setIslogdin(false);
    navigate("/*");
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getprojectsList`
      );

      setProjectList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const projects_list = [
    ...projectList.map((project) => ({
      label: (
        <a
          view-projects
        
          onClick={() => fetchProjectId(project.projectId)}
        >
          {project.projectname}
        </a>
      ),
    })),
    {
      type: "divider",
    },
    {
      label: <Link to="/add-projects">Add Projects</Link>,
      key: "add-projects",
    },
  ];

  return (
    <div className={navbar ? "sidebar active" : "sidebar"}>
      <span
        className={navbar ? "arrow-icon " : "arrow-icon active"}
        onClick={() => setNavbar(!navbar)}
      >
        <IoIosArrowForward />
      </span>
      <h2 className="h2">{navbar ? <RiBillLine /> : "Admin Panel"}</h2>
      <div className="sidebar-headings">
        {data.map((item, index) => {
          if (item.hasDropdown) {
            return (
              <Dropdown
                key={index}
                menu={{ items: projects_list }}
                trigger={["hover"]}
              >
                <Link to={item.link_path} onClick={(e) => e.preventDefault()}>
                  <span className={navbar ? "icon active" : "icon"}>
                    {item.icon}
                  </span>
                  <span className={navbar ? "text active" : "text"}>
                    {item.link_name}
                  </span>
                  <DownOutlined />
                </Link>
              </Dropdown>
            );
          } else {
            return (
              <Link key={index} to={item.link_path}>
                <span className={navbar ? "icon active" : "icon"}>
                  {item.icon}
                </span>
                <span className={navbar ? "text active" : "text"}>
                  {item.link_name}
                </span>
              </Link>
            );
          }
        })}
      </div>
      <span className="logout-icon">
        <IoMdLogOut />
      </span>
      <Link className="btn logout-btn" onClick={logOutUser}>
        Log Out
      </Link>
    </div>
  );
}

export default SideBar;
