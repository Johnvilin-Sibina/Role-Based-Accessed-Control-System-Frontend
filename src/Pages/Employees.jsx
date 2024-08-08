import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assignRole } from "../Redux/Slice/employeeSlice";


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const {Id} = useSelector((state)=>state.employee)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [deleteEmployee,setDeleteEmployee] = useState([])
  //Function to fetch all the employees
  const fetchEmployees = async () => {
    try {
      await axios.get("http://localhost:5000/api/get-all-emp").then((res) => {
        toast.success(res.data.message);
        setEmployees(res.data.result);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAssignRole = (id)=>{
    dispatch(assignRole(id))
    navigate(`/assignrole/${Id}`)
  }

 //Function to handle delete
 const handleDelete = async(id)=>{
  try {
  await axios.delete(`http://localhost:5000/api/delete-employee/${id}`)
  .then((res)=>{
    toast.success(res.data.message)
    setDeleteEmployee(res.data)
  })
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}
useEffect(()=>{
  fetchEmployees()
},[deleteEmployee])
  return (
    <>
      <h1 className="text-center">Employees</h1>
      <div className="table-responsive">
        <table className="table text-center shadow">
          <thead>
            <tr className="shadow">
              <th className="shadow">User Name</th>
              <th className="shadow">Email</th>
              <th className="shadow">Date Of Joining</th>
              <th className="shadow">Role</th>
              <th colSpan={2} className="shadow">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee._id} className="shadow">
                  <td className="shadow">{employee.userName}</td>
                  <td className="shadow">{employee.email}</td>
                  <td className="shadow">{employee.dateOfJoining.slice(0,10)}</td>
                  {employee.role ? (
                    <td className="shadow">{employee.role}</td>
                  ) : (
                    <td className="shadow">Not Yet Assigned</td>
                  )}
                  {employee.role ? (
                    <td className="shadow"><button className="btn btn-outline-warning" onClick={()=>handleAssignRole(employee._id)}>Update Role</button></td>
                  ) : (
                    <td className="shadow"><button className="btn btn-outline-warning" onClick={()=>handleAssignRole(employee._id)}>Assign Role</button></td>
                  )}
                  <td className="shadow">
                    <button className="btn btn-outline-danger" onClick={()=>handleDelete(employee._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;
