import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RolePromotionReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await axios.get("http://localhost:5000/api/report/role-promotion-report")
        .then((res)=>{
            setReports(res.data.result);
            toast.success(res.data.message)
        })
      } catch (error) {
        console.error( error);
        toast.error(error.response.data.message)
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="table-responsive">
      <h1 className="text-center">Role Promotion Report</h1>
      <table className="table text-center shadow">
        <thead>
          <tr className="shadow">
            <th className="shadow">Employee</th>
            <th className="shadow">Old Role</th>
            <th className="shadow">New Role</th>
            <th className="shadow">Date of Change</th>
          </tr>
        </thead>
        <tbody>
          {/* {reports.map(report => (
            <tr key={report._id} className="shadow">
              <td className="shadow">{report.employee.userName}</td>
              <td className="shadow">{report.oldRole.role}</td>
              <td className="shadow">{report.newRole.role}</td>
              <td className="shadow">{new Date(report.dateOfChange).toLocaleDateString()}</td>
            </tr>
          ))} */}
          {reports.map((report) => (
            <tr key={report._id} className="shadow">
              <td className="shadow">{report.employee ? report.employee.userName : "N/A"}</td>
              <td className="shadow">{report.oldRole ? report.oldRole.role : "N/A"}</td>
              <td className="shadow">{report.newRole ? report.newRole.role : "N/A"}</td>
              <td className="shadow">{report.dateOfChange ? new Date(report.dateOfChange).toLocaleDateString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolePromotionReport;
