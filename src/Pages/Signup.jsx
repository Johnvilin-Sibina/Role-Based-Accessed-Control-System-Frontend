import axios from "axios";
import { ErrorMessage, Formik, useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { userName, email, password, role };
    try {
      await axios
        .post("http://localhost:5000/api/register-emp", payload)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/signin");
        });
    } catch (error) {
      toast.error(error.message);
    }
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-wrap justify-content-center mt-5">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend className="text-center signup">Sign Up</legend>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="form-control"
                    placeholder="Enter Your User Name"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Id
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Assistant Developer">
                      Assistant Developer
                    </option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary button">
                  Sign Up
                </button>
              </fieldset>
            </form>
            <div className="mt-2">
              <span>Already have an account? </span>
              <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
