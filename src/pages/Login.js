import React, { useState } from "react";
import "./login.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        loginData
      );
      setLoginData({
        username: "",
        password: "",
      });
      alert("Login successfully done!");
    } catch (error) {}
  };

  return (
    <>
      <div class="parent login-parent">
        <div class="container login-container">
          <form class="login-box" onSubmit={handleLogin}>
            <div class="left-login">
              <h2>Login</h2>
              <div class="username-password">
                <div class="username">
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginData.username}
                    name="username"
                    onChange={(e) =>
                      setShowPassword(...loginData, e.target.value)
                    }
                  />
                </div>

                <div class="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    name="password"
                    onChange={(e) =>
                      setShowPassword(...loginData, e.target.value)
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
