import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams} from "react-router";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useTheme } from "@mui/material/styles"; // Import useTheme hook for theme detection
import MenuContent from "../MenuContent/MenuContent";
import OptionsMenu from "../OptionsMenu";
import './SideMenu.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



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
    backgroundColor: theme.palette.mode === 'dark' ? '#1B222A' : '#D9F3F9', // Dark mode background
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
  const {userId} = useParams()
  // const id = params.id;

  const theme = useTheme(); // Access the current theme
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken"); // Get token from localStorage
      console.log(token)
      if (!token) {
        navigate("/login");  // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/usersfind/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data.user)
        if (response.ok) {
          setUser(data.user);
          console.log(user)
        } else {
          toast.error(data.message || "Failed to fetch profile data.");
          // navigate("/login");
        }
      } catch (error) {
        toast.error("An error occurred while fetching profile.");
        navigate("/login");
      }
    };


    fetchProfile();
  }, [navigate]);


  return (
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          overflow: "hidden",
          boxShadow:3
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
            <FlightTakeoffIcon  style={{color: theme.palette.mode === 'dark' ? 'white' : '#0A2540'}}/> 
            <h3  style={{color: theme.palette.mode === 'dark' ? 'white' : '#0A2540'}}>ABABIL HAJJ GROUP</h3>
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
        {
          user &&
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
                  alt={user.name || "Riley Carter"}
                  src={user?.avatar || "/static/images/avatar/7.jpg"}
                  sx={{ width: 36, height: 36 }}
                />
              
                  <Box sx={{ mr: "auto", zIndex: "999" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, lineHeight: "16px" }}
                    >
                      { user?.name ||  "Guest user"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {user?.email || "guest@email.com"}
                    </Typography>
                  </Box>
                  
                
                <OptionsMenu />
              </Stack>
          
          
        }
      </Drawer>
    
  );
}
