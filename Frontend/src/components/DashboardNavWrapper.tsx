import React from "react";
import { Link } from "react-router-dom";
// const Dashboard_logo =require("../assets/Dashboard-unactive.svg")
import Dashboard_logo from "../assets/Dashboard-unactive.svg";
import Dashboard_logoActive from "../assets/Dashboard-active.svg";
import create_project_active from "../assets/create-project-active.svg";
import Project_list_active from "../assets/Project-list-active.svg";
import list_logo from "../assets/Project-list-unactive.svg";
import create_project from "../assets/create-project-unactive.svg";
import Logout from "../assets/mob_Logout.svg";
import desk_Logout from "../assets/Logout.svg";
import Logo from "../assets/Logo.svg" 
import { useNavigate } from "react-router-dom";

// declare module '*.svg' {
//   import * as React from 'react';

//    const ReactComponent: React.FunctionComponent<React.SVGProps<
//     SVGSVGElement
//   > & { title?: string }>;

//   const src: string;
//   export default src;
// }

function DashboardNavWrapper(props) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    // navigate

    localStorage.setItem("token", "");
    navigate("/");
  };
  const page_title = {
    "/dashboard": "Dashboard",
    "/project_list": "Project List",
    "/create_project": "Create Project",
  };

  return (
    <div className="main-dashboard flex ">
      <div className="sidebar flex justify-center items-center">
        <div className="h-48 flex flex-col justify-around">
          <Link to="/dashboard">
            <img
              src={
                window.location.pathname == "/dashboard"
                  ? Dashboard_logoActive
                  : Dashboard_logo
              }
              alt="Image"
            />
          </Link>
          <Link to="/project_list">
            {" "}
            <img
              src={
                window.location.pathname == "/project_list"
                  ? Project_list_active
                  : list_logo
              }
              alt="Image"
            />
          </Link>
          <Link to="/create_project">
            <img
              src={
                window.location.pathname == "/create_project"
                  ? create_project_active
                  : create_project
              }
              alt="Image"
            />
          </Link>

          <img onClick={logoutHandler} src={desk_Logout} alt="Image"  className="absolute bottom-12"/>
        </div>
      </div>
      <div className="topbar  flex justify-between">
        {/* <div className="flex justify-center"> */}
          <h1 className="currnt-page-text ">
            {" "}
            {page_title[window.location.pathname]}
          </h1>

          <img src={Logo} alt="logo" className="h-12 dash_logo " />

          <img
            onClick={logoutHandler}
            src={Logout}
            className="mob-logout"
            alt="Image"
          />
        {/* </div> */}
        {props.children}
  
      <div className="mob_nav">
        <div className="flex justify-around">
          <Link to="/dashboard">
            <img
              src={
                window.location.pathname == "/dashboard"
                  ? Dashboard_logoActive
                  : Dashboard_logo
              }
              alt="Image"
            />
          </Link>
          <Link to="/project_list">
            {" "}
            <img
              src={
                window.location.pathname == "/project_list"
                  ? Project_list_active
                  : list_logo
              }
              alt="Image"
            />
          </Link>
          <Link to="/create_project">
            <img
              src={
                window.location.pathname == "/create_project"
                  ? create_project_active
                  : create_project
              }
              alt="Image"
            />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DashboardNavWrapper;
