import React, { useEffect, useState } from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { Modal, Button } from 'react-bootstrap';
import { Col, Row } from 'antd';
import axios from "axios";
import moment from 'moment';
import feather from 'feather-icons';
import { useAuth } from '../context/AuthContext';


export default function Newbooking({selectedHotel}){
    const { loggedInUser } = useAuth();
    const [randomNumber, setRandomNumber] = useState('');
    const [roomrent, setRoomrent] = useState("00.00");
    const [bedroomTypes, setBedroomTypes] = useState([]);
    const [selectedBedroom, setSelectedBedroom] = useState('');
    const [gstcost, setGstcost] = useState('');
    const [checkindate, setCheckindate] = useState("");
    const [checkintime, setCheckintime] = useState("");
    const [checkin_ud, setCheckin_ud] = useState("AM"); // Default to "AM"
    const [checkindatetime, setCheckindatetime] = useState("");

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [modalMessage, setModalMessage] = useState('');

    const handleClose = () => setShowModal(false)


    const handleCheckindate = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
    
        if (inputName === "checkindate") {
            setCheckindate(inputValue);
        } else if (inputName === "checkintime") {
            setCheckintime(inputValue);
        } else if (inputName === "checkin_ud") {
            setCheckin_ud(inputValue);
        }
    
        const combinedDatetime = `${checkindate} ${checkintime} ${checkin_ud}`;
        setCheckindatetime(combinedDatetime);
        const formattedDate = moment(combinedDatetime).format('YYYY-MM-DDTHH:mm:ss.sssZ');
        setFormData((prevData) => ({
            ...prevData,
            checkin_Booking: formattedDate,
        }));
    };

    const handleGstChange = (event) => {
        const isChecked = event.target.checked;
        let newroomrent = isChecked ? parseFloat(roomrent) + parseFloat(gstcost) : parseFloat(roomrent) - parseFloat(gstcost);
        setRoomrent(newroomrent);
    
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking.length > 0 
                ? prevData.payment_Booking[0] 
                : { roomrent: 0, gst: 0, extra: 0, total: 0, amountPaid: 0, amountDue: 0, paymentType: "" };
    
            const updatedPaymentBooking = {
                ...paymentBooking, 
                total: isChecked
                    ? parseInt(paymentBooking.roomrent, 10) + parseInt(paymentBooking.extra) + parseInt(gstcost)
                    : parseInt(paymentBooking.roomrent, 10) + parseInt(paymentBooking.extra),
                gst: isChecked ? gstcost : 0, 
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking], 
            };
        });
    };

    const handleExtraChange = (event) => {
        const extraValue = 300;
        const isChecked = event.target.checked;
        let newroomrent = isChecked ? parseFloat(roomrent) + parseFloat(extraValue) : parseFloat(roomrent) - parseFloat(extraValue);
        setRoomrent(newroomrent);
    
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking.length > 0 
                ? prevData.payment_Booking[0] 
                : { roomrent: 0, gst: 0, extra: 0, total: 0, amountPaid: 0, amountDue: 0, paymentType: "" };
    
            const updatedPaymentBooking = {
                ...paymentBooking,
                total: isChecked
                    ? parseInt(paymentBooking.roomrent, 10) + parseInt(paymentBooking.gst) + parseInt(extraValue)
                    : parseInt(paymentBooking.roomrent, 10) + parseInt(paymentBooking.gst),
                extra: isChecked ? extraValue : 0,
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking],
            };
        });
    };

    const handlePaymentChange = (event) => {
        const paymentamt = event.target.value;
    
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking[0];

            let balanceAmt = parseFloat(paymentBooking.total) - parseFloat(paymentamt);
    
            const updatedPaymentBooking = {
                ...paymentBooking,
                amountPaid: paymentamt,
                amountDue: balanceAmt,
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking],
            };
        });
    };

    const handlePaymentmodeChange = (event) => {
        const selectedPaymentType = event.target.value; 
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking[0];
            const updatedPaymentBooking = {
                ...paymentBooking,
                paymentType: selectedPaymentType
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking],
            };
        });
    };
    

    const [formData, setFormData] = useState({
        staffid: "",
        hotelid: "",
        source: "",
        personName: "",
        mobile: "",
        email: "",
        guestCount: "",
        roomType: "",
        bedType: "",
        address: "",
        nationality: "",
        identityType: "",
        aadharNum: "",
        checkin_Booking: "",
        checkin_Reserve: "",
        checkout: "",
        cFormNumber: "",
        roomNumbers: "",
        bookingNo: randomNumber,
        payment_Booking: [
            {
                roomrent: 0,
                extra: 0,
                gst: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: "",
            },
        ],
        payment_Reserve: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    useEffect(() => {
        feather.replace();
        fetchBedroomTypes();
        if (loggedInUser) {
            setFormData((prevData) => ({
                ...prevData,
                staffid: loggedInUser,
                hotelid: selectedHotel,
                guestCount: 2,
                roomType: 'Non-AC',
                bedType: 'Single occupancy',
            }));
        }
    }, [loggedInUser,selectedHotel]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:4000/api/book/new-booking";
            const headers = {
                'Authorization': localStorage.getItem('token')
            };
            const response = await axios.post(url, formData, { headers });
            if (response.data.success) {
                setModalMessage("Booking successfully created");
            } else {
                setModalMessage("Failed to create booking");
            }

            setShowModal(true);
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("An error occurred");
        }
    };

    const handleChangePhone = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only numeric values
        setFormData({ ...formData, [name]: sanitizedValue });
      };

    const handleRoomChange = (e) => {
        const selectedRoomtype = e.target.value;
        console.log(selectedRoomtype);
        const selectedRoom = bedroomTypes.find((room) => room.type === selectedRoomtype);
        console.log(selectedRoom);
        setRoomrent(selectedRoom.rate);
        setGstcost(selectedRoom.tax);
        setFormData((prevData) => ({
            ...prevData,
            bedType: selectedRoomtype,
            payment_Booking: [
                {
                    ...prevData.payment_Booking[0],
                    roomrent: selectedRoom.rate, 
                },
            ]
        }));
    }

    return <>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Booking Staff</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <input type="text" name="staffid" onChange={handleChange} value={loggedInUser} readOnly className="form-control" placeholder="Booking Staff Name" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Source of Looking</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <select className="form-select" name="source" onChange={handleChange} value={formData.source} id="example-select">
                                                            <option>Select ...</option>
                                                            <option value="google">Google</option>
                                                            <option value="social-media">Social media</option>
                                                            <option value="friends-and-family">Friends & family </option>
                                                            <option value="portal">Portal</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>

                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <h3 className="pt-2 text-blue">Customer Details</h3>

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <p className="fs-18 fw-semibold text-blue pt-3">Guest Details</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" name="personName" onChange={handleChange} value={formData.personName} placeholder="Booking Person Name" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <input type="text" className="form-control" name="mobile" onChange={handleChangePhone} value={formData.mobile} placeholder="Mobile Number" maxLength="10" />
                                                {/* <input type="text" className="form-control" name="mobile" onChange={handleChange} value={formData.mobile} placeholder="Mobile Number" /> */}
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="email" className="form-control" name="email" onChange={handleChange} value={formData.email} placeholder="Email Address" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <p className="fs-18 fw-semibold text-blue pt-3">Guest Details</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <select className="form-select" name="guestCount" onChange={handleChange} value={formData.guestCount} id="example-select">
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <p className="fs-18 fw-semibold text-blue pt-3">Room Type</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="pe-2 pt-2">
                                                <select className="form-select" name="roomType" onChange={handleChange} value={formData.roomType} id="example-select">
                                                    <option value="Non-AC">Non-AC</option>
                                                    <option value="AC">AC</option>
                                                </select>
                                            </Col>

                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <select className="form-select" name="bedType" onChange={handleRoomChange} value={formData.bedType} id="example-select">
                                                    <option>Select Option</option>
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

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p className="fs-18 fw-semibold text-blue pt-3">Address Details</p>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <input type="text" className="form-control" name="address" onChange={handleChange} value={formData.address} placeholder="Type Customer Address" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p className="fs-18 fw-semibold text-blue pt-3">Check IN Details</p>
                                    </Col>
                                    
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 mob-pad-2">
                                                <input type="text" className="form-control" name="checkindate" onChange={handleCheckindate} placeholder="Check-In Date" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 mob-pad-2">
                                            <input type="text" className="form-control" name="checkintime" onChange={handleCheckindate} placeholder="Time" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 mob-pad-2">
                                                <select className="form-select" name="checkin_ud" onChange={handleCheckindate} id="example-select">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row>
                                <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mt-3" style={{border:'solid #b4b4b4 1px', borderRadius:'15px', padding:'0px 10px'}}>
                                    <Row>
                                        <textarea className="form-control m-2" rows={4} placeholder="Notes" ></textarea>
                                    </Row>
                                </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mt-3" style={{border:'solid #b4b4b4 1px', borderRadius:'15px', padding:'0px 10px'}}>
                                        <Row>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                <Row>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Room Rent</p>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-bold text-black pt-3">Rs {roomrent}/-</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input className="form-check-input" style={{verticalAlign:'middle', marginTop: '-8px', marginRight:'5px'}} onChange={handleExtraChange} type="checkbox" value="" id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault"><p className="fs-18 fw-bold text-black pt-3">Extra</p></label>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} >
                                                <Row>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">GST Bill</p>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                                    <input className="form-check-input" style={{verticalAlign:'middle', marginTop: '-8px', marginRight:'5px'}} onChange={handleGstChange} type="checkbox" value="" id="flexCheckDefault"/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault"><p className="fs-18 fw-bold text-black pt-3">Add GST</p></label>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Booking Payment</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input type="text" name="bokingpayment" onChange={handlePaymentChange} className="form-control mt-3" placeholder="Booking Payment" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Payment Mode</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <div className="col-sm-11 d-flex gap-4 mt-3 mb-3">
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

                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <button className="btn btn-warning d-flex" style={{float:'right', marginTop:'50%'}} type="submit"> Submit </button>
                                    </Col>
                                </Row>
                                </form>

                                {/* <Modal show={showModal} size="sm" onHide={handleClose} backdrop="static"> */}
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