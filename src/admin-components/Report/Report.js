import React, { useState, useEffect} from "react";
import { getReports, deleteReport, deleteRep } from "../../services/admin/Report.service";
import "./Report.css";
import { toast } from "react-toastify";
function Report() {
  const [report_id, setReportId] = useState("");
  const [report_type, setReportType] = useState("");
  const [report_type_id, setReportTypeId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getAllReports();
  }, []);

const validateDelete = (e) =>{
  e.preventDefault();
  if(report_type && report_type_id){
  onDelete(e);
  }
  else{
      toast.error("Fill report type and type id!");
  }
 }
 const validateDelReport = (e) =>{
    e.preventDefault();
    if(report_id){
    onDeleteReport(e);
    }
    else{
        toast.error("Fill report id!");
    }
   }
  const getAllReports = () => {
    getReports()
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const onDelete = (e) => {
    e.preventDefault();
    deleteReport( report_type, report_type_id)
      .then((res) => {
        toast.success();
        // setReportId("");
        setReportType("");
        setReportTypeId("");
        getAllReports();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const onDeleteReport=(e)=>{
      e.preventDefault();
      deleteRep(report_id)
      .then((res)=>{
          toast.success("Report Deleted Successfully!");
          setReportId("");
          getAllReports();
      })
      .catch((err)=>{
           console.log(err.response);
      });

  };

  return (
    <div className="report-div">
      <div className="report-form">
        <form>
          <h2 className="city-op">Report Operations</h2>
          <div className="form-row">
             <div className="form-group col">
            <label htmlFor="reportid">Report Id</label>
            {/* <div className="img-form"> */}
              {/* <div> */}
            <input
              onChange={(e) => {setReportId(e.target.value);}}
              type="text"
              name="reportid"
              placeholder="Report Id"
              id="reportid"
              value={report_id}
              className="form-control"
            />
            {/* </div> */}
             </div>
             <div className="form-group col">
          <div className="btn-main">
              <div className="update-btn">
            <button
              type="submit"
              style={{marginTop:"1.5rem"}}
              className="delete-btn"
              onClick={validateDelReport}
            >
              Delete Report
            </button>
         </div>
         </div>
             </div>
          </div>
          <div className="form-group">
            <label htmlFor="reporttype">Report Type</label>
            <input
              onChange={(e) => {setReportType(e.target.value);
                                }}
              type="text"
              name="reporttype"
              placeholder="Report Type"
              id="reporttype"
              value={report_type}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reporttypeid">Type Id</label>
            <input
              onChange={(e) => {setReportTypeId(e.target.value)}}
              type="text"
              name="reporttypeid"
              placeholder="Type Id"
              id="reporttypeid"
              value={report_type_id}
              className="form-control"
            />
          </div>

          <div className="btn-main">
              <div className="update-btn">
            <button
              style={{ marginTop: "0.5rem" }}
              type="submit"
              className="delete-btn"
              onClick={validateDelete}
            >
              Delete Data
            </button>
            </div>
          </div>
        </form>
      </div>

      <div className="city-table">
        <table id="citytable">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Type Id</th>
              <th>Description</th>
            </tr>
            {report.map((r) => {
              return (
                <tr key={r.report_id}>
                  <td>{r.report_id}</td>
                  <td>{r.report_type}</td>
                  <td>{r.report_type_id}</td>
                  <td>{r.report_desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Report;
