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

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  
  const location = useLocation();
  const [selectedHotel, setSelectedHotel] = useState(() => {
    return localStorage.getItem('selectedHotel') || null;
  });

  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    setSidebarVisible(!isMobile); // Show sidebar for system, hide for mobile
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
            {!isExcludedRoute && <Sidebar isSidebarVisible={isSidebarVisible}/>}
            <AuthProvider>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard selectedHotel={selectedHotel}/>}/>
                <Route path='/booking' element={<Booking selectedHotel={selectedHotel}/>}/>
                <Route path='/reservation' element={<Reservation selectedHotel={selectedHotel}/>}/>
                <Route path='/inhouseguest' element={<Inhouseguest selectedHotel={selectedHotel}/>}/>
                <Route path='/new-booking' element={<Newbooking selectedHotel={selectedHotel}/>}/>
              </Routes>
              </AuthProvider>
      </div>
    </div>
  );
}

export default App;
