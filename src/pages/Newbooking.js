import React from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { Col, Row } from 'antd';

export default function Newbooking(){
    return <>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Booking Staff</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <input type="text" className="form-control" placeholder="Booking Staff Name" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Source of Looking</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <select className="form-select" id="example-select">
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
                                                <input type="text" className="form-control" placeholder="Booking Person Name" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Mobile Number" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <input type="text" className="form-control" placeholder="Email Address" />
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
                                                <select className="form-select" id="example-select">
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
                                                <select className="form-select" id="example-select">
                                                    <option>Non-AC</option>
                                                    <option>AC</option>
                                                </select>
                                            </Col>

                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <select className="form-select" id="example-select">
                                                    <option>Single occupancy </option>
                                                    <option>Double occupancy with kitchen </option>
                                                    <option>Double occupancy without kitchen </option>
                                                    <option>Triple occupancy with kitchen </option>
                                                    <option>Triple occupancy without kitchen</option>
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
                                        <input type="text" className="form-control" placeholder="Type Customer Address" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <p className="fs-18 fw-semibold text-blue pt-3">Check IN Details</p>
                                    </Col>
                                    
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
                                </Row>


                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mt-3" style={{border:'solid #b4b4b4 1px', borderRadius:'15px', padding:'0px 10px'}}>
                                        <Row>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                <Row>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Room Rent</p>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-bold text-black pt-3">Rs 00.00/-</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-bold text-black pt-3">Rs 00.00/-</p>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} >
                                                <Row>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">GST Bill</p>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                                        <p className="fs-18 fw-bold text-black pt-3">Add GST</p>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Booking Payment</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input type="text" className="form-control mt-3" placeholder="Type Customer Address" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Payment Mode</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <div className="col-sm-11 d-flex gap-4 mt-3 mb-3">
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
                                    </Col>

                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <button className="btn btn-warning d-flex" style={{float:'right', marginTop:'50%'}} type="submit"> Submit </button>
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