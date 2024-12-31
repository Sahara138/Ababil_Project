// import { useTheme } from "@emotion/react";
// import { Box, Divider, Typography } from "@mui/material";
// import { Outlet } from "react-router"
// import UmrahTabs from "../Tabs/UmrahTabs";


// const UmrahLayout = (props) => {
//     const {tabs} = props
//     const theme = useTheme(); // Access the current theme
      
//     const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
//     return (
//         <div style={{ width: '100%' }}>
//       <UmrahTabs />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: '30px',
//           borderColor: 'transparent',
//           backgroundColor: isDarkMode ? 'grey.900' : 'white', // Adjust for dark mode
//           boxShadow: 3,
//           marginBottom: '50px',
//           color: isDarkMode ? 'grey.300' : 'grey.900', // Adjust text color for dark mode
//         }}
//       >
//         <Typography
//           component="h2"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
//           }}
//         >
//             Management
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
//           }}
//         />
//         <Outlet />
          
//         </Box>
//     </div>
//     )
// }

// export default UmrahLayout
