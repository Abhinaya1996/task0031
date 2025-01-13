import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Col, Row } from 'antd';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';

export default function Inhouseguest({selectedHotel}){
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = async () => {
        try {
            const url = `http://localhost:4000/api/book/inhousebookings?hotelid=${selectedHotel}`;
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

    fetchBookings();
    }, [selectedHotel]); 

  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleMail = async(bookingId) => {
        try {
            const url = "http://localhost:4000/api/book/send-mail";
            const headers = {
                'Authorization': localStorage.getItem('token')
            };
            const response = await axios.post(url,{
                bookingNo: bookingId,
            }, { headers });
            
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("An error occurred");
        }
  }


    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h4 className="pb-3">Today Check Out</h4>
                                        <div className="table-responsive">
                                            <table className="table table-traffic mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="border-top-0 fw-semibold text-black">Bk.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room Type</th>
                                                        <th className="border-top-0 fw-semibold text-black">C-Form</th>
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
                                                        <td>{booking.roomType || 'N/A'}</td>
                                                        <td>{new Date(booking.checkin_Booking).toLocaleDateString()}</td>
                                                        <td>{new Date(booking.checkout).toLocaleDateString()}</td>
                                                        <td>{booking.payment_Booking[0]?.amountPaid || '0'}</td>
                                                        <td>{booking.payment_Booking[0]?.amountDue || '0'}</td>
                                                        <td onClick={() => handleShow(booking)} >
                                                            {booking.checkOutStatus ? <p className='text-primary'>Completed</p> : <p class="text-primary">Checked In</p>}
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
                                            <Modal.Header closeButton>
                                            <Modal.Title>Booking Details</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                
                                            {selectedBooking && (
                                                <>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Customer Name :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.personName}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Address :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.address}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Check In Date :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{new Date(selectedBooking.checkin_Booking).toLocaleString("en-US", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true, // Ensures AM/PM format
                                                            })}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Checkout Date :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{new Date(selectedBooking.checkout).toLocaleString("en-US", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Room Type :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.bedType}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>AC / Non AC :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.roomType}</p>
                                                        </Col>
                                                    </Row>

                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Email Address :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.email}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Mobile Number :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.mobile}</p>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Shifting Room :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>-</p>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Room Number :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>{selectedBooking.roomNumbers}</p>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p><b className='text-danger'>Shifted Room Rent :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <p>-</p>
                                                        </Col>
                                                    </Row>

                                                    </Col>
                                                </Row>
                                                <hr/>

                                                <Row>
                                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>Payment Details :</b></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Total Room Rent </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Booking[0]?.roomrent}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>GST </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Booking[0]?.gst}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Payment Method</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Booking[0]?.paymentType}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>Payment History :</b></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>00.00</b></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>00.00</b></p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Paid Advance Amount :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Booking[0]?.amountPaid}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Due Amount :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Booking[0]?.amountDue}</p>
                                                            </Col>
                                                        </Row>
                                                        <hr/>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Paid Amount :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b>00.00</b></p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                </>
                                            )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button className='btn btn-warning rounded-pill' onClick={handleClose}>
                                                Send Copy
                                            </Button>
                                            <Button className='btn btn-warning rounded-pill' onClick={() => handleMail(selectedBooking.bookingNo)}>
                                                Print Reciept
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                </div>
                            </div>
                        </div>
                        

                    </div> 
                </div> 

            </div>
    </>
}