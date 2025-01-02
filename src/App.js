import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Reservation from './pages/Reservation';
import Inhouseguest from './pages/Inhouseguest';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  
  useEffect(() => {
    // Check if the device is mobile on initial load
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setSidebarVisible(!isMobile); // Show sidebar for system, hide for mobile
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="bg-primary-subtle">
       <div id="app-layout">
            <Header toggleSidebar={toggleSidebar}/>
            <Sidebar isSidebarVisible={isSidebarVisible}/>
            <BrowserRouter>
              <Routes>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/booking' element={<Booking/>}/>
              <Route path='/reservation' element={<Reservation/>}/>
              <Route path='/inhouseguest' element={<Inhouseguest/>}/>
              </Routes>
            </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
