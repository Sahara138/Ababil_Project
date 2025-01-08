import { Box, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import UserTab from "../../../Tabs/UserTab";

const ViewHajjHotel = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data for the hotel
  const mockHotelData = {
    hotelName: "Hotel Paradise",
    location: "New York, USA",
    rating: "4.5 ★",
    availableRooms: 10,
    facilities: "Wi-Fi, Swimming Pool, Gym",
    pricePerNight: "$120",
    contact: "+1 123-456-7890",
  };

  // Navigate back to the hotel list
  const handleBack = () => {
    navigate("/hajj/hotelBooking");
  };

  return (
    <div style={{ width: "100%" }}>
      <UserTab />

      <Box
        sx={{
          padding: "30px",
          backgroundColor: isDarkMode ? "grey.800" : "white",
          boxShadow: 4,
          marginBottom: "50px",
          color: isDarkMode ? "#f0f0f0" : "grey.900",
          marginTop: 5,
          borderRadius: 3,
          margin: "30px auto",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 3,
            color: isDarkMode ? "#b0bec5" : "#263238",
          }}
        >
          Hotel Details
        </Typography>

        {/* Hotel Card */}
        <Card className="hotel-card" sx={{ marginBottom: "30px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {mockHotelData.hotelName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Location:</strong> {mockHotelData.location}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Rating:</strong> {mockHotelData.rating}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Available Rooms:</strong> {mockHotelData.availableRooms}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Facilities:</strong> {mockHotelData.facilities}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Price Per Night:</strong> {mockHotelData.pricePerNight}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Contact:</strong> {mockHotelData.contact}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined" onClick={() => navigate("/hotels/details")}>
              View Details
            </Button>
          </CardActions>
        </Card>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewHajjHotel;
