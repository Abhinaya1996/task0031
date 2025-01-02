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

                                <p className="fs-18 fw-semibold text-ash pt-3">Name Details</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Booking Person Name" />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Mobile Number" />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Alternate Mobile Number" />
                                    </div>
                                </div>

                                <p className="fs-18 fw-semibold text-ash pt-3">Guest Details</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Booking Person Name" />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Mobile Number" />
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Alternate Mobile Number" />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <p className="fs-18 fw-semibold text-ash pt-3">Address Details</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="fs-18 fw-semibold text-ash pt-3">Room Type</p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="Type Customer Address" />
                                    </div>
                                    <div className="col-2">
                                        <select className="form-select" id="example-select">
                                            <option>Non-AC</option>
                                            <option>AC</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="form-select" id="example-select">
                                            <option>Single Bedroom</option>
                                            <option>Double Bedroom</option>
                                            <option>King Size</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row className="pt-4">
                                    <Col span={6}>
                                        <p className="fs-16 text-warning fw-semibold">Check In Detail</p>
                                    </Col>
                                    <Col span={6}>
                                        <p className="fs-16 text-warning fw-semibold">Check Out Detail</p>
                                    </Col>
                                    <Col span={4}>
                                        <p className="fs-16 text-warning fw-semibold">C-Form Number</p>
                                    </Col>
                                    <Col span={4}>
                                        <p className="fs-16 text-warning fw-semibold">Allocated Room Number</p>
                                    </Col>
                                    <Col span={4}>
                                        <p className="fs-16 text-warning fw-semibold">Allocated Room Number</p>
                                    </Col>
                                </Row>

                                <Row className="pt-2">
                                    <Col span={4} className="pe-2">
                                        <input type="text" className="form-control" placeholder="Check-In Date" />
                                    </Col>
                                    <Col span={1}  className="pe-2">
                                    <input type="text" className="form-control" placeholder="Time" />
                                    </Col>
                                    <Col span={1} className="pe-2">
                                        <select className="form-select" id="example-select">
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>
                                    </Col>

                                    <Col span={4} className="pe-2">
                                        <input type="text" className="form-control" placeholder="Check-In Date" />
                                    </Col>
                                    <Col span={1}  className="pe-2">
                                    <input type="text" className="form-control" placeholder="Time" />
                                    </Col>
                                    <Col span={1} className="pe-2">
                                        <select className="form-select" id="example-select">
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>
                                    </Col>

                                    <Col span={2}>
                                        <input type="text" className="form-control" placeholder="325214" />
                                    </Col>
                                    <Col span={2} >
                                        <p style={{color:'#32c833',padding:'5px 5px',}} className="fw-semibold">Opened</p>
                                    </Col>

                                    <Col span={4} className="pe-2">
                                        <input type="text" className="form-control" placeholder="MAA053" />
                                    </Col>

                                    <Col span={4} className="pe-2">
                                        <input type="text" className="form-control" placeholder="SANJAY-007" />
                                    </Col>
                                </Row>

                                <Row className="pt-3">
                                    <Col span={12}>
                                        <p className="fs-16 text-warning fw-semibold">Nationality :</p>
                                    </Col>
                                    <Col span={12}>
                                    <p className="fs-16 text-warning fw-semibold">Additional Charges :</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span="6" className="pe-2">
                                        <select className="form-select" id="example-select">
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>
                                    </Col>
                                    <Col span="6" className="pe-2">
                                        <select className="form-select" id="example-select">
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>
                                    </Col>
                                    <Col span={1} className="pe-2">
                                        <input type="text" className="form-control" style={{paddingLeft:'10px'}} placeholder="500" />
                                    </Col>
                                    <Col span={3}>
                                        <input type="text" className="form-control" style={{paddingLeft:'10px'}} placeholder="500" />
                                    </Col>
                                </Row>

                                <Row className="pt-2">
                                    <Col span="6" className="pe-2">
                                        <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                    </Col>
                                    <Col span="6" className="pe-2">
                                        <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                    </Col>
                                    <Col span={12}>
                                        <p className="fs-16 text-warning fw-semibold">Payment Mode </p>
                                    </Col>
                                </Row>

                                <Row className="pt-2">
                                    <Col span="6" className="pe-2">
                                        <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                    </Col>
                                    <Col span="6" className="pe-2">
                                        <input type="text" className="form-control" placeholder="Type Aadhar Number" />
                                    </Col>
                                    <Col span={6}>
                                        <div className="col-sm-10 d-flex gap-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
                                                <label className="form-check-label" for="gridRadios1">
                                                    UPI
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                                                <label className="form-check-label" for="gridRadios2">
                                                    Card
                                                </label>
                                            </div>
                                            <div className="form-check disabled">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3"/>
                                                <label className="form-check-label" for="gridRadios3">
                                                    Cash
                                                </label>
                                            </div>
                                        </div>
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