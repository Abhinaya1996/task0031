import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { HotelProvider } from './components/Hotelcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <HotelProvider>
      <App />
    </HotelProvider>
  </BrowserRouter>
);

