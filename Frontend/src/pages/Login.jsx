import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import Logo from "../assets/Logo.svg";
import hide_password from "../assets/hide-password.svg";
import { useNavigate } from "react-router-dom";

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
    }

    fetch(`http://localhost:7000/api/login`, {
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
          setErrorMsg(true);
        }
      })
      .catch((e) => setErrorMsg(true));
  };

  return (
    <div className="logo-bg-img flex flex-col justify-center items-center">
      <div className="logo-header">
        <img src={Logo} className="logo" />
        <p className="my-4">Online Project Management</p>
      </div>

      <div className="login-form  flex-col justify-center items-center absolute top-48">
        <p className="text-center mb-4;">Login to get started</p>
        <p className={errorMsg ? "text-red-500 m-2" : "m-2"}>Email</p>
        <input
          className={
            errorMsg ? "border-2 border-red-500" : "border-2 border-slate-500"
          }
          type="email"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
        <p className="text-red-500">
          {errorMsg && formState.email == 0 && "Email is required"}
        </p>
        <p className={errorMsg ? "text-red-500 m-2" : "m-2"}>Password</p>
        <div className="flex items-center">
          <input
            className={
              errorMsg ? "border-2 border-red-500" : "border-2 border-slate-500"
            }
            type="password"
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />

          <img src={hide_password} className="absolute right-12" />
        </div>
        <p className="text-red-500">
          {errorMsg && formState.password == 0 && "Password is required"}
        </p>
        <p className="text-cyan-500 text-right">forget password</p>
        <div className="login-button flex justify-center">
          <button className="flex" onClick={LoginHandler}>
            Login
          </button>
        </div>
        <p className="py-5 text-red-500">{errorMsg && "Invalid Credential"}</p>
      </div>
    </div>
  );
}

export default Login;
