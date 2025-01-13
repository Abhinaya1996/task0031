import { useEffect, useState } from "react";
import feather from 'feather-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import logo from '../assets/images/logos/logo.png';

const Sidebar = ({ isSidebarVisible }) => {

    const [activePage, setActivePage] = useState('');
    const [sidebarbg, setSidebarbg] = useState('');
    const [sidebartextcolor, setSidebartextcolor] = useState('');

    
    const sidebarbgfix = (curpage) => {
        if(curpage === "/reservation" ){
            setSidebarbg("bg-side2");
            setSidebartextcolor("text-white");
        }else if(curpage === "/inhouseguest"){
            setSidebarbg("bg-side3");
            setSidebartextcolor("text-white");
        }else if(curpage === "/new-booking"){
            setSidebarbg("bg-side4");
            setSidebartextcolor("text-white");
        }else{
            setSidebarbg("bg-side");
            setSidebartextcolor("text-black");
        }
    }
    const getLinkClass = (path) => {
        return activePage === path ? 'tp-link active' : 'tp-link';
    };
    const getliClass = (path) => {
        return activePage === path ? 'menuitem-active' : '';
    };

    useEffect(() => {
        setActivePage(window.location.pathname);
        sidebarbgfix(window.location.pathname);
        feather.replace();
    }, [sidebartextcolor]);
    return <>
    <div
      className={`app-sidebar-menu ${isSidebarVisible ? "visible" : "hidden"}`}
      style={{
        display: isSidebarVisible ? "block" : "none",
      }}
    >
    <div className="app-sidebar-menu">
        <div className="h-100" data-simplebar>

            
            <div id="sidebar-menu" className={sidebarbg}>

                <div className="logo-box">
                    <a className='logo logo-light' href='/'>
                        <span className="logo-sm">
                            <h3 style={{marginTop:'20px'}}>MAA</h3>
                        </span>
                        <span className="logo-lg">
                            <h3 style={{marginTop:'20px'}}>MAA1 Admin</h3>
                        </span>
                    </a>
                    <a className='logo logo-dark' href='/'>
                        <span className="logo-sm">
                            <h3 style={{marginTop:'20px'}}>MAA</h3>
                        </span>
                        <span className="logo-lg">
                            {/* <h3 style={{marginTop:'20px'}}>MAA2 Admin</h3> */}
                            <img src={logo} alt="MAA Logo" style={{height:'90px', width: '200px'}}/>
                        </span>
                    </a>
                </div>

                <ul id="side-menu" style={{padding:'20px 20px'}}>
                    <li className={getliClass('/dashboard')}>
                        <a className={getLinkClass('/dashboard')} href='/dashboard'>
                            <i className={sidebartextcolor} data-feather="home"></i>
                            <span className={sidebartextcolor}> Home </span>
                        </a>
                    </li>

                    <li className={getliClass('/booking')}>
                        <a className={getLinkClass('/booking')} href='/booking'>
                            <i className={sidebartextcolor} data-feather="book"></i>
                            <span className={sidebartextcolor}> Booking </span>
                        </a>
                    </li>

                    <li className={getliClass('/reservation')}>
                        <a className={getLinkClass('/reservation')} href='/reservation'>
                            <i className={sidebartextcolor} data-feather="calendar"></i>
                            <span className={sidebartextcolor}> Reservation </span>
                        </a>
                    </li>

                    <li className={getliClass('/inhouseguest')}>
                        <a className={getLinkClass('/inhouseguest')} href='/inhouseguest'>
                            <i className={sidebartextcolor} data-feather="log-out"></i>
                            <span className={sidebartextcolor}> In House Guest </span>
                        </a>
                    </li>

                    <li className={getliClass('/guesthistory')}>
                        <a className={getLinkClass('/guesthistory')} href='/guesthistory'>
                            <i className={sidebartextcolor} data-feather="calendar"></i>
                            <span className={sidebartextcolor}> Guest History </span>
                        </a>
                    </li>

                </ul>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar sx={{ width: '280px', margin: '0 auto', backgroundColor:'#ece6f0', borderRadius: '20px' }} />
                </LocalizationProvider>

            </div>

            <div className="logout-sidebar">
            <button type="button" className="btn rounded-pill" style={{backgroundColor:'#716398'}}><i data-feather="settings" style={{height: '20px',width: '20px',color: '#fff'}}></i></button>
            <button type="button" className="btn btn-danger rounded-pill" style={{float:'right'}}>Sign out</button>
            </div>
            

            <div className="clearfix"></div>

        </div>
    </div>
    </div>
    </>
}

export default Sidebar;