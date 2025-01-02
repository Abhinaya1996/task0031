import { Dropdown, Avatar, Badge, Menu } from 'antd';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import usericon from '../assets/images/users/user-12.jpg';
import { useEffect, useState } from 'react';

const Header = ({ toggleSidebar }) => {

    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [curpage, setCurpage] = useState('');

    useEffect(() => {
        setCurpage(window.location.pathname);
        checkPage(window.location.pathname);
    },[])

    console.log(curpage);
    const checkPage = (thispage) => {
        if(thispage !== "/dashboard"){
            setVisible(0);
        }else{
            setVisible(1);
        }
    }
    
    const menuItems = [
        { key: '1', label: <a href="/">My Account</a> },
        { key: '2', label: <a href="/">Lock Screen</a> },
        { type: 'divider' },
        { key: '3', label: <a href="/">Logout</a> },
    ];

    const hotelsList = [
        { key: '1', label: <a href="/">Hotel 1</a> },
        { key: '2', label: <a href="/">Hotel 2</a> },
        { key: '3', label: <a href="/">Hotel 3</a> },
        { key: '4', label: <a href="/">Hotel 4</a> },
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

    const menu = <Menu items={hotelsList} />;
    // window.location.pathname

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
                            <Dropdown menu={menu} trigger={["hover"]} >
                                <button type="button" className="btn btn-warning rounded-pill me-2">Select Hotel</button>
                            </Dropdown>
                            </li>
                            <li>
                            <button type="button" className="btn rounded-pill" style={{display: visible ? 'block' : 'none', backgroundColor: hovered ? "#f32d2f" : "#c0e4aa", color: "white",transition: "background-color 0.3s ease",}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >New Booking</button>
                            </li>
                        </ul>

                        <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                            
                            <li className='mob-hide'>
                                <span className="badge text-bg-light me-3">9:41 AM</span>
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
                                        Revathi
                                        </span>
                                        <span className="pro-user-designation" style={{ fontSize: '12px', color: 'gray', textAlign:'left' }}>
                                        Admin Staff
                                        </span>
                                    </div>
                                    <DownOutlined style={{ marginLeft: '8px', alignSelf: 'center' }} />
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