import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import '../assets/css/responsive.css';
import Loginreports from './Loginreports';
import Roomwise from './Roomwise';
import CheckInOutReport from './Checkin_out';

export default function Reports({selectedDate,selectedHotel}){

    const [activeReport, setActiveReport] = useState("login");
    

    return <>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <div className='pb-4'>
                                        <button
                                            className={`btn btn-primary rounded-pill me-2 ${activeReport === "login" ? "active" : ""}`}
                                            onClick={() => setActiveReport("login")}
                                        >
                                            Login Reports
                                        </button>
                                        <button
                                            className={`btn btn-primary rounded-pill me-2 ${activeReport === "roomwise" ? "active" : ""}`}
                                            onClick={() => setActiveReport("roomwise")}
                                        >
                                            Roomwise Reports
                                        </button>
                                        <button
                                            className={`btn btn-primary rounded-pill me-2 ${activeReport === "checkinout" ? "active" : ""}`}
                                            onClick={() => setActiveReport("checkinout")}
                                        >
                                            Checkin and Checkout Reports
                                        </button>
                                    </div>

                                    <div>
                                        {activeReport === "login" && <Loginreports selectedDate={selectedDate} selectedHotel={selectedHotel} />}
                                        {activeReport === "roomwise" && <Roomwise selectedDate={selectedDate} selectedHotel={selectedHotel} />}
                                        {activeReport === "checkinout" && <CheckInOutReport selectedDate={selectedDate} selectedHotel={selectedHotel} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>
    </>
}