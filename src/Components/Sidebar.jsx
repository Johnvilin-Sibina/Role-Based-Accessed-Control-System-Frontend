import React from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { FaUsersGear } from "react-icons/fa6";
import "../App.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto col-md-3 border border-right">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 sidebar-link">
                <FaHome />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 sidebar-link">
                <HiSpeakerphone />
                Anouncements
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/employees' className="nav-link d-flex align-items-center gap-2 sidebar-link">
                <FaUsersGear />
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/profile' className="nav-link d-flex align-items-center gap-2 sidebar-link">
                <FaUserAlt size={15}/>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2"></a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2"></a>
            </li>
          </ul>
          <hr className="my-3" />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 sidebar-link"></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 sidebar-link">
                <FaSignOutAlt />
                Sign out
              </Link>
            </li>
          </ul>
        </div>
  );
};

export default Sidebar;
