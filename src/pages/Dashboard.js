import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import '../assets/css/responsive.css';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

export default function Dashboard({selectedDate,selectedHotel}){

    const { loggedInUser } = useAuth();
    const navigate = useNavigate();
    const [checkInCount, setCheckInCount] = useState(0);
    const [checkOutCount, setCheckOutCount] = useState(0);
    const [roomAvailability, setRoomAvailability] = useState({
        availableRoomsCount: 0,
        bookedRoomsCount: 0,
      });

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const date = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/bookings?selectedDate=${date.toISOString()}&hotelid=${selectedHotel}`;
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

    const fetchLogCounts = async () => {
        try {
            const date = selectedDate instanceof Date ? selectedDate : new Date(selectedDate); // Ensure it's a Date object
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/todaysdata?selectedDate=${date.toISOString()}&hotelid=${selectedHotel}`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            };
    
            const response = await axios.get(url, headers);
            const { checkInCount, checkOutCount } = response.data;
    
            setCheckInCount(checkInCount);
            setCheckOutCount(checkOutCount);
        } catch (error) {
            console.error('Error fetching log counts:', error);
        }
    };

    const fetchRoomAvailability = async () => {
        try {
            const date = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/room-availability?hotelid=${selectedHotel}&selectedDate=${date.toISOString()}`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            };
    
            const response = await axios.get(url, headers);
            setRoomAvailability(response.data);
        } catch (error) {
            console.error('Error fetching room availability:', error);
        }
    };
      
         

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

    useEffect(() => {

    if (selectedHotel) {
        fetchBookings();
    }

    if (selectedDate) {
        fetchLogCounts();
        fetchRoomAvailability();
    }
    }, [selectedDate,selectedHotel]); 

    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h2>Overview</h2>
                                <div className="row pt-2">
                                    <div className="col-md-6 col-xl-3">
                                        <div className="card">
                                            <div className="card-body" style={{backgroundColor:'#96d172',borderRadius:'20px'}}>
                                                <div className="widget-first">
                                                    <div className="d-flex justify-content-between align-items-end pb-5">
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">    
                                                                <p className="mb-0 text-white fs-15">Today's Check in</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div id="new-orders" className="apex-charts"></div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                    <p className="text-muted mb-0 fs-13 d-flex justify-content-between" style={{ margin: 0, alignItems: 'flex-end' }}>
                                                        <span className="text-white fs-14" style={{fontSize: '14px',lineHeight: '1',}}>View Booking Status</span>
                                                        <span className="text-white" style={{fontSize: '80px',lineHeight: '1', fontWeight:'100'}}>{checkInCount}</span>
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-xl-3">
                                        <div className="card">
                                            <div className="card-body" style={{backgroundColor:'#e75656',borderRadius:'20px'}}>
                                                <div className="widget-first">
                                                    <div className="d-flex justify-content-between align-items-end pb-5">
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">    
                                                                <p className="mb-0 text-white fs-15">Today's Check out</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div id="new-orders" className="apex-charts"></div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                    <p className="text-muted mb-0 fs-13 d-flex justify-content-between" style={{ margin: 0, alignItems: 'flex-end' }}>
                                                        <span className="text-white fs-14" style={{fontSize: '14px',lineHeight: '1',}}>View Booking Status</span>
                                                        <span className="text-white" style={{fontSize: '80px',lineHeight: '1', fontWeight:'100'}}>{checkOutCount}</span>
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-xl-3">
                                        <div className="card">
                                            <div className="card-body" style={{backgroundColor:'#47b0eb',borderRadius:'20px'}}>
                                                <div className="widget-first">
                                                    <div className="d-flex justify-content-between align-items-end pb-5">
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">    
                                                                <p className="mb-0 text-white fs-15">Room's Available</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div id="new-orders" className="apex-charts"></div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                    <p className="text-muted mb-0 fs-13 d-flex justify-content-between" style={{ margin: 0, alignItems: 'flex-end' }}>
                                                        <span className="text-white fs-14" style={{fontSize: '14px',lineHeight: '1',}}>View Booking Status</span>
                                                        <span className="text-white" style={{fontSize: '80px',lineHeight: '1', fontWeight:'100'}}>{roomAvailability.availableRoomsCount}</span>
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-xl-3">
                                        <div className="card">
                                            <div className="card-body" style={{backgroundColor:'#e4a74c',borderRadius:'20px'}}>
                                                <div className="widget-first">
                                                    <div className="d-flex justify-content-between align-items-end pb-5">
                                                        <div>
                                                            <div className="d-flex align-items-center mb-3">    
                                                                <p className="mb-0 text-white fs-15">Room's Reserved</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div id="new-orders" className="apex-charts"></div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                    <p className="text-muted mb-0 fs-13 d-flex justify-content-between" style={{ margin: 0, alignItems: 'flex-end' }}>
                                                        <span className="text-white fs-14" style={{fontSize: '14px',lineHeight: '1',}}>View Booking Status</span>
                                                        <span className="text-white" style={{fontSize: '80px',lineHeight: '1', fontWeight:'100'}}>{roomAvailability.bookedRoomsCount}</span>
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h4 className="pb-3">Guest List</h4>
                                <div className="table-responsive">
                                            <table className="table table-traffic mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="border-top-0 fw-semibold text-black">Bk.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check In</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check Out</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Due Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bookings.map((booking) => (
                                                    <tr key={booking.bookingNo}>
                                                        <td>{booking.bookingNo}</td>
                                                        <td>{booking.personName || 'N/A'}</td>
                                                        <td>{booking.roomNumbers}</td>
                                                        <td>{new Date(booking.checkin_Booking).toLocaleDateString()}</td>
                                                        <td>{booking.checkout ? new Date(booking.checkout).toLocaleDateString() : '-'}</td>
                                                        <td>{booking.payment_Booking[0]?.total || '0'}</td>
                                                        <td>{booking.payment_Booking[0]?.amountDue || '0'}</td>
                                                        <td>
                                                            {booking.checkInStatus && !booking.checkOutStatus ? (
                                                                <Badge bg="primary">Checked In</Badge>
                                                            ) : !booking.checkInStatus && booking.checkOutStatus ? (
                                                                <Badge bg="danger">Checked Out</Badge>
                                                            ) : (
                                                                <Badge bg="warning" text="white">Booked</Badge>
                                                            )}
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