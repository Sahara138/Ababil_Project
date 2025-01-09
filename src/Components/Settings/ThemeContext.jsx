// import React, { createContext, useState } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProviderWrapper = ({ children }) => {
//   const [customColors, setCustomColors] = useState({
//     primary: '#1976d2',
//     secondary: '#dc004e',
//     color3: '#ff9800',
//     color4: '#4caf50',
//     color5: '#9c27b0',
//     color6: '#3f51b5',
//   });

//   const updateColor = (key, value) => {
//     setCustomColors((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <ThemeContext.Provider value={{ customColors, updateColor }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
