import './App.css';
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Reservation from './pages/Reservation';
import Inhouseguest from './pages/Inhouseguest';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from "./components/Sidebar";
import Newbooking from './pages/Newbooking';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import GuestHistory from './pages/GuestHistory';
import Superadmin from './pages/Superadmin';
import NotFound from './pages/NotFound';
import Loginreports from './pages/Loginreports';
import Roomwise from './pages/Roomwise';
import CheckInOutReport from './pages/Checkin_out';
import Reports from './pages/Reports';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  
  const location = useLocation();
  const [selectedHotel, setSelectedHotel] = useState(() => {
    return localStorage.getItem('selectedHotel') || null;
  });

  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    setSidebarVisible(!isMobile);
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    if (selectedHotel) {
      localStorage.setItem('selectedHotel', selectedHotel);
    }
  }, [selectedHotel]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const excludedRoutes = ['/login', '/'];

  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <div className="bg-primary-subtle">
       <div id="app-layout">

            {!isExcludedRoute && <Header selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} toggleSidebar={toggleSidebar}/>}
            {!isExcludedRoute && <Sidebar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedHotel={setSelectedHotel} isSidebarVisible={isSidebarVisible}/>}
            <AuthProvider>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/booking' element={<Booking selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/reservation' element={<Reservation selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/inhouseguest' element={<Inhouseguest selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/new-booking' element={<Newbooking selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/reports' element={<Reports selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/guesthistory' element={<GuestHistory selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/login-reports' element={<Loginreports selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/roomwise' element={<Roomwise selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='/checkin-out-report' element={<CheckInOutReport selectedDate={selectedDate} selectedHotel={selectedHotel}/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
              </AuthProvider>
      </div>
    </div>
  );
}

export default App;
