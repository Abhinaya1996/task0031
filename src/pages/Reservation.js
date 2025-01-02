import React from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { Col, Row } from 'antd';

export default function Reservation(){
    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                <input type="text" className='form-control' style={{borderRadius:'30px', width:'70%',marginLeft: '0px'}} placeholder='Search Here by Name'/>
                                
                                <h4 className="fs-26 fw-semibold mt-3 text-ash">Customer Details</h4>

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <p className="fs-18 fw-semibold text-ash pt-3">Name Details</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Booking Person Name" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Mobile Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Alternate Mobile Number" />
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
                                                <input type="text" className="form-control" placeholder="Booking Person Name" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <input type="text" className="form-control" placeholder="Mobile Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <input type="text" className="form-control" placeholder="Alternate Mobile Number" />
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
                                                <input type="text" className="form-control" placeholder="Type Customer Address" />
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
                                                <select className="form-select" id="example-select">
                                                    <option>Non-AC</option>
                                                    <option>AC</option>
                                                </select>
                                            </Col>

                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select">
                                                    <option>Single Bedroom</option>
                                                    <option>Double Bedroom</option>
                                                    <option>King Size</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row className="pt-4">
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Check In Detail</p>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Check-In Date" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
                                            <input type="text" className="form-control" placeholder="Time" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold pt-2">Check Out Detail</p>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 mob-pad-2">
                                                <input type="text" className="form-control" placeholder="Check-In Date" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 mob-pad-2">
                                            <input type="text" className="form-control" placeholder="Time" />
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 mob-pad-2">
                                                <select className="form-select" id="example-select">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold pt-2">C-Form Number</p>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 mob-pad-2">
                                                <input type="text" className="form-control" placeholder="325214" />
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="pe-2 mob-pad-2">
                                            <p style={{color:'#32c833',padding:'5px 5px',}} className="fw-semibold">Opened</p>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Allocated Room Number</p>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="MAA053" />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                            <input type="text" className="form-control" placeholder="SANJAY-007" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                </Row>

                                <Row className="pt-4">
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold">Nationality :</p>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select">
                                                    <option value="IN">Indian</option>
                                                    <option value="US">American</option>
                                                    <option value="CA">Canadian</option>
                                                </select>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select">
                                                    <option value="passport">Passport</option>
                                                    <option value="aadhar">Aadhar Card</option>
                                                    <option value="voterId">Voter ID</option>
                                                </select>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Row >
                                            <p className="fs-16 text-warning fw-semibold pt-2">Additional Charges :</p>
                                        </Row>
                                        <Row>
                                            <Col xs={8} sm={8} md={3} lg={3} xl={3} className="pe-2 mob-pad-2">
                                                <input type="text" className="form-control" placeholder="500" />
                                            </Col>
                                            <Col xs={14} sm={14} md={6} lg={6} xl={6} className="pe-2 mob-pad-2">
                                                <input type="text" className="form-control" placeholder="500" />
                                            </Col>
                                        </Row>

                                        <Row className="pt-2">
                                            <p className="fs-16 text-warning fw-semibold">Payment Mode :</p>
                                        </Row>

                                        <Row>
                                            <Col xs={14} sm={14} md={8} lg={8} xl={8} className="pe-2 pt-2">
                                                <div className="col-sm-11 d-flex gap-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
                                                        <label className="form-check-label" htmlFor="gridRadios1">
                                                            UPI
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                                                        <label className="form-check-label" htmlFor="gridRadios2">
                                                            Card
                                                        </label>
                                                    </div>
                                                    <div className="form-check disabled">
                                                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3"/>
                                                        <label className="form-check-label" htmlFor="gridRadios3">
                                                            Cash
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>

    </>
}