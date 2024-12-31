// import { styled } from "@mui/material/styles";
// import Avatar from "@mui/material/Avatar";
// import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
// import Box from "@mui/material/Box";

// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// // import SelectContent from "../SelectContent";
// import MenuContent from "../MenuContent/MenuContent";
// // import CardAlert from "../CardAlert";
// import OptionsMenu from "../OptionsMenu";
// import './SideMenu.css'
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import { Link } from "react-router";

// const drawerWidth = 300;

// const Drawer = styled(MuiDrawer)({
//   width: drawerWidth,
//   flexShrink: 0,
//   boxSizing: "border-box",
//   margin: 5,
//   mt: 20,
//   [`& .${drawerClasses.paper}`]: {
//     width: drawerWidth,
//     boxSizing: "border-box",
//   },
// });

// export default function SideMenu() {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         display: { xs: "none", md: "block" },
//         [`& .${drawerClasses.paper}`]: {
//           backgroundColor: "#D9F3F9",
//           borderRadius: "20px",
//           p: 1,
//           height:'auto',
//           display:'flex',
//           flexDirection: "column",
//           justifyContent:'space-between',
//           bottom:'50px',
//           top:"50px" ,
//           left:"50px",

//         },
        
//         width: 300,
//         overflow:"hidden"
        
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           py: 2,
//           fontWeight: "bold",
//           fontSize: "18px",
//           color: "#0A2540",
//           mt: "calc(var(--template-frame-height, 0px) + 20px)",
//           p:2,

//         }}
//       >
//         <Link to="/dashboard" className="logo-icon">
//           <FlightTakeoffIcon icon="fa-solid fa-plane-departure "/> 
//           <h3>ABABIL HAJJ GROUP</h3>
//         </Link>
//         {/* <SelectContent sx={{ display: "block" }} /> */}
//       </Box>
//       {/* <MenuContent/> */}
//       <Box
//         sx={{
//           width: "100%", 
//           fontWeight: "bold",
//           fontSize: "18px",
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           p: 2,
//           gap:1.5,
//           overflow:"auto"
//         }}
//       >
//         <MenuContent />
//       </Box>
//       {/* <CardAlert /> */}
//       <Stack
//         direction="row"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           py: 2,
//           fontWeight: "bold",
//           fontSize: "18px",
//           color: "#0A2540", 
//           p: 2,
//           gap: 1,
//           // alignItems: "center",
//           borderTop: "1px solid",
//           borderColor: "divider",
//         }}
//       >
//         <Avatar
//           sizes="small"
//           alt="Riley Carter"
//           src="/static/images/avatar/7.jpg"
//           sx={{ width: 36, height: 36 }}
//         />
//         <Box sx={{ mr: "auto" , zIndex:"999"}}>
//           <Typography
//             variant="body2"
//             sx={{ fontWeight: 500, lineHeight: "16px" }}
//           >
//             Riley Carter
//           </Typography>
//           <Typography variant="caption" sx={{ color: "text.secondary" }}>
//             riley@email.com
//           </Typography>
//         </Box>
//         <OptionsMenu />
//       </Stack>
//     </Drawer>
//   );
// }


import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useTheme } from "@mui/material/styles"; // Import useTheme hook for theme detection
import MenuContent from "../MenuContent/MenuContent";
import OptionsMenu from "../OptionsMenu";
import './SideMenu.css';

const drawerWidth = 300;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  margin: 5,
  mt: 20,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#D9F3F9', // Dark mode background
    borderRadius: "20px",
    p: 1,
    height: 'auto',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    bottom: '50px',
    top: "50px",
    left: "50px",
  },
}));

export default function SideMenu() {
  const theme = useTheme(); // Access the current theme

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          fontWeight: "bold",
          fontSize: "18px",
          color: theme.palette.mode === 'dark' ? 'white' : '#0A2540', // Text color for dark mode
          mt: "calc(var(--template-frame-height, 0px) + 20px)",
          p: 2,
        }}
      >
        <Link to="/dashboard" className="logo-icon">
          <FlightTakeoffIcon /> 
          <h3>ABABIL HAJJ GROUP</h3>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          fontWeight: "bold",
          fontSize: "18px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          gap: 1.5,
          overflow: "auto",
          color: theme.palette.mode === 'dark' ? 'white' : '#0A2540', // Text color for dark mode
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          fontWeight: "bold",
          fontSize: "18px",
          color: theme.palette.mode === 'dark' ? 'white' : '#0A2540', // Text color for dark mode
          p: 2,
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto", zIndex: "999" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
