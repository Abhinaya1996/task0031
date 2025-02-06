import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import '../assets/css/responsive.css';

export default function Roomwise({selectedDate,selectedHotel}){

    const [salesData, setSalesData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchData = async () => {
        if (!startDate || !endDate) return;  
        try {
            const response = await axios.get("http://localhost:4000/api/book/room-wise-sales", {
                params: { hotelid: selectedHotel, startDate, endDate }
            });
            if (response.data.success) {
                setSalesData(response.data.salesReport);
            }
        } catch (error) {
            console.error("Error fetching sales report:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, selectedHotel]);
    

    return <>
            <h4 className="pb-3">Roomwise and Datewise Reports</h4>

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
            <th className="border-top-0 fw-semibold text-black">Room Type</th>
            <th className="border-top-0 fw-semibold text-black">Total Rooms Booked</th>
            <th className="border-top-0 fw-semibold text-black">Total Revenue</th>
        </tr>
    </thead>
    <tbody className="text-center">
        {salesData.length > 0 ? (
            <>
                {salesData.map((room, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{room._id}</td>
                        <td>{room.totalBookings}</td>
                        <td>₹ {room.totalRevenue.toFixed(2)}</td>
                    </tr>
                ))}
                {/* Sum Row */}
                <tr className="fw-bold">
                    <td colSpan="2" className="text-end">Total:</td>
                    <td>
                        {salesData.reduce((sum, room) => sum + room.totalBookings, 0)}
                    </td>
                    <td>₹ {salesData.reduce((sum, room) => sum + room.totalRevenue, 0).toFixed(2)}</td>
                </tr>
            </>
        ) : (
            <tr>
                <td colSpan="4">No data available</td>
            </tr>
        )}
    </tbody>
</table>
</div>
    </>
}