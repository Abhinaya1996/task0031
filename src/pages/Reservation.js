import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { Col, Row } from 'antd';
import axios from 'axios';

export default function Reservation({selectedHotel}){


    const [bookingId, setBookingId] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const [isIndian, setIsIndian] = useState('true'); 

    const [bedroomTypes, setBedroomTypes] = useState([]);
    const [selectedBedroom, setSelectedBedroom] = useState('');
    const [checkindate, setCheckindate] = useState("");
    const [checkintime, setCheckintime] = useState("");
    const [checkin_ud, setCheckin_ud] = useState("AM");
    const [checkindatetime, setCheckindatetime] = useState("");
    const [checkoutdatetime, setCheckoutdatetime] = useState("");
    const [checkoutdate, setCheckoutdate] = useState("");
    const [checkouttime, setCheckouttime] = useState("");
    const [checkout_ud, setCheckout_ud] = useState("AM");
    const [dueAmt, setDueamt] = useState("00.00");
    const [dueaddAmt, setDueaddamt] = useState("00.00");
    const [addAmt, setAddAmt] = useState("0");
    const [newpay, setNewpay] = useState("00.00");


    const [showModal, setShowModal] = useState(false); 
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false); // Close the modal
        navigate("/inhouseguest"); // Redirect to the bookings page
    };

    const [formData, setFormData] = useState({
        nationality: "IND",
        identityType: "aadhar",
        aadharNum: "",
        guestDetails:[
            {
                name:String,
                phone:Number,
                altphone: Number
            }
        ],
        checkin_Reserve: "",
        checkout: "",
        cFormNumber: "",
        roomNumbers: "",
        payment_Reserve: [
            {
                roomrent: 0,
                extra: 0,
                gst: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: "",
            },
        ],
        checkInStatus: true,
        reservationAt: new Date().toISOString(),
    });

    
    const handleGuestdetails = (e) => {
        const { name, value } = e.target;
        if(name == 'guestMobile'){
            setFormData((prev) => ({
                ...prev,
                guestDetails:[
                    {
                    ...prev.guestDetails[0],
                    phone: value
                    }
                ]
            }));
        }else if(name === 'guestname'){
            setFormData((prev) => ({
                ...prev,
                guestDetails:[
                    {
                    ...prev.guestDetails[0],
                    name: value
                    }
                ]
            }));
        }else {
            setFormData((prev) => ({
                ...prev,
                guestDetails:[
                    {
                    ...prev.guestDetails[0],
                    altphone: value
                    }
                ]
            }));
        }
        
    }

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            try {
                setError('');
                const url = `http://localhost:4000/api/book/single-booking?bookingNo=${bookingId}`;
                const headers = {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                };
                const response = await axios.get(url, headers);
                const bookingData = response.data.booking[0];
                setBookingDetails(response.data.booking[0]);
                setDueamt(bookingData.payment_Booking[0].amountDue);
                setDueaddamt(bookingData.payment_Booking[0].amountDue);
                
                setFormData((prevData) => ({
                    ...prevData,
                    checkin_Reserve: bookingData.checkin_Booking,
                    payment_Reserve:[
                        {
                            roomrent: bookingData.payment_Booking[0].roomrent,
                            extra: bookingData.payment_Booking[0].extra,
                            addons:addAmt,
                            gst: bookingData.payment_Booking[0].gst,
                            amountPaid: newpay,
                            amountDue: bookingData.payment_Booking[0].amountDue,
                            paymentType: '',
                        }
                    ]
                }));
            } catch (err) {
                setError('Booking not found. Please try again.');
                setBookingDetails(null);
            }
        }
    };

    const fetchBedroomTypes = async () => {
        try {
            const url = `http://localhost:4000/room/bedtypes?hotelId=${selectedHotel}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            setBedroomTypes(response.data.bedroomTypes || []);
        } catch (err) {
            console.error('Error fetching bedroom types:', err);
            setBedroomTypes([]);
        }
    };

    const handleNationality = (e) => {
        let thy = e.target.value;
        if(thy === 'IND'){
            setIsIndian(true);
            setFormData((prev) => ({
                ...prev,
                nationality: "IND",
            }));
        }else{
            setIsIndian(false);
            setFormData((prev) => ({
                ...prev,
                nationality: "NRI",
            }));
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (selectedHotel) {
            fetchBedroomTypes();
        }

        if (bookingDetails?.checkin_Booking) {
            const dateObj = new Date(bookingDetails.checkin_Booking);
            const formattedDate = dateObj.toLocaleDateString("en-GB"); // Format date as DD-MM-YYYY
            const formattedTime = (() => {
                let hours = dateObj.getHours();
                const minutes = String(dateObj.getMinutes()).padStart(2, "0");
                hours = hours % 12 || 12;
                return `${String(hours).padStart(2, "0")}:${minutes}`;
            })();
    
            const period = dateObj.getHours() >= 12 ? "PM" : "AM"; // Check AM/PM
    
            setCheckindate(formattedDate);
            setCheckintime(formattedTime);
            setCheckin_ud(period);
            setCheckindatetime(bookingDetails.checkin_Booking);
        }

    }, [selectedHotel,bookingDetails]);

    const handleCharge1 = (e) => {
        let charge1Val = e.target.value === '' ? '0' : e.target.value;
        let newCharge1 = parseFloat(charge1Val) || 0;
    
        console.log(newCharge1 + ' - ' + e.target.value);
    
        let newdue = newCharge1 + parseFloat(dueAmt || 0); // Default to 0 if dueAmt is undefined
        setDueaddamt(newdue);
        setAddAmt(charge1Val);
    
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking?.[0] || {}; // Safely access the first element or fallback to an empty object
            const updatedPaymentBooking = {
                ...paymentBooking,
                addons: charge1Val,
                amountDue: newdue,
            };
    
            return {
                ...prevData,
                payment_Reserve: [updatedPaymentBooking], // Ensure you're updating the correct array
            };
        });
    };
    

    const handleCheckindate = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
    
        if (inputName === "checkindate") {
            setCheckindate(inputValue); // Update checkindate state
        } else if (inputName === "checkintime") {
            setCheckintime(inputValue); // Update checkintime state
        } else if (inputName === "checkin_ud") {
            setCheckin_ud(inputValue); // Update checkin_ud state
        }
    
        // Combine and format the datetime
        const combinedDatetime = `${inputName === "checkindate" ? inputValue : checkindate} ${inputName === "checkintime" ? inputValue : checkintime} ${checkin_ud}`;
        const formattedDate = moment(combinedDatetime, 'DD-MM-YYYY HH:mm A').format('YYYY-MM-DDTHH:mm:ss.sssZ');
        
        setCheckindatetime(formattedDate);
        setFormData((prevData) => ({
            ...prevData,
            checkin_Reserve: formattedDate,
        }));
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
    
        const combinedDatetime = `${inputName === "checkindate" ? inputValue : checkindate} ${inputName === "checkintime" ? inputValue : checkintime} ${checkin_ud}`;
        const formattedDate = moment(combinedDatetime, 'DD-MM-YYYY HH:mm A').format('YYYY-MM-DDTHH:mm:ss.sssZ');
        
        setCheckoutdatetime(formattedDate);
        setFormData((prevData) => ({
            ...prevData,
            checkout: formattedDate,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:4000/api/book/update-booking`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            };
            const response = await axios.put(url, { bookingNo: bookingId, updatedData: formData }, headers);
            if (response.data.success) {
                setModalMessage("Booking updated successfully");
            } else {
                setModalMessage("Failed to update booking");
            }

            setShowModal(true);
        } catch (err) {
            console.error('Error updating booking:', err);
        }
    };

    const handlePay = (e) => {
        let payamt = e.target.value;
        
        // Ensure payamt is a valid number, if not set it to '0'
        payamt = payamt === '' ? '0' : payamt;  // In case of empty input, set it to '0'
        
        // Calculate balance with proper fallback for NaN values
        let balance = (parseFloat(addAmt) + parseFloat(dueAmt)) - parseFloat(payamt);
        balance = isNaN(balance) ? 0 : balance; // Ensure balance is a valid number, default to 0 if NaN
    
        setNewpay(payamt);
        console.log(balance);
    
        setFormData((prevData) => {
            // Ensure payment_Booking[0] exists
            const paymentBooking = prevData.payment_Booking && prevData.payment_Booking[0] ? prevData.payment_Booking[0] : {};
    
            const updatedPaymentBooking = {
                ...paymentBooking,
                amountPaid: payamt,
                amountDue: balance
            };
    
            return {
                ...prevData,
                payment_Reserve: [updatedPaymentBooking],
            };
        });
    };
    

    const handlePaymentmodeChange = (event) => {
        const selectedPaymentType = event.target.value; 
        console.log(selectedPaymentType);
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Reserve[0];
            const updatedPaymentBooking = {
                ...paymentBooking,
                paymentType: selectedPaymentType
            };
    
            return {
                ...prevData,
                payment_Reserve: [updatedPaymentBooking],
            };
        });
    };

    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                <input type="text" className='form-control'  style={{borderRadius:'30px', width:'70%',marginLeft: '0px', paddingLeft: '10px'}} onChange={(e) => setBookingId(e.target.value)} onKeyDown={handleSearch} placeholder='Search Here by Booking ID'/>
                                
                                <h4 className="fs-26 fw-semibold mt-3 text-ash">Customer Details</h4>
                                <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <p className="fs-18 fw-semibold text-ash pt-3">Name Details</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" value={bookingDetails?.personName || ''} placeholder="Booking Person Name" readOnly />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" value={bookingDetails?.mobile || ''} placeholder="Mobile Number" readOnly/>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" name="altMobile" onChange={handleChange} placeholder="Alternate Mobile Number" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <p className="fs-18 fw-semibold text-ash pt-3">Guest Details</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" name="guestname" onChange={handleGuestdetails} placeholder="Booking Person Name" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <input type="text" className="form-control" name="guestMobile" onChange={handleGuestdetails} placeholder="Mobile Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <input type="text" className="form-control" name="guestAltMobile" onChange={handleGuestdetails} placeholder="Alternate Mobile Number" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <p className="fs-18 fw-semibold text-ash pt-3">Address Details</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pe-2 pt-2">
                                                <input type="text" readOnly className="form-control" value={bookingDetails?.address || ''} placeholder="Type Customer Address" />
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <p className="fs-18 fw-semibold text-ash pt-3">Room Type</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select" disabled>
                                                    <option value="Non-AC" selected={bookingDetails?.roomType === 'Non-AC'}>Non-AC</option>
                                                    <option value="AC" selected={bookingDetails?.roomType === 'AC'}>AC</option>
                                                </select>
                                            </Col>

                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select" disabled>
                                                {bedroomTypes.map((room, index) => (
                                                        <option key={index} value={room.type}>
                                                            {room.type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row className="pt-4">
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Check In Detail</p>
                                        </Row>
                                        <Row>
                                        <Col xs={24} sm={24} md={15} lg={15} xl={15} className="pe-2 pt-2">
                                            <InputMask
                                                mask="99-99-9999"
                                                placeholder="DD-MM-YYYY"
                                                name="checkindate"
                                                onChange={(e) => handleCheckindate(e)}
                                                className="form-control"
                                                value={checkindate || ""}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={5} lg={5} xl={5} className="pe-2 pt-2">
                                            <InputMask
                                                mask="99:99"
                                                placeholder="HH:MM"
                                                className="form-control"
                                                name="checkintime"
                                                onChange={(e) => handleCheckindate(e)}
                                                value={checkintime || ""}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
                                            <select
                                                className="form-select"
                                                id="example-select"
                                                name="checkin_ud"
                                                onChange={(e) => handleCheckindate(e)}
                                                value={checkin_ud || "AM"}
                                            >
                                                <option>AM</option>
                                                <option>PM</option>
                                            </select>
                                        </Col>

                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Check Out Detail</p>
                                        </Row>
                                        <Row>
                                        <Col xs={24} sm={24} md={15} lg={15} xl={15} className="pe-2 pt-2">
                                            <InputMask
                                                mask="99-99-9999"
                                                placeholder="DD-MM-YYYY"
                                                name="checkoutdate"
                                                onChange={(e) => handleCheckoutdate(e)}
                                                className="form-control"
                                                value={checkoutdate || ""}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={5} lg={5} xl={5} className="pe-2 pt-2">
                                            <InputMask
                                                mask="99:99"
                                                placeholder="HH:MM"
                                                className="form-control"
                                                name="checkouttime"
                                                onChange={(e) => handleCheckoutdate(e)}
                                                value={checkouttime || ""}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
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

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Allocated Room Number</p>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" readOnly value={bookingId} placeholder="MAA053" />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                            <input type="text" className="form-control" name='roomNumbers' onChange={handleChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                </Row>

                                <Row className="pt-4">
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Nationality :</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select" onChange={handleNationality}>
                                                    <option value="IND" selected>Indian</option>
                                                    <option value="NRI">Non-Indian</option>
                                                </select>
                                            </Col>
                                            {!isIndian && (
                                                <>
                                                    <Col xs={24} sm={24} md={10} lg={10} xl={10} className="pe-2 pt-2 nriblk">
                                                        <input type="text"name='cFormNumber' onChange={handleChange} className="form-control" placeholder="325214" />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2 nriblk">
                                                        <p style={{ color: '#32c833', padding: '5px 5px' }} className="fw-semibold">Opened</p>
                                                    </Col>
                                                </>
                                            )}

                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select" name='identityType' onChange={handleChange}>
                                                    <option value="aadhar">Aadhar Card</option>
                                                    <option value="passport">Passport</option>
                                                    <option value="voterId">Voter ID</option>
                                                </select>
                                            </Col>
                                            <Col xs={24} sm={24} md={13} lg={13} xl={13} className="pe-2 pt-2">
                                                <input type="text" name='aadharNum' onChange={handleChange} className="form-control" placeholder="Type Aadhar Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className="pe-2 pt-2">
                                                {/* <input type="file" className="form-control"/> */}
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold pt-2">Additional Charges :</p>
                                        </Row>
                                        <Row>
                                            <Col xs={8} sm={8} md={19} lg={19} xl={19} className="pe-2 mob-pad-2">
                                                <input type="text" name="additionalCharge1" onChange={handleCharge1} className="form-control" placeholder="500" />
                                            </Col>
                                            {/* <Col xs={14} sm={14} md={10} lg={10} xl={10} className="pe-2 mob-pad-2">
                                                <input type="text" name="additionalCharge2" onChange={handleCharge2} className="form-control" placeholder="500" />
                                            </Col> */}
                                        </Row>

                                        <Row className="pt-2">
                                            <p className="fs-16 text-warning fw-semibold">Payment Mode :</p>
                                        </Row>

                                        <Row>
                                            <Col xs={14} sm={14} md={8} lg={8} xl={8} className="pe-2 pt-2">
                                                <div className="col-sm-11 d-flex gap-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios1" value="UPI"/>
                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                            UPI
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios2" value="Card"/>
                                                        <label className="form-check-label" htmlFor="gridRadios2">
                                                            Card
                                                        </label>
                                                    </div>
                                                    <div className="form-check disabled">
                                                        <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios3" value="Cash"/>
                                                        <label className="form-check-label" htmlFor="gridRadios3">
                                                            Cash
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                        <Row className="pt-2">
                                            <Col xs={14} sm={14} md={16} lg={16} xl={16}>
                                                <p className="fs-16 text-warning fw-semibold">Total Amount :</p>
                                            </Col>
                                            <Col xs={14} sm={14} md={8} lg={8} xl={8}>
                                            <p className="fs-16 text-dark text-end fw-semibold">{bookingDetails?.payment_Booking[0].total || '00'}/-</p>
                                            </Col>
                                        </Row>
                                        <Row className="pt-2">
                                            <Col xs={14} sm={14} md={16} lg={16} xl={16}>
                                                <p className="fs-16 text-warning fw-semibold">Due Amount :</p>
                                            </Col>
                                            <Col xs={14} sm={14} md={8} lg={8} xl={8}>
                                                <p className="fs-16 text-dark text-end fw-semibold">{dueaddAmt}/-</p>
                                            </Col>
                                        </Row>
                                        <Row className="pt-2 pb-5">
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                <p className="fs-16 text-warning fw-semibold"> Amount :</p>
                                            </Col>
                                            <Col xs={14} sm={14} md={10} lg={10} xl={10}>
                                                <input type="text" className="form-control" name='amtpaid' onChange={handlePay} placeholder="500" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="text-end">
                                                <button className="btn btn-warning d-flex" style={{float:'right', marginTop:'5%'}} type="submit"> Submit </button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                </form>
                                <Modal size="sm" centered show={showModal} style={{maxWidth: '60vh',marginRight:'auto',marginLeft:'60vh'}} onHide={handleClose} aria-labelledby="example-modal-sizes-title-sm">
                                    {/* <Modal.Header closeButton>
                                        <Modal.Title>{modalMessage}</Modal.Title>
                                    </Modal.Header> */}
                                    <Modal.Body>
                                    <Modal.Title>{modalMessage}</Modal.Title>
                                        <i className="text-danger" data-feather="mail" style={{marginLeft:'25vh', fontSize:'30px'}}></i>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='btn btn-warning rounded-pill' onClick={handleClose}>
                                            Close
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