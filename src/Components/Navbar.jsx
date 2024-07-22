import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand">
          RBAC
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to='/' className="nav-link">
              Home
            </Link>
            <Link to='/signup' className="nav-link">
              SignUp
            </Link>
            <Link to='/signin' className="nav-link">
              SignIn
            </Link>
            <Link to='/dashboard' className="nav-link">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
