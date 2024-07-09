import React from "react";
import { Link } from "react-router-dom";
import Dashboard_logo from "../assets/Dashboard-unactive.svg";
import Dashboard_logoActive from "../assets/Dashboard-active.svg";
import create_project_active from "../assets/create-project-active.svg";
import Project_list_active from "../assets/Project-list-active.svg";
import list_logo from "../assets/Project-list-unactive.svg";
import create_project from "../assets/create-project-unactive.svg";
import Logout from "../assets/Logout.svg";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

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
      <div className="sidebar w-16 h-dvh flex justify-center items-center">
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
        </div>
        <img
          onClick={logoutHandler}
          src={Logout}
          className="absolute bottom-6"
          alt="Image"
        />
      </div>
      <div className="topbar">
        {/* <div className='header'></div> */}
        <div className=" flex justify-between p-9 absolute top-6 w-6/12">
          <h1 className="text-white text-lg">
            {" "}
            {page_title[window.location.pathname]}
          </h1>
          <img
            onClick={logoutHandler}
            src={Logout}
            className="mob-logout"
            alt="Image"
          />
          <img src={Logo} alt="logo" className="h-10 dash_logo" />
        </div>
        {props.children}
      </div>
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
  );
}

export default DashboardNavWrapper;
