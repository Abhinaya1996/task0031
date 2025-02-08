import React, { useState, useEffect, useContext } from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import feather from 'feather-icons';
import { Col, Row } from 'antd';
import logo from '../assets/images/logos/logo-rbg.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';


export default function Superadmin(){

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    useEffect(() => {
        feather.replace();
    }, [showPassword]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard2');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const responseIP = await fetch('https://api.ipify.org?format=json');
            const { ip } = await responseIP.json();
            const userAgent = navigator.userAgent;
            const loginData = {
                email,
                password,
                ip,         // Include IP address
                userAgent   // Include device type
            };
            const url = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

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
                                            <form className="my-4" onSubmit={handleLogin}>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                    <input className="form-control" onChange={handleChange} type='email' name='email' placeholder='Enter your email...' value={loginInfo.email}/>
                                                </div>
                    
                                                <div className="form-group mb-3" style={{ position: "relative" }}>
                                                    <label htmlFor="password" className="form-label">Password</label>

                                                    {/* <input className="form-control" type={showPassword ? "text" : "password"} id="password" value={loginInfo.password} onChange={handleChange} required placeholder="Enter your password" style={{ paddingRight: "40px" }} /> */}
                                                    <input className="form-control" onChange={handleChange} type='password' name='password' placeholder='Enter your password...' value={loginInfo.password} />
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

                                                {error && (
                                                    <div className="form-group mb-3">
                                                        <p className="text-danger">{error}</p>
                                                    </div>
                                                )}
                                                
                                                <div className="form-group mb-0 row">
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-warning" type="submit"> Log In </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
        
                                            <div className="text-center text-muted mb-4">
                                                {/* <p className="mb-3">Forgot Password ?</p> */}
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