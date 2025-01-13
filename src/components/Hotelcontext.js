import React, { createContext, useState } from 'react';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <HotelContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
