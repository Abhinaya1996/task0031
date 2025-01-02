import React from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';

export default function Inhouseguest(){
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
                                                        <th className="border-top-0 fw-semibold text-black">Bk.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room Type</th>
                                                        <th className="border-top-0 fw-semibold text-black">C-Form</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check Out</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Due Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Gst Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Raja Ganapathi</td>
                                                        <td>27</td>
                                                        <td>Double</td>
                                                        <td style={{color:'#32c833'}}>Opened</td>
                                                        <td className="text-danger">8:30pm</td>
                                                        <td>5000</td>
                                                        <td className="text-danger">3500</td>
                                                        <td className="text-danger">250</td>
                                                        <td className="text-warning">Pending</td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Swetha Sivakumar</td>
                                                        <td>12</td>
                                                        <td>Single AC</td>
                                                        <td className="text-danger">Closed</td>
                                                        <td className="text-danger">9:00pm</td>
                                                        <td>4000</td>
                                                        <td className="text-danger">2000</td>
                                                        <td className="text-danger">150</td>
                                                        <td className="text-warning">Pending</td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Arun Raj</td>
                                                        <td>16</td>
                                                        <td>Single Non AC</td>
                                                        <td style={{color:'#32c833'}}>Opened</td>
                                                        <td className="text-danger">11:30am</td>
                                                        <td>3500</td>
                                                        <td className="text-danger">1500</td>
                                                        <td className="text-danger">75</td>
                                                        <td className="text-warning">Pending</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>
    </>
}