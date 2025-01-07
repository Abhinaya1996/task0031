import React, { useState, useEffect } from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import feather from 'feather-icons';
import { Col, Row } from 'antd';
import logo from '../assets/images/logos/logo-rbg.png'

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    useEffect(() => {
        feather.replace();
    }, [showPassword]);
    return <>
            <div>
                <div className="content">
                    <div className="container-fluid">
                        <Row className="mt-5">
                            <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="card p-5">
                                <div className="card-body">
                                    <div className="mb-0 border-0 p-md-5 p-lg-0 p-4">
                                        <div className="mb-4 p-0 text-center">
                                            <a className="auth-logo" href="/login">
                                                <img src={logo} alt="logo-dark" className="mx-auto" height="150"/>
                                            </a>
                                        </div>

                                        <div className="pt-0">
                                            <form className="my-4">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                    <input className="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email"/>
                                                </div>
                    
                                                <div className="form-group mb-3" style={{ position: "relative" }}>
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input className="form-control" type={showPassword ? "text" : "password"} required id="password" placeholder="Enter your password" style={{ paddingRight: "40px" }} />
                                                    <span
                                                        onClick={togglePasswordVisibility}
                                                        style={{position: "absolute",right: "10px",top: "75%",transform: "translateY(-50%)",cursor: "pointer",color: "#6c757d"}}>
                                                        {showPassword ? (
                                                            <i data-feather="eye-off"></i> 
                                                        ) : (
                                                            <i data-feather="eye"></i>
                                                        )}
                                                    </span>
                                                </div>
                                                
                                                <div className="form-group mb-0 row">
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            {/* <button className="btn btn-warning" type="submit"> Log In </button> */}
                                                            <a href="/dashboard" className="btn btn-warning"> Log In</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
        
                                            <div className="text-center text-muted mb-4">
                                                <p className="mb-3">Forgot Password ?</p>
                                                <p className="mb-0"><a className="text-warning ms-2 fs-18 fw-medium" href="/register">For New Registeration</a></p>
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            </Col>
                            <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
                        </Row>
                    </div>
                </div>
            </div>
    </>
}