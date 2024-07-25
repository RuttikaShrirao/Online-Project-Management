import React from "react";
import { useState } from "react";
import Logo from "../assets/Logo.svg";
import hide_password from "../assets/hide-password.svg";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  // navigate
  const navigate = useNavigate();

  // handler function
  const LoginHandler = (event) => {
    event.preventDefault();

    if (formState.email.length == 0 || formState.password == 0) {
      setErrorMsg(true);
    } else {
      fetch(`https://online-project-management-back.onrender.com/api/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            setErrorMsg(data.data);
          }
        })
        .catch((e) => setErrorMsg(true));
    }
  };

  return (
    <>
      <div className="logo-bg-img flex flex-col justify-center items-center">
        <div className="logo-header">
          <img src={Logo} className="logo" />
          <p className="my-4">Online Project Management</p>
        </div>

        <div className="login-form  flex-col justify-center items-center">
          <p className="login-to-get-started ">Login to get started</p>
          <div className="">
            <p
              className={`email ${
                errorMsg ? "text-red-500" : "text-slate-400"
              }`}
            >
              Email
            </p>
            <input
              className={`rectangle ${
                errorMsg
                  ? "border border-red-500 border-solid"
                  : "border border-gray-400 border-solid"
              }`}
              type="email"
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
            <p
              className={`email ${
                errorMsg ? "text-red-500" : "text-slate-400"
              }`}
            >
              {errorMsg && formState.email == 0 && "Email is required"}
            </p>
          </div>
          <div>
            <p
              className={`password ${
                errorMsg ? "text-red-500" : "text-slate-400"
              }`}
            >
              Password
            </p>
            <div className="relatve">
            <input
              className={` ${
                errorMsg
                  ? "border border-red-500 border-solid"
                  : "border border-gray-400 border-solid"
              } rectangle`}
              type="password"
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
            <img src={hide_password} className="hide-password " />
</div>
            <p
              className={`email ${
                errorMsg ? "text-red-500" : "text-slate-400"
              }`}
            >
              {errorMsg && formState.password == 0 && "Password is required"}
            </p>
            <p className="forgot-password">Forgot password</p>
            <p className="invalid-credentials invalid-desk">{errorMsg}</p>
          </div>
          <button className="btn" onClick={LoginHandler}>
            Login
          </button>
        </div>
        <p className="invalid-credentials invalid-mob">{errorMsg}</p>
      </div>
    </>
  );
}

export default Login;
