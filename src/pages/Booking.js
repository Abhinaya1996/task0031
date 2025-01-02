import React from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';

export default function Booking(){
    return <>

            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                    <h4 className="pb-3">Guest List</h4>
                                <div className="table-responsive">
                                            <table className="table table-traffic mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="border-top-0 fw-semibold text-black">Bk.No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Name</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room No</th>
                                                        <th className="border-top-0 fw-semibold text-black">Room Type</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check In</th>
                                                        <th className="border-top-0 fw-semibold text-black">Check Out</th>
                                                        <th className="border-top-0 fw-semibold text-black">Total Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Due Amount</th>
                                                        <th className="border-top-0 fw-semibold text-black">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Raja Ganapathi</td>
                                                        <td>27</td>
                                                        <td className="text-warning">Single Bed</td>
                                                        <td>Sep 18; 8.00am</td>
                                                        <td>-</td>
                                                        <td>Rs. 1500/-</td>
                                                        <td>Rs. 1000/-</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Swetha Sivakumar</td>
                                                        <td>12</td>
                                                        <td className="text-warning">Double Bed</td>
                                                        <td>Sep 27; 10.00am</td>
                                                        <td>-</td>
                                                        <td>Rs. 3500/-</td>
                                                        <td>Rs. 2000/-</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Arun Raj</td>
                                                        <td>16</td>
                                                        <td className="text-warning">Double Bed</td>
                                                        <td>Sep 22; 1.00pm</td>
                                                        <td>-</td>
                                                        <td>Rs. 1500/-</td>
                                                        <td>Rs. 500/-</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Venkat</td>
                                                        <td>28</td>
                                                        <td className="text-warning">Single Bed</td>
                                                        <td>Sep 24; 12.00pm</td>
                                                        <td>-</td>
                                                        <td>Rs. 1500/-</td>
                                                        <td>Rs. 750/-</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Sathish Kumar</td>
                                                        <td>02</td>
                                                        <td className="text-warning">Single Bed</td>
                                                        <td>Sep 25; 8.00am</td>
                                                        <td>-</td>
                                                        <td>Rs. 1500/-</td>
                                                        <td>Rs. 1000/-</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>M01</td>
                                                        <td>Mohamed Rafik</td>
                                                        <td>14</td>
                                                        <td className="text-warning">King size</td>
                                                        <td>Sep 27; 6.00am</td>
                                                        <td>-</td>
                                                        <td>Rs. 5500/-</td>
                                                        <td>Rs. 3000/-</td>
                                                        <td></td>
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