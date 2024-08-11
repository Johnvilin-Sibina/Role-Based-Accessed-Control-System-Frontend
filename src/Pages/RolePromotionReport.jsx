import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardButton from "../Components/DashboardButton";

const RolePromotionReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/report/role-promotion-report");
        setReports(res.data.result);
        toast.success(res.data.message);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };

    fetchReports();
  }, []);

  const handleDownloadPDF = (id) => {
    window.open(`http://localhost:5000/api/report/role-promotion-report/pdf/${id}`, "_blank");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mb-3">
        <h1 className="text-center heading">Role Promotion Report</h1>
        </div>
      </div>
    <div className="table-responsive row">
      <table className="table text-center shadow col">
        <thead  className="table-heading">
          <tr className="shadow">
            <th className="shadow">Employee</th>
            <th className="shadow">Old Role</th>
            <th className="shadow">New Role</th>
            <th className="shadow">Date of Change</th>
            <th className="shadow">Generate PDF</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="shadow">
              <td className="shadow">{report.employee ? report.employee.userName : "N/A"}</td>
              <td className="shadow">{report.oldRole ? report.oldRole.role : "N/A"}</td>
              <td className="shadow">{report.newRole ? report.newRole.role : "N/A"}</td>
              <td className="shadow">{report.dateOfChange ? new Date(report.dateOfChange).toLocaleDateString() : "N/A"}</td>
              <td className="shadow"><button className="btn btn-outline-info" onClick={()=>handleDownloadPDF(report.employee._id)}>Download PDF</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <DashboardButton />
    </div>
  );
};

export default RolePromotionReport;
