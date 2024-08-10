import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WorkPeriodReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/report/work-period-report");
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
    window.open(`http://localhost:5000/api/report/work-period-report/pdf/${id}`, "_blank");
  };

  return (
    <div className="table-responsive">
      <h1 className="text-center">Employee Work Period Report</h1>
      <table className="table text-center shadow">
        <thead>
          <tr className="shadow">
            <th className="shadow">Employee</th>
            <th className="shadow">Department</th>
            <th className="shadow">Role</th>
            <th className="shadow">Date of Joining</th>
            <th className="shadow">Work Period (Months)</th>
            <th className="shadow">Generate PDF</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.userName} className="shadow">
              <td className="shadow">{report.userName}</td>
              <td className="shadow">{report.department}</td>
              <td className="shadow">{report.role}</td>
              <td className="shadow">{new Date(report.dateOfJoining).toLocaleDateString()}</td>
              <td className="shadow">{report.workPeriod}</td>
              <td className="shadow"><button className="btn btn-outline-info" onClick={()=>handleDownloadPDF(report._id)}>Download PDF</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkPeriodReport;
