import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import '../assets/css/responsive.css';

export default function CheckInOutReport({ selectedDate, selectedHotel }) {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchData = async () => {
        if (!startDate || !endDate) return;
        try {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Load from environment
            const response = await axios.get(`${API_BASE_URL}/api/book/checkin-checkout-report`, {
                params: { hotelid: selectedHotel, startDate, endDate }
            });
            if (response.data.success) {
                setReports(response.data.reports);
            }
        } catch (error) {
            console.error("Error fetching check-in/check-out report:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, selectedHotel]);

    return (
        <>
            <h4 className="pb-3">Check-in & Check-out Report</h4>

<div className="d-flex mb-3">
    <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="form-control me-2"
    />
    <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="form-control"
    />
</div>

<div className="table-responsive">
    <table className="table table-traffic mb-0">
        <thead className="text-center">
            <tr>
                <th className="border-top-0 fw-semibold text-black">#</th>
                <th className="border-top-0 fw-semibold text-black">Booking No</th>
                <th className="border-top-0 fw-semibold text-black">Guest Name</th>
                <th className="border-top-0 fw-semibold text-black">Room No</th>
                <th className="border-top-0 fw-semibold text-black">Check-in Date</th>
                <th className="border-top-0 fw-semibold text-black">Check-out Date</th>
                <th className="border-top-0 fw-semibold text-black">Stay Duration</th>
            </tr>
        </thead>
        <tbody className="text-center">
            {reports.length > 0 ? (
                <>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{report.bookingNo}</td>
                            <td>{report.guestName}</td>
                            <td>{report.roomNo}</td>
                            <td>{new Date(report.checkinDate).toLocaleDateString()}</td>
                            <td>{new Date(report.checkoutDate).toLocaleDateString()}</td>
                            <td>{report.stayDuration} nights</td>
                        </tr>
                    ))}
                    {/* Sum Row */}
                    <tr className="fw-bold">
                        <td colSpan="6" className="text-end">Total:</td>
                        <td>
                            {reports.reduce((sum, report) => sum + report.stayDuration, 0)} nights
                        </td>
                    </tr>
                </>
            ) : (
                <tr>
                    <td colSpan="7">No data available</td>
                </tr>
            )}
        </tbody>
    </table>
</div>
        </>
    );
}
