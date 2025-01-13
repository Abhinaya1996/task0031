import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { useAuth } from '../context/AuthContext';

export default function Booking({selectedHotel}){

    const { loggedInUser } = useAuth();

    const [bookings, setBookings] = useState([]);
   

    const fetchBookings = async () => {
        try {
            const url = `http://localhost:4000/api/book/hotel-bookings?hotelid=${selectedHotel}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            setBookings(response.data.bookings); 
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
        };

        

    useEffect(() => {

        if (selectedHotel) {
            fetchBookings();
        }
    }, [selectedHotel]); 

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
                                                        <th className="border-top-0 fw-semibold text-black">Bk.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room Type</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check In</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Amount Paid</th>
                                                        <th className="border-top-0 fw-semibold text-black">Due Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='text-center'>
                                                    {bookings.map((booking) => (
                                                    <tr key={booking.bookingNo}>
                                                        <td>{booking.bookingNo}</td>
                                                        <td>{booking.personName || 'N/A'}</td>
                                                        <td>
                                                            {booking.roomType || 'NA'}
                                                        </td>
                                                        <td>{new Date(booking.checkin_Booking).toLocaleDateString()}</td>
                                                        <td>{booking.payment_Booking[0]?.total || '0'}</td>
                                                        <td className='text-success fw-bold'>{booking.payment_Booking[0]?.amountPaid || '0'}</td>
                                                        <td className='text-danger fw-bolder'>{booking.payment_Booking[0]?.amountDue || '0'}</td>
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