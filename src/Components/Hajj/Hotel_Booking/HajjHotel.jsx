// import "./Hotel.css";
// import { Button, Card, CardContent, Typography, CardActions } from "@mui/material";
// import { useEffect, useState } from "react";

// const Hotel = () => {
//   const [hotels, setHotels] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/hotels")
//       .then((res) => res.json())
//       .then((data) => {
//         setHotels(data);
//       })
//       .catch((err) => {
//         console.error(err.message);
//         // alert("Failed to fetch hotel data.");
//       });
//   }, []);

//   const ViewDetails = (id) => {
//     alert(`Viewing details for Hotel ID: ${id}`);
//     // Navigate to detailed page if required
//   };

//   return (
//     <div className="hotel-container">
//       <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
//         Hotel Management
//       </Typography>
//       <div className="hotel-grid">
//         {hotels.map((hotel) => (
//           <Card key={hotel.id} className="hotel-card">
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 {hotel.name}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Location:</strong> {hotel.location}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Rating:</strong> {hotel.rating} ★
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Available Rooms:</strong> {hotel.availableRooms}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Facilities:</strong> {hotel.facilities.join(", ")}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Price Per Night:</strong> ${hotel.pricePerNight}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 <strong>Contact:</strong> {hotel.contact}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button size="small" variant="outlined" onClick={() => ViewDetails(hotel.id)}>
//                 View Details
//               </Button>
//             </CardActions>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hotel;










import { useTheme } from "@emotion/react";
import "./Hotel.css";
import { Button, Card, CardContent, Typography, CardActions, Box, Divider } from "@mui/material";

import { useNavigate } from "react-router";
import HajjTabs from "../../../Tabs/HajjTabs";

const HajjHotel = () => {
  const theme = useTheme(); // Access the current theme
    
    const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
    const navigate = useNavigate()
  // const ViewDetails = (id) => {
  //   alert(`Viewing details for Hotel ID: ${id}`);
  // };
   const CreateHotel = () => {
    navigate('/hajj/hotelBooking/create')
  };


  return (
    <div style={{ width: '100%' }}>
      <HajjTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: '30px',
          borderColor: 'transparent',
          backgroundColor: isDarkMode ? 'grey.900' : 'white', // Adjust for dark mode
          boxShadow: 3,
          marginBottom: '50px',
          color: isDarkMode ? 'grey.300' : 'grey.900', // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
          }}
        >
          Hotel Management
        </Typography>
        
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
        <div className="info">
            <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
              Hotel Information
            </Typography>
            <Button variant="contained" onClick={() => CreateHotel()}>
              Add New Hotel
            </Button>
          </div>
        
          
          <div className="hotel-container">
            <div className="hotel-grid">
              {/* Card 1 */}
              <Card className="hotel-card">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Hotel Paradise
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> New York, USA
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Rating:</strong> 4.5 ★
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Available Rooms:</strong> 10
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Facilities:</strong> Wi-Fi, Swimming Pool, Gym
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price Per Night:</strong> $120
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Contact:</strong> +1 123-456-7890
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" variant="outlined">
                    View Details
                  </Button>
                  {/* <Button size="small" variant="outlined" onClick={() => ViewDetails(1)}>
                    View Details
                  </Button> */}
                </CardActions>
              </Card>

              {/* Card 2 */}
              <Card className="hotel-card">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Ocean View Resort
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> Miami, USA
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Rating:</strong> 4.8 ★
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Available Rooms:</strong> 15
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Facilities:</strong> Beachfront, Spa, Free Breakfast
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price Per Night:</strong> $180
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Contact:</strong> +1 987-654-3210
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined">
                      View Details
                  </Button>
                  {/* <Button size="small" variant="outlined" onClick={() => ViewDetails(2)}>
                    View Details
                  </Button> */}
                </CardActions>
              </Card>

              {/* Card 3 */}
              <Card className="hotel-card">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Mountain Retreat
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> Denver, USA
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Rating:</strong> 4.6 ★
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Available Rooms:</strong> 5
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Facilities:</strong> Hiking Trails, Fireplace, Free Wi-Fi
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price Per Night:</strong> $150
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Contact:</strong> +1 555-123-4567
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined">
                      View Details
                  </Button>
                  {/* <Button size="small" variant="outlined" onClick={() => ViewDetails(3)}>
                    View Details
                  </Button> */}
                </CardActions>
              </Card>
            </div>
          </div>
        </Box>
    </div>
  );
};

export default HajjHotel;

