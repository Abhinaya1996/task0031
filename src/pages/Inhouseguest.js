import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Col, Row } from 'antd';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import moment from 'moment';

export default function Inhouseguest({selectedHotel, selectedDate}){
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const [showPriceModal, setShowPriceModal] = useState(false);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [newupdatedAmount, setnewUpdatedAmount] = useState(0);
  const [checkoutdate, setCheckoutdate] = useState("");
    const [checkouttime, setCheckouttime] = useState("");
    const [checkout_ud, setCheckout_ud] = useState("AM");
    const [checkoutdatetime, setCheckoutdatetime] = useState("");

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [updatedpayAmount, setUpdatedpayAmount] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [formData, setFormData] = useState({
        payment_Reserve: selectedBooking?.payment_Reserve || []
    });

  const navigate = useNavigate();

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

    const handleCheckoutdate = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
    
        if (inputName === "checkoutdate") {
            setCheckoutdate(inputValue);
        } else if (inputName === "checkouttime") {
            setCheckouttime(inputValue);
        } else if (inputName === "checkout_ud") {
            setCheckout_ud(inputValue);
        }
    
        const combinedDatetime_out = `${inputName === "checkoutdate" ? inputValue : checkoutdate} ${inputName === "checkouttime" ? inputValue : checkouttime} ${checkout_ud}`;
        const formattedDate_out = moment(combinedDatetime_out, 'DD-MM-YYYY HH:mm A').format('YYYY-MM-DDTHH:mm:ss.sssZ');
        console.log(formattedDate_out);
        setCheckoutdatetime(formattedDate_out);
    }

    const fetchBookings = async () => {
        try {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/inhousebookings?hotelid=${selectedHotel}&selectedDate=${formattedDate}`;
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

    const handlePriceChange = (e) => {
        let enteredValue = e.target.value === "" ? 0 : parseFloat(e.target.value) || 0;
    
        const currentAmountDue = selectedBooking?.payment_Reserve[0]?.amountDue || 0;
        const newAmountDue = currentAmountDue - enteredValue;
    
        setUpdatedAmount(enteredValue);
        setnewUpdatedAmount(newAmountDue);
    };

    useEffect(() => {

    fetchBookings();
    }, [selectedHotel,selectedDate]); 

    const handlePriceShow = (booking) => {
        setSelectedBooking(booking);
        setUpdatedAmount(booking.payment_Reserve[0]?.amountDue || 0);
        setnewUpdatedAmount(booking.payment_Reserve?.[booking.payment_Reserve.length - 1]?.amountDue || 0);
        setShowPriceModal(true);
    };

    const handleCheckoutShow = (booking) => {
        setSelectedBooking(booking);
        setUpdatedAmount(booking.payment_Reserve[0]?.amountDue || 0);
        setnewUpdatedAmount(booking.payment_Reserve[0]?.amountDue || 0);

        const dateObj = new Date();  // Get the current date and time

        const formattedDate = dateObj.toLocaleDateString("en-GB"); // Format date as DD-MM-YYYY
        const formattedTime = (() => {
            let hours = dateObj.getHours();
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");
            hours = hours % 12 || 12;  // Convert hours to 12-hour format
            return `${String(hours).padStart(2, "0")}:${minutes}`;
        })();

        const period = dateObj.getHours() >= 12 ? "PM" : "AM";

        setCheckoutdate(formattedDate);
        setCheckouttime(formattedTime);
        setCheckout_ud(period);
        setCheckoutdatetime(dateObj); 

        setShowCheckoutModal(true);
    }

  const handleShow = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClose2 = () => {
    setShowPriceModal(false);
  };

  const handleClose3 = () => {
    setShowCheckoutModal(false);
  };

    const handlePriceUpdate = async() => {
        if (updatedAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const newPaymentEntry = {
            discper: 0, 
            discamt: 0, 
            addons: 0, 
            total: selectedBooking?.payment_Reserve[0]?.total || 0,
            amountPaid: updatedAmount,
            amountDue: newupdatedAmount,
            paymentType: "",
            payedon: new Date().toISOString()
        };
        
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/update-booking-reserve`;
            const headers = {
                'Authorization': localStorage.getItem('token')
            };
            const response = await axios.put(url,{
                bookingNo: selectedBooking?.bookingNo,
                newPaymentEntry,
            }, { headers });
    
            const data = response.data;

            if (response.status === 200) { // Check status code for success
                alert("Price updated successfully!");

                setShowPriceModal(false);
                setUpdatedAmount(0);
                setnewUpdatedAmount(0);
            } else {
                alert("Failed to update price: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error updating price:", error);
            alert("Something went wrong, please try again.");
        }

    };


  const handleMail = async(bookingId) => {
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/send-mail`;
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

  const handleCheckout = async (bookingId) => {
    try {
        if (!bookingId || !checkoutdatetime) {
            alert("Booking ID and checkout date are required.");
            return;
        }

        const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/checkout`;
        const headers = {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        };

        const requestData = {
            bookingNo: bookingId,
            checkout: checkoutdatetime,
        };

        const response = await axios.post(url, requestData, { headers });

        if (response?.data?.success) {
            alert("Checkout successful!");
            navigate('/guesthistory');
        } else {
            alert(response?.data?.message || "Checkout failed. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting booking:", error);

        const errorMessage =
            error.response?.data?.message || "An unexpected error occurred. Please try again.";
        alert(errorMessage);
    }
};



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
                                                        <th className="border-top-0 fw-semibold text-black">S.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">B.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check In</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check Out</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total</th>
                                                        <th className="border-top-0 fw-semibold text-black">Outstanding</th>
                                                        <th className="border-top-0 fw-semibold text-black">Status</th>
                                                        <th className="border-top-0 fw-semibold text-black">Pricing</th>
                                                        <th className="border-top-0 fw-semibold text-black">Action</th>
                                                        {/* <th className="border-top-0 fw-semibold text-black">-</th> */}
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {bookings.map((booking,index) => (
                                                    <tr key={booking.bookingNo}>
                                                        <td>{index+1}</td>
                                                        <td>{booking.bookingNo}</td>
                                                        <td>{booking.personName || 'N/A'}</td>
                                                        <td>{booking.roomNumbers}</td>
                                                        <td>{new Date(booking.checkin_Booking).toLocaleDateString()}</td>
                                                        <td>{booking.checkout ? new Date(booking.checkout).toLocaleDateString() : '-'}</td>
                                                        <td>{booking.payment_Reserve[0]?.total || '0'}</td>
                                                        <td>{booking.payment_Reserve[0]?.amountDue || '0'}</td>
                                                        <td onClick={() => handleShow(booking)} >
                                                            {booking.checkOutStatus ? <p className='btn btn-danger rounded-pill'>Completed</p> : <p class="btn btn-primary rounded-pill" style={{marginBottom:0}} >View Details</p>}
                                                        </td>
                                                        <td onClick={() => handlePriceShow(booking)}>
                                                            <button className='btn btn-warning rounded-pill'>Price update</button>
                                                        </td>
                                                        <td onClick={() => handleCheckoutShow(booking)}>
                                                            <button className='btn btn-danger rounded-pill'>Checkout</button>
                                                        </td>
                                                        {/* <td>
                                                            <a className="btn btn-secondary rounded-pill d-flex"
                                                                href={`http://localhost:3000/reservation?bk=${booking._id}`}
                                                                type="submit">
                                                                Edit
                                                            </a>
                                                        </td> */}
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
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
                                                            <p>{selectedBooking.payment_Reserve[0]?.total}</p>
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
                                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>Payment History :</b></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-primary'>{selectedBooking.payment_Booking[0]?.amountPaid}</b>{` paid on ${new Date(selectedBooking.addedAt).toLocaleString()}`}</p>
                                                            </Col>
                                                        </Row>

                                                        {selectedBooking?.payment_Reserve?.map((payment, index) => (
                                                            <Row key={index}>
                                                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                                    <p>
                                                                        {payment.amountPaid > 0 
                                                                            ? <>
                                                                            <b className='text-primary'>{payment.amountPaid}</b> 
                                                                            {payment.payedon ? ` paid on ${new Date(payment.payedon).toLocaleString()}` : " "}
                                                                          </>
                                                                          
                                                                            : <span>No payment made yet</span>}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        ))}


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
                                                            <p>{selectedBooking.payment_Reserve?.[selectedBooking.payment_Reserve.length - 1]?.amountDue || 'N/A'}</p>
                                                            </Col>
                                                        </Row>
                                                        <hr/>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Paid Amount :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b>{selectedBooking.payment_Booking[0]?.amountPaid + selectedBooking.payment_Reserve[0]?.amountPaid}</b></p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                </>
                                            )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button className='btn btn-warning rounded-pill' onClick={() => handleMail(selectedBooking.bookingNo)}>
                                                Send Copy
                                            </Button>
                                            <Button className='btn btn-warning rounded-pill' onClick={handleClose}>
                                                Print Reciept
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal size="lg" show={showPriceModal} onHide={handleClose2} backdrop="static">
                                            <Modal.Header closeButton>
                                            <Modal.Title>Payment</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form>
                                                <Row className='mb-3'>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Amount Due :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <input
                                                            type="text"
                                                            value={newupdatedAmount}
                                                            readOnly
                                                            className="form-control"
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}></Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Total Amount :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <input
                                                            type="number"
                                                            value={selectedBooking?.payment_Reserve[0]?.total || 0}
                                                            readOnly
                                                            className="form-control"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Amount :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <input
                                                            type="text"
                                                            onChange={handlePriceChange}
                                                            className="form-control"
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}></Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <button type="button" className="btn btn-primary mt-3" onClick={handlePriceUpdate}>
                                                            Update Price
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </form>
                                            </Modal.Body>
                                        </Modal>

                                        <Modal size="lg" show={showCheckoutModal} onHide={handleClose3} backdrop="static">
                                            <Modal.Header closeButton>
                                            <Modal.Title>Checkout</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <form>
                                                <Row className='mb-3'>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Checkin Date :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <input
                                                            type="text"
                                                            value={new Date(selectedBooking?.checkin_Booking).toLocaleDateString()}
                                                            readOnly
                                                            className="form-control"
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}></Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Checkout date  :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2">
                                                                <InputMask
                                                                    mask="99-99-9999"
                                                                    placeholder="DD-MM-YYYY"
                                                                    name="checkoutdate"
                                                                    onChange={(e) => handleCheckoutdate(e)}
                                                                    className="form-control"
                                                                    value={checkoutdate || ""}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2">
                                                                <InputMask
                                                                    mask="99:99"
                                                                    placeholder="HH:MM"
                                                                    className="form-control"
                                                                    name="checkouttime"
                                                                    onChange={(e) => handleCheckoutdate(e)}
                                                                    value={checkouttime || ""}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2">
                                                                <select
                                                                    className="form-select"
                                                                    id="example-select"
                                                                    name="checkout_ud"
                                                                    onChange={(e) => handleCheckoutdate(e)}
                                                                    value={checkout_ud || "AM"}
                                                                >
                                                                    <option>AM</option>
                                                                    <option>PM</option>
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <button type="button" className="btn btn-danger rounded-pill" onClick={() => handleCheckout(selectedBooking?.bookingNo)}>
                                                            Checkout
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </form>
                                            </Modal.Body>
                                        </Modal>
                                </div>
                            </div>
                        </div>
                        

                    </div> 
                </div> 

            </div>
    </>
}
