import React,{ useState, useEffect} from 'react'
import { getReports, deleteReport } from '../../services/admin/Report.service';
import "./Report.css";
import { toast } from "react-toastify";
function Report() {
    const [report_id, setReportId]=useState("");
    const [report_type, setReportType]=useState("");
    const [report_type_id, setReportTypeId]=useState("");
    const [report, setReport]=useState([]);

    useEffect(()=>{
        getAllReports();
    },[]);

    const getAllReports=(e)=>{
        getReports()
        .then((res)=>{
            console.log(res.data);
           setReport(res.data);
        })
        .catch((err)=>{
            console.log("Error", err);
        });
    }
    const onDelete= (e)=>{
        e.preventDefault();
        deleteReport(report_id,report_type,report_type_id)
        .then((res)=>{
            console.log(res.data);
            toast.success();
            setReportId("");
            setReportType("");
            setReportTypeId("");
            getAllReports();
        })
        .catch((err)=>{
            console.log(err);
        });
    };
  return (
    
    <div className='report-div'>
        <div className='report-form'>
            <form>
            <h2 className="city-op">Report Operations</h2>
            <div className='form-group'>
            <label htmlFor="reporttype">Report Type</label>
            <input
              onChange={(e) => setReportType(e.target.value)}
              type="text"
              name="reporttype"
              placeholder="Report Type"
              id="reporttype"
              value={report_type}
              className="form-control"
            />
            </div>
            <div className='form-group'>
            <label htmlFor="reporttypeid">Type Id</label>
            <input
              onChange={(e) => setReportTypeId(e.target.value)}
              type="text"
              name="reporttypeid"
              placeholder="Type Id"
              id="reporttypeid"
              value={report_type_id}
              className="form-control"
            />
            </div>
            <div className='form-group'>
            <label htmlFor="reportid">Report Id</label>
            <input
              onChange={(e) => setReportId(e.target.value)}
              type="text"
              name="reportid"
              placeholder="Report Id"
              id="reportid"
              value={report_id}
              className="form-control"
            />
            </div>
            <div className="btn-main">
          <button
                   style={{marginTop:"0.5rem"}}
                    type="submit"
                    className="add-btn"
                    disabled={!report_id||!report_type||!report_type_id}
                    onClick={onDelete}
                  >
                    Delete
                  </button>
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
  )
}

export default Report