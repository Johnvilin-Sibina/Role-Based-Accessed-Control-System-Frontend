import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
           await axios.post('http://localhost:5000/api/forgot-password',{email}) 
           navigate('/signin')
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <>
      <Navbar />
    <div className="container d-flex flex-wrap justify-content-center mt-5 box">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="text-center signup">Forgot Password</legend>
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
              <button type="submit" className="btn btn-primary">
                Send Mail
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

export default ForgotPassword;