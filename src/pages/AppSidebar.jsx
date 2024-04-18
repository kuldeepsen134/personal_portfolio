import React from "react";
import { Link } from "react-router-dom";
import "../components/sidebar.css";

const AppSidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="">
          <div className="sidebar-brand pb-0">
            <h2>Kuldeep Sen</h2>
            <hr className="text-white" />
          </div>
          <ul className="sidebar-nav">
            <li className="fa fa-home">
              <Link to="/app/admindashboard">
                <i className="fa fa-home"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link to="/app/profile">
                <i className="fa fa-home"></i>Profile
              </Link>
            </li>
            <li>
              <Link to="/app/projects">
                <i className="fa fa-home"></i>Project
              </Link>
            </li>
            <li>
              <Link to="/app/skills">
                <i className="fa fa-home"></i>Skill
              </Link>
            </li>
            <li>
              <Link to="/app/experience">
                <i className="fa fa-home"></i>Experience
              </Link>
            </li>
            <li>
              <Link to="/app/education">
                <i className="fa fa-home"></i>Education
              </Link>
            </li>
            <li>
              <Link to="/app/enquiry">
                <i className="fa fa-home"></i>Enquiry
              </Link>
            </li>

            <li>
              <Link to="/login" onClick={logout}>
                <i className="fa fa-home"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
