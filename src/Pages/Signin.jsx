import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/employeeSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, currentUser} = useSelector((state)=>state.employee)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      await axios
        .post("http://localhost:5000/api/login-emp", payload)
        .then((res) => {
          toast.success(res.data.message);
          localStorage.setItem('Token',res.data.userDetail.token)
          dispatch(signInSuccess(res.data.userDetail))
          navigate("/dashboard");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <>
    <Navbar />
    <div className="container d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="text-center signin">Sign In</legend>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Your Email"
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
              <button type="submit" className="btn btn-primary button">
                Sign In
              </button>
            </fieldset>
          </form>
          <div className="mt-2">
            <Link to="/forgotpw">Forgot Password?</Link>
            <br />
            <span className="mt-2">Do not have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signin;
