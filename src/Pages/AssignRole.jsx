import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AssignRole = () => {
  //const [employee, setEmployee] = useState(null);
  const { Id } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const [assignRole, setAssignRole] = useState({
    userName: "",
    email: "",
    role: "",
    department: "",
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .matches(
        /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email Format"
      ),
    role: Yup.string().required("Role is Required"),
    department: Yup.string().required("Department is required"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: assignRole,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        await axios
          .put(`http://localhost:5000/api/assign-role/${Id}`, values)
          .then((res) => {
            toast.success(res.data.message);
            setAssignRole(res.data.result);
            navigate("/employees");
          });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues(assignRole);
  }, [assignRole]);

  const fetchData = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/employee-assign-role/${Id}`)
        .then((res) => {
          setAssignRole(res.data.result);
          toast.success(res.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    assignRole && (
      <div className="container d-flex justify-content-center mt-5">
        <div className="row">
          <div className="col">
            <form onSubmit={formik.handleSubmit}>
              <fieldset>
                <legend className="text-center assignRole">Assign Role</legend>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    readOnly
                  />
                </div>
                <p className="formik-error">{formik.errors.userName}</p>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    readOnly
                  />
                </div>
                <p className="formik-error">{formik.errors.email}</p>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <option value="Admin">Admin</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Content Creator">Content Creator</option>
                    <option value="Customer Service Representative">
                      Customer Service Representative
                    </option>
                    <option value="Recuriter">Recuriter</option>
                  </select>
                </div>
                <p className="formik-error">{formik.errors.role}</p>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.department}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                </div>
                <p className="formik-error">{formik.errors.department}</p>
                <button type="submit" className="btn btn-primary button">
                  Assign
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AssignRole;
