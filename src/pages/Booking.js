import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import DataTable from "react-data-table-component";
const moment = require('moment');

export default function Booking({selectedHotel, selectedDate}){

    const { loggedInUser } = useAuth();
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    const handleApiError = (error) => {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('selectedHotel');
            navigate('/login');
        } else {
            console.error('Error fetching bookings:');
        }
    };
   

    const fetchBookings = async () => {
        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/hotel-bookings?hotelid=${selectedHotel}&date=${formattedDate}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            setBookings(response.data.bookings); 
        } catch (error) {
            handleApiError(error);
            console.error('Error fetching bookings:', error);
        }
    };

        

    useEffect(() => {

        if (selectedHotel) {
            fetchBookings();
        }
    }, [selectedDate, selectedHotel]); 

        const columns = [
            { name: "S.No", selector: (row, index) => index + 1, sortable: true },
            { name: "B.No", selector: (row) => row.bookingNo, sortable: true },
            { name: "Name", selector: (row) => row.personName || "N/A", sortable: true },
            { name: "Bed Type", selector: (row) => row.bedType, sortable: true },
            { 
                name: "Check In", 
                selector: (row) => new Date(row.checkin_Booking).toLocaleDateString('en-GB', { timeZone: 'UTC' }), 
                sortable: true 
            },
            { name: "Total", selector: (row) => 'INR '+ row.payment_Booking[0]?.total || "0", sortable: true },
            { 
                name: "Paid", 
                selector: (row) => row.payment_Booking[0]?.amountPaid || "0", 
                sortable: true,
                cell: (row) => <span className="text-success fw-bold">{'INR ' + row.payment_Booking[0]?.amountPaid || "0"}</span>
            },
            { 
                name: "Outstanding", 
                selector: (row) => Number(row.payment_Booking[0]?.total || 0) - Number(row.payment_Booking[0]?.amountPaid || 0), 
                sortable: true,
                cell: (row) => (
                    <span className="text-danger fw-bolder">
                        {Number(row.payment_Booking[0]?.total || 0) - Number(row.payment_Booking[0]?.amountPaid || 0)}
                    </span>
                )
            },
            { 
                name: "Action", 
                cell: (row) => (
                    <a className="btn btn-secondary rounded-pill d-flex" href={`/reservation?bk=${row._id}`} type="submit">
                        Check-In
                    </a>
                ) 
            },
            { 
                name: "Edit", 
                cell: (row) => (
                    <a className="btn btn-secondary rounded-pill d-flex" href={`/new-booking?bookingId=${row._id}`} type="submit">
                        Edit
                    </a>
                ) 
            },
                { 
                name: "Edit", 
                cell: (row) => (
                    <a className="btn btn-danger rounded-pill d-flex">
                        Cancel
                    </a>
                ) 
            },
            { 
                name: "Edit", 
                cell: (row) => (
                    <a className="btn btn-primary rounded-pill d-flex" >
                        No Show
                    </a>
                ) 
            },
        ];
        const customStyles = {
            headCells: {
                style: {
                    fontSize: '16px', // Increase header font size
                    fontWeight: 'bold',
                    backgroundColor: '#f8f9fa', // Light background for headers
                    color: '#000',
                },
            },
            cells: {
                style: {
                    fontSize: '14px', // Increase cell font size
                    padding: '10px',  // Add padding for better spacing
                },
            },
        };

    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h4 className="pb-3">Bookings</h4>
                                        <div className="table-responsive">
                                        <DataTable
                                            columns={columns}
                                            data={bookings}
                                            pagination
                                            paginationPerPage={25}  // Show 25 rows per page
                                            paginationRowsPerPageOptions={[25, 50, 100]} // Allow users to choose 25, 50, or 100 rows per page
                                            highlightOnHover
                                            responsive
                                            customStyles={customStyles} 
                                        />
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>
    </>
}
