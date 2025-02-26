import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
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

    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h4 className="pb-3">Bookings</h4>
                                <div className="table-responsive">
                                            <table className="table table-traffic mb-0">
                                                <thead className='text-center'>
                                                    <tr>
                                                        <th className="border-top-0 fw-semibold text-black">B.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Bed Type</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check In</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Amount Paid</th>
                                                        <th className="border-top-0 fw-semibold text-black">Outstanding</th>
                                                        <th className="border-top-0 fw-semibold text-black">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='text-center'>
                                                    {bookings.map((booking) => (
                                                    <tr key={booking.bookingNo}>
                                                        <td>{booking.bookingNo}</td>
                                                        <td>{booking.personName || 'N/A'}</td>
                                                        <td>{booking.bedType}</td>
                                                        <td>{new Date(booking.checkin_Booking).toLocaleDateString('en-GB', {timeZone: 'UTC'})}</td>
                                                        <td>{booking.payment_Booking[0]?.total || '0'}</td>
                                                        <td className='text-success fw-bold'>{booking.payment_Booking[0]?.amountPaid || '0'}</td>
                                                        <td className='text-danger fw-bolder'>{Number(booking.payment_Booking[0]?.total || 0)-Number(booking.payment_Booking[0]?.amountPaid || 0)}</td>
                                                        <td>
                                                            <a className="btn btn-secondary rounded-pill d-flex"
                                                                href={`${`/reservation?bk=${booking._id}`}`}
                                                                type="submit">
                                                                Check-In
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>
    </>
}
