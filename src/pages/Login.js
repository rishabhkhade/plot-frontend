import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div class="parent login-parent">
        <div class="container login-container">
          <div class="login-box">
            <div class="left-login">
              <h2>Login</h2>
              <div class="username-password">
                <span>User Name</span>
                <input type="text" />
                <span>Password</span>
                <input type="text" />
              </div>
              <Link className="btn">Login</Link>
            </div>
            <div class="right-login bg-img-cover"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
