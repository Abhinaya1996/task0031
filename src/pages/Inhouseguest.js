import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Col, Row } from 'antd';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import moment from 'moment';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";

export default function Inhouseguest({selectedHotel, selectedDate}){
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const [showPriceModal, setShowPriceModal] = useState(false);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [newupdatedAmount, setnewUpdatedAmount] = useState(0);
  const [checkoutDate, setCheckoutDate] = useState(dayjs().format("DD-MM-YYYY HH:mm"));

  const [staydays, setStaydays] = useState(0);
    const [newRoomNumber, setNewRoomNumber] = useState("");
    const [bedroomTypes, setBedroomTypes] = useState([]);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [updatedpayAmount, setUpdatedpayAmount] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState("");

  const [baseRoomRent, setBaseRoomRent] = useState(0);
  const [extraValue, setExtraValue] = useState(0);
  const [extrapersoncost, setExtrapersoncost] = useState(0);
  const [discper, setDiscper] = useState(0);
  const [discvalue, setDiscvalue] = useState(0);
  const [isGstChecked, setIsGstChecked] = useState(false);
  const [gstcost, setGstcost] = useState('0.00');
  const [actroomrent, setActRoomrent] = useState(0);
  const [roomrent, setRoomrent] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(1);

    const [formData, setFormData] = useState({
        checkout: "",
        payment_Reserve: selectedBooking?.payment_Reserve || [],
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

    const handleCheckoutdate = (date, dateString) => {
        if (!date) {
            console.error("Selected date is undefined");
            return;
        }
    
        setCheckoutDate(dateString);
    
        if (selectedBooking?.checkin_Booking) {
            const checkinDate = dayjs(selectedBooking.checkin_Booking);
            const checkoutDate = dayjs(dateString, "DD-MM-YYYY HH:mm");
    
            // Calculate total hours stayed
            const totalHours = checkoutDate.diff(checkinDate, 'hour');
    
            // Convert hours to days with a minimum of 1 day
            const numberOfDays = Math.ceil(totalHours / 24) || 1;
    
            setNumberOfDays(numberOfDays);
            setActRoomrent(numberOfDays * selectedBooking.payment_Reserve[0]?.total);
        }
    };
      
    

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

    const fetchBedroomTypes = async () => {
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/room/bedtypes?hotelId=${selectedHotel}`;
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

    useEffect(() => {

    fetchBookings();
    fetchBedroomTypes();
    }, [selectedHotel,selectedDate]); 

    const handlePriceShow = (booking) => {
        setSelectedBooking(booking);
        setUpdatedAmount(booking.payment_Reserve[0]?.amountDue || 0);
        setnewUpdatedAmount(booking.payment_Reserve?.[booking.payment_Reserve.length - 1]?.amountDue || 0);
        setShowPriceModal(true);
    };

    const handleCheckoutShow = (booking) => {
        setSelectedBooking(booking);
    
        const now = dayjs(); // Get the current date & time
    
        setCheckoutDate(now.format("DD-MM-YYYY HH:mm"));
        setBaseRoomRent(booking.payment_Reserve[0]?.roomrent ?? 0);
        setExtraValue(booking.payment_Reserve[0]?.extra ?? 0);
        setExtrapersoncost(booking?.extrapersoncharge ?? 0);
        setDiscper(booking.payment_Reserve[0]?.discper ?? 0);
        setDiscvalue(booking.payment_Reserve[0]?.discamt ?? 0);
        setIsGstChecked(!!booking.payment_Reserve[0]?.gst);
        setGstcost(booking.payment_Reserve[0]?.gst ?? 0);
        setActRoomrent(booking.payment_Reserve[0]?.total ?? 0);
        setRoomrent(booking.payment_Reserve[0]?.amountDue ?? 0);

        const checkinDate = booking?.checkin_Booking ? dayjs(booking.checkin_Booking) : now;
        const checkoutDate = now;
        const numberOfDays = checkoutDate.diff(checkinDate, 'day') || 1; // Minimum 1 day stay
        setNumberOfDays(numberOfDays);
        setActRoomrent(numberOfDays*booking.payment_Reserve[0]?.total);

    
        setShowCheckoutModal(true);
    };    

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
            if (!bookingId || !checkoutDate) {
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
                checkout: checkoutDate,
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
    const handlePaymentmodeChange = (event) => {

    }

    const handleExtraChange = (e) => {
        const extvalue = e.target.value;

        setExtraValue(extvalue);
      };   

    const handleDiscChange = (e) => {
        const discPercentage = parseFloat(e.target.value) || 0;
        const discDecimal = Number(discPercentage) / 100;

        let newRoomRent_woDisc = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue))));
        const discamount = Math.round(Number(newRoomRent_woDisc)*Number(discDecimal));

        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discamount)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discamount)) * 0.12);
        setDiscvalue(discamount);
        setGstcost(calsgst);

        if (isGstChecked) {
          newRoomRent = Number(newRoomRent)+Number(calsgst);
        }
        
        setActRoomrent(newRoomRent);
        setRoomrent(newRoomRent);

      };

      const handleGstChange = (event) => {
        
    };

        const handleShiftRoom = async (bookingNum) => {
            // if (!newRoomNumber) {
            // alert("Please enter a new room number.");
            // return;
            // }
            // try {
            
            // const url = `${process.env.REACT_APP_API_BASE_URL}/api/book/shift-room`;
            // const headers = {
            //     Authorization: localStorage.getItem('token'),
            //     'Content-Type': 'application/json',
            // };

            // const requestData = {
            //     oldBookingId: bookingNum,
            //     newRoomNumber: newRoomNumber,
            // };

            // const response = await axios.post(url, requestData, { headers });

            // if (response?.data?.success) {
            //     alert("Room shifted successfully!");
            // } else {
            //     alert(response?.data?.message || "Checkout failed. Please try again.");
            // }

            // } catch (error) {
            // console.error("Error shifting room:", error);
            // alert("Error shifting room: " + error.response?.data?.message);
            // }
        };

        const handleRoomChange = (e) => {
            
        }
        
            const columns = [
                { name: "S.No", selector: (row, index) => index + 1, sortable: true },
                { name: "B.No", selector: (row) => row.bookingNo, sortable: true },
                { name: "Name", selector: (row) => row.personName || "N/A", sortable: true },
                { name: "Room No", selector: (row) => row.roomNumbers, sortable: true },
                { 
                    name: "Check In", 
                    selector: (row) => new Date(row.checkin_Reserve).toLocaleDateString(), 
                    sortable: true 
                },
                { 
                    name: "Check Out", 
                    selector: (row) => row.checkout ? new Date(row.checkout).toLocaleDateString() : "-", 
                    sortable: true 
                },
                { 
                    name: "Total", 
                    selector: (row) => {
                        const checkinDate = new Date(row.checkin_Reserve);
                        const checkoutDate = row.checkout ? new Date(row.checkout) : new Date();
                        const numDays = Math.max(1, Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)));
                        const perDayCharge = Number(row.payment_Reserve[0]?.total || 0);
                        return 'INR ' + numDays * perDayCharge + '/-';
                    }, 
                    sortable: true 
                },
                { 
                    name: "Advance", 
                    selector: (row) => row.checkout ? row.payment_Reserve.amountPaid : "-", 
                    sortable: true 
                },
                { 
                    name: "Outstanding", 
                    selector: (row) => {
                        const checkinDate = new Date(row.checkin_Reserve);
                        const checkoutDate = row.checkout ? new Date(row.checkout) : new Date();
                        const numDays = Math.max(1, Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)));
                        const perDayCharge = Number(row.payment_Reserve[0]?.total || 0);
                        const expectedTotal = numDays * perDayCharge;
        
                        const totalPaidFromReserve = row.payment_Reserve?.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0) || 0;
                        const amountPaidFromBooking = row.payment_Booking?.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0) || 0;
                        const totalAmountPaid = totalPaidFromReserve + amountPaidFromBooking;
        
                        return 'INR ' + expectedTotal - totalAmountPaid + '/-';
                    },
                    sortable: true,
                    cell: (row) => {
                        const checkinDate = new Date(row.checkin_Reserve);
                        const checkoutDate = row.checkout ? new Date(row.checkout) : new Date();
                        const numDays = Math.max(1, Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)));
                        const perDayCharge = Number(row.payment_Reserve[0]?.total || 0);
                        const expectedTotal = numDays * perDayCharge;
        
                        const totalPaidFromReserve = row.payment_Reserve?.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0) || 0;
                        const amountPaidFromBooking = row.payment_Booking?.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0) || 0;
                        const totalAmountPaid = totalPaidFromReserve + amountPaidFromBooking;
        
                        const outstanding = expectedTotal - totalAmountPaid;
        
                        return (
                            <span style={{ color: outstanding < 0 ? 'green' : 'red', fontWeight: '800' }}>
                                {'INR ' +outstanding + '/-'}
                            </span>
                        );
                    }
                },
                { 
                    name: "Reg. Card", 
                    cell: (row) => (
                        <button style={{padding:'8px'}}
                            className={row.checkOutStatus ? "btn btn-danger rounded-pill" : "btn btn-primary rounded-pill"}
                            onClick={() => handleShow(row)}
                        >
                            {row.checkOutStatus ? "Completed" : "View"}
                        </button>
                    )
                },
                { 
                    name: "Payment", 
                    cell: (row) => (
                        <button className="btn btn-warning rounded-pill" style={{padding:'8px'}} onClick={() => handlePriceShow(row)}>
                            Update
                        </button>
                    ) 
                },
                { 
                    name: "Update", 
                    cell: (row) => (
                        <button className="btn btn-danger rounded-pill" style={{padding:'8px'}} onClick={() => handleCheckoutShow(row)}>
                            Checkout
                        </button>
                    ) 
                }
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
                                    <h4 className="pb-3">Today Check Out</h4>
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
                                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Customer Name :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.personName}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Address :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={17} lg={17} xl={17}>
                                                        <p>{selectedBooking.address}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Check In Date :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
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
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Checkout Date :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
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
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Room Type :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.bedType}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>AC / Non AC :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.roomType}</p>
                                                        </Col>
                                                    </Row>

                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                                                    <Row>
                                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Email Address :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.email}</p>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Mobile Number :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.mobile}</p>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                    </Row>


                                                    <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Room Number :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>{selectedBooking.roomNumbers}</p>
                                                        </Col>
                                                    </Row>
                                                    {/* <hr/> */}
                                                    {/* <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Bed type :</b></p>
                                                        </Col>
                                                        <Col className="pe-2" xs={24} sm={24} md={14} lg={14} xl={14}>
                                                        <select className="form-select" name="bedType" onChange={handleRoomChange} value={formData.bedType} id="example-select">
                                                            <option>Select Option</option>
                                                            {bedroomTypes.map((room, index) => (
                                                                <option key={index} value={room.type}>
                                                                    {room.type}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        </Col>
                                                    </Row> */}

                                                    {/* <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Shifting to :</b></p>
                                                        </Col>
                                                        <Col className="pe-2" xs={24} sm={24} md={14} lg={14} xl={14}>
                                                        <p><input type='text' className='form-control' placeholder="Enter new room number" value={newRoomNumber} onChange={(e) => setNewRoomNumber(e.target.value)}/></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <Button className='btn btn-primary rounded-pill' onClick={() => {handleShiftRoom(selectedBooking.bookingNo)}}>Shift Now</Button>
                                                        </Col>
                                                    </Row> */}


                                                    {/* <Row>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <p><b className='text-danger'>Shifted Room Rent :</b></p>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                        <p>-</p>
                                                        </Col>
                                                    </Row> */}

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
                                                            <p><b className='text-danger'>Room Rent </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Reserve[0]?.total}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Extra Pax </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking?.extrapersoncharge}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>Discount </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Reserve[0]?.discamt}</p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p><b className='text-danger'>GST(12%) </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <p>{selectedBooking.payment_Reserve[0]?.gst}</p>
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
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            {selectedBooking.payment_Booking[0]?.amountPaid > 0 && (
                                                                <p>
                                                                    <b className="text-primary">
                                                                    {selectedBooking.payment_Booking[0]?.amountPaid}
                                                                    </b>
                                                                    {` advance paid on ${new Date(selectedBooking.addedAt).toLocaleString('en-US', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                    hour12: true,
                                                                    })} via ${selectedBooking.payment_Booking[0]?.paymentType}`}
                                                                </p>
                                                                )}
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
                                                                          
                                                                            : <span>No payments made yet</span>}
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        ))}


                                                    </Col>
                                                    {/* <Col xs={24} sm={24} md={9} lg={9} xl={9}>
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
                                                    </Col> */}
                                                </Row>
                                                </>
                                            )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                            {/* <Button className='btn btn-warning rounded-pill' onClick={() => handleMail(selectedBooking.bookingNo)}>
                                                Send Copy
                                            </Button> */}
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
                                                        <p>Outstanding :</p>
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
                                                        <p>Room Rent :</p>
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
                                                            Update Payment
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
                                                    <Col xs={24} sm={24} md={5} lg={5} xl={5} className='pe-2'>
                                                        <input
                                                            type="text"
                                                            value={new Date(selectedBooking?.checkin_Booking).toLocaleString()}
                                                            readOnly
                                                            className="form-control"
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <p>Checkout date  :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className='pe-2'>
                                                        <DatePicker
                                                            showTime={{ use12Hours: false, minuteStep: 15 }}
                                                            format="DD-MM-YYYY HH:mm"
                                                            placeholder="Select Date & Time"
                                                            value={checkoutDate ? dayjs(checkoutDate, "DD-MM-YYYY HH:mm") : null}
                                                            onChange={handleCheckoutdate}
                                                            className="form-control"
                                                            getPopupContainer={(trigger) => trigger.parentNode}
                                                        />
                                                    </Col>

                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}><p>No of Days  :</p></Col>
                                                    <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                                                    <input type='text' className='form-control' value={numberOfDays}/>
                                                    </Col>

                                                    
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><b className='text-black'>Extra :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                            <p><input type="text" readOnly value={extraValue} onChange={handleExtraChange} className="form-control mt-2" placeholder="00.00" autoComplete="off"/></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><b className='text-black'>Disc% ({discvalue}):</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                            <p><input type="text" name="discper" value={discper} onChange={handleDiscChange} className="form-control mt-2" placeholder="00.00" autoComplete="off"/></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><b className='text-black'>GST :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                            <p><input className="form-check-input" style={{verticalAlign:'middle', marginTop: '-8px', marginRight:'5px'}} checked={isGstChecked} onChange={handleGstChange} type="checkbox" value="" id="flexCheckDefault"/>
                                                            <label className="form-check-label" htmlFor="flexCheckDefault"><p className="fs-18 fw-bold text-warning pt-3">Add GST ({gstcost})</p></label></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><b className='text-black'>Payment :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                                                            <p><input type='text' className='form-control'/></p>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><b className='text-black'>Mode of Payment :</b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
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
                                                                    <div className="form-check disabled">
                                                                        <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios3" value="Baash"/>
                                                                        <label className="form-check-label" htmlFor="gridRadios3">
                                                                            BAASH
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <Row>
                                                        <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>Room Rent : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {Number(baseRoomRent)+Number(extraValue)}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>Extra Pax : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {extrapersoncost}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>Discount: </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {discvalue}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>Taxable Amount : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {actroomrent}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>GST : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {isGstChecked ? gstcost : 0.00}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>Payable Amount : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {actroomrent}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                                <p><b className='text-black'>Balance : </b></p>
                                                            </Col>
                                                            <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                            <p><b className='text-black'>INR {roomrent}/- </b></p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                                                        <button type="button" className="btn btn-danger rounded-pill" onClick={() => handleCheckout(selectedBooking?.bookingNo)}>
                                                            Checkout
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button className='btn btn-warning rounded-pill'>
                                                Send Invoice
                                            </Button>
                                            <Button className='btn btn-warning rounded-pill'>
                                                Print Invoice
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
