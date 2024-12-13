import { createContext, useEffect, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);
  return (
    <UserContext.Provider value={{ userName }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
