import React, { useContext, useState } from "react";
import "./login.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";

function Login({ setIslogdin }) {
  const contextData = useContext(UserContext);
  

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://ploting-backend.vercel.app/user/login`,
        loginData
      );

      if (response.data.response.message === "loggin successfully") {
        const token = response.data.response.token;
       localStorage.setItem("username",response.data.response.user.username)
      

        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.response.user.role);
        setIslogdin(true);
        navigate("/");
      }

      setLoginData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="parent login-parent">
        <div className="container login-container">
          <form className="login-box" onSubmit={handleLogin}>
            <div className="left-login">
              <h2>Login</h2>
              <div className="username-password">
                <div className="username">
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginData.username}
                    name="username"
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                  />
                </div>

                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    name="password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                  </span>
                </div>
              </div>
              <button className="btn" type="submit">
                Login
              </button>
            </div>
            <div className="right-login bg-img-cover"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
