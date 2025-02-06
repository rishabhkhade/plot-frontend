import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

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

  return (
    <UserContext.Provider value={{ userName, projectList, fetchProjects }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
