import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import '../assets/css/responsive.css';

export default function Loginreports({selectedDate,selectedHotel}){

    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get("http://localhost:4000/logs/loginlogs");
                if (response.data.success) {
                    setLogs(response.data.data);
                } else {
                    console.error("Failed to fetch logs");
                }
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);
    

    return <>
            <h4 className="pb-3">Login and Logout Reports</h4>
                                    <div className="table-responsive">
                                        <table className="table table-traffic mb-0">
                                            <thead className='text-center'>
                                                <tr>
                                                    <th className="border-top-0 fw-semibold text-black">#</th>
                                                    <th className="border-top-0 fw-semibold text-black">Name</th>
                                                    <th className="border-top-0 fw-semibold text-black">Action</th>
                                                    <th className="border-top-0 fw-semibold text-black">IP Address</th>
                                                    <th className="border-top-0 fw-semibold text-black">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {logs.length > 0 ? (
                                                    logs.map((log, index) => (
                                                        <tr key={log._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{log.userid || "N/A"}</td>
                                                            <td>
                                                                <span className={`badge ${log.action === "login" ? "bg-success" : "bg-danger"}`}>
                                                                    {log.action}
                                                                </span>
                                                            </td>
                                                            <td>152.58.249.79</td>
                                                            <td>{new Date(log.actionat).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-muted">No logs found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
    </>
}