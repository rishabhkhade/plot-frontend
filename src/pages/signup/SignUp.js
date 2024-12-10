import React, { useState } from "react";
import "./signUp.scss";
import axios from "axios";

function SignUp() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        signupData
      );
      setSignupData({
        username: "",
        password: "",
        role: "",
      });
      alert("Data successfully submited !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="parent-signup parent">
        <div className="container-signup container">
          <form className="login-box" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="username-password-signup">
              <div className="check-box">
                <span>Employee</span>
                <input
                  className="radio-btn"
                  type="radio"
                  name="role"
                  value={signupData.role}
                  onChange={(e) =>
                    setSignupData({ ...signupData, role: "Employee" })
                  }
                />
                <span>Admin</span>
                <input
                  className="radio-btn"
                  type="radio"
                  name="role"
                  value={signupData.role}
                  onChange={(e) =>
                    setSignupData({ ...signupData, role: "Admin" })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                name="username"
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                name="password"
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
