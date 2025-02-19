import { Dropdown, Avatar, Badge, Menu } from 'antd';
import {useNavigate} from 'react-router-dom'
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import usericon from '../assets/images/users/user-12.jpg';
import { useEffect, useState } from 'react';
import axios from "axios";

const Header = ({ selectedHotel, setSelectedHotel, toggleSidebar }) => {

    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hotelchange, setHotelchange] = useState("");
    const [currentTime, setCurrentTime] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        const token = localStorage.getItem('token');
        
        if (!user || !token) {
            navigate('/login');
        } else {
            setLoggedInUser(user);
        }
    }, [navigate]);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
        checkPage(window.location.pathname);
        updateButtonstate(window.location.pathname);
        setCurrentTime(getIndiaTime());
        const interval = setInterval(() => {
        setCurrentTime(getIndiaTime());
        }, 1000);
        return () => clearInterval(interval);
    },[])

    const handleLogout = async(e) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUser })
        });
        const result = await response.json();
        const { success } = result;
        if (success) {
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('selectedHotel');
            setSelectedHotel(null);
            setTimeout(() => {
                navigate('/login');
            }, 1000)
        }
    }

    const getIndiaTime = () => {
        const indiaTime = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata', // IST Time Zone
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, // 12-hour format
        }).format(new Date());
    
        return indiaTime;
      };

    const checkPage = (thispage) => {
        if(thispage === "/new-booking"){
            setVisible(0);
        }else{
            setVisible(1);
        }
    }

    const updateButtonstate = (thispage) => {
        if(thispage === '/reservation' || thispage === '/new-booking'){
            setHotelchange("disabled");
        }else{
            setHotelchange("");
        }
    }
    
    const menuItems = [
        { key: '1', label: <a href="/dashboard">My Account</a> },
        { key: '2', label: <a href="/dashboard">Lock Screen</a> },
        { type: 'divider' },
        { key: '3', label: <a href="#" onClick={handleLogout}>Logout</a> },
    ];

    const hotelsList = [
        { key: '1', label: 'MAA GRAND' },
        { key: '2', label: 'MAA RESIDENCY' },
        { key: '3', label: 'MAA SERVICE APARTMENTS' }
      ];

    const notifyItems = [
        {
            key: '1',
            label: (
                <div className="dropdown-item noti-title">
                    <h5 className="m-0">
                        <span className="float-end">
                            <a href="/" className="text-dark">
                                <small>Clear All</small>
                            </a>
                        </span>
                        Notification
                    </h5>
                </div>
            ),
        },
        { type: 'divider' },
        {
            key: '2',
            label: (
                <a href="/dashboard" className="dropdown-item notify-item text-muted link-primary active"> 
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="notify-details">Notification Title</p>
                        <small className="text-muted">5 min ago</small>
                    </div>
                    <p className="mb-0 user-msg">
                        <small className="fs-14">Completed <span className="text-reset">Improve workflow in Figma</span></small>
                    </p>
                </a>
            ),
        },
    ];

    const handleMenuClick = ({ key }) => {
        const selected = hotelsList.find((hotel) => hotel.key === key);
        if (selected) {
          setSelectedHotel(selected.label);
        }
      };
    const menu = ( <Menu items={hotelsList.map((hotel) => ({ key: hotel.key, label: hotel.label, onClick: handleMenuClick }))}/>);

    const handleNewBookingClick = () => {
        if (!selectedHotel) {
            alert('Please select a hotel first');
        } else {
            window.location.href = '/new-booking';
        }
    };


    return (
        <>
            <div className="topbar-custom">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                            
                            <li className="d-none d-lg-block">
                                <input type="text" className='form-control' style={{borderRadius:'30px', width:'40vh',marginLeft: '10px'}} placeholder='Search Here by Name'/>
                            </li>

                            <li>
                            <button onClick={toggleSidebar} type="button" className="btn btn-light rounded-pill sys-hide"><i data-feather="align-justify"></i></button>
                            </li>

                            <li className="dropdown notification-list topbar-dropdown">
                                <Dropdown menu={{ items: notifyItems }} trigger={['hover']}>
                                    <span className="nav-link dropdown-toggle nav-user me-0" onClick={(e) => e.preventDefault()}>
                                        <Badge
                                            style={{ marginRight: '10px', padding:'0px 3px' }}
                                            count={15}
                                            size="small"
                                            offset={[10, 0]}
                                            overflowCount={99}
                                        >
                                            <BellOutlined
                                                style={{
                                                    fontSize: '22px',
                                                    color: '#4a5a6b',
                                                    marginRight: '5px',
                                                    paddingBottom: '10px',
                                                }}
                                            />
                                        </Badge>
                                    </span>
                                </Dropdown>
                            </li>

                        </ul>

                        <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center mob-hide">
                            <li>
                            <Dropdown overlay={menu} trigger={['click']} disabled={hotelchange}>
                                <button type="button" className="btn btn-warning rounded-pill me-2">
                                {selectedHotel ? `${selectedHotel}` : 'Select Hotel'}
                                </button>
                            </Dropdown>
                            </li>
                            <li>
                            <a href="#" onClick={handleNewBookingClick} className="btn rounded-pill" style={{display: visible ? 'block' : 'none',backgroundColor: hovered ? "#f32d2f" : "#57A860",color: "white",transition: "background-color 0.3s ease"}}onMouseEnter={() => setHovered(true)}onMouseLeave={() => setHovered(false)}>New Booking</a>
                            {/* <a href='/new-booking' className="btn rounded-pill" style={{display: visible ? 'block' : 'none', backgroundColor: hovered ? "#f32d2f" : "#c0e4aa", color: "white",transition: "background-color 0.3s ease",}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >New Booking</a> */}
                            </li>
                        </ul>

                        <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                            
                            <li className='mob-hide'>
                                <span className="badge text-bg-light me-3"> {currentTime}</span>
                            </li>

                            <li className="dropdown notification-list topbar-dropdown">
                                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                                    <span
                                    className="nav-link dropdown-toggle nav-user me-0"
                                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', lineHeight: 'normal' }}
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    <Avatar src={usericon} alt="user" style={{ marginRight: '10px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '1.5', width:'80px' }}>
                                        <span className="pro-user-name" style={{ fontSize: '16px', fontWeight: 'bold', textAlign:'left' }}>
                                        {loggedInUser}
                                        </span>
                                        <span className="pro-user-designation" style={{ fontSize: '12px', color: 'gray', textAlign:'left' }}>
                                        Admin Staff
                                        </span>
                                    </div>
                                    <DownOutlined style={{ marginLeft: '8px', marginTop: '20px', alignSelf: 'center' }} />
                                    </span>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
