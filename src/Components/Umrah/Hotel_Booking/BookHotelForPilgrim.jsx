import { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { useNavigate } from "react-router";

import { useTheme } from "@emotion/react";
import Select from 'react-select';
import HotelBookingTab from "../../../Tabs/HotelBookingTab";

const BookHotelForPilgrim = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate();

  // State to store form values
  const [pilgrim, setPilgrim] = useState("");
  const [hotel, setHotel] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const pilgrimOptions = [
    { value: "pilgrim1", label: "Pilgrim 1" },
    { value: "pilgrim2", label: "Pilgrim 2" },
    { value: "pilgrim3", label: "Pilgrim 3" },
    { value: "pilgrim4", label: "Pilgrim 4" },
  ];

  const hotelOptions = [
    { value: "hotel1", label: "Hotel 1" },
    { value: "hotel2", label: "Hotel 2" },
    { value: "hotel3", label: "Hotel 3" },
    { value: "hotel4", label: "Hotel 4" },
  ];

  // Fetch data from the API (if needed for dynamic ID generation or other purposes)
  useEffect(() => {
    fetch("http://localhost:8000/hotelRows")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log or set data for further use
      })
      .catch((err) => console.error("Error fetching hotel data:", err));
  }, []);

  // State to handle errors
  const [errors, setErrors] = useState({
    pilgrim: "",
    hotel: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    numberOfRooms: "",
    specialRequests: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!pilgrim.trim()) {
      newErrors.pilgrim = "* Pilgrim is required.";
    }
    if (!hotel.trim()) {
      newErrors.hotel = "* Hotel is required.";
    }
    if (!checkInDate.trim()) {
      newErrors.checkInDate = "* Check-in date is required.";
    }
    if (!checkOutDate.trim()) {
      newErrors.checkOutDate = "* Check-out date is required.";
    }
    if (!roomType.trim()) {
      newErrors.roomType = "* Room type is required.";
    }
    if (!numberOfRooms.trim()) {
      newErrors.numberOfRooms = "* Number of rooms is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      pilgrim,
      hotel,
      checkInDate,
      checkOutDate,
      roomType,
      numberOfRooms,
      specialRequests,
    };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:8000/bookHotel", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Hotel Booking Successful");
          navigate("/umrah/bookings"); // Redirect after successful form submission
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setPilgrim("");
    setHotel("");
    setCheckInDate("");
    setCheckOutDate("");
    setRoomType("");
    setNumberOfRooms("");
    setSpecialRequests("");
  };

  return (
    <div style={{ width: '100%' }}>
      <HotelBookingTab />
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
          color: isDarkMode ? '#99a1b7' : 'grey.900', // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? '#99a1b7' : 'inherit', // Adjust heading color for dark mode
          }}
        >
          Hotel Booking Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7', // Adjust divider color
          }}
        />
        
        <div className="hotel-booking" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <HotelRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3,}}>
                Book Hotel for Pilgrim
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pilgrim">Pilgrim</label>
                <Select
                  id="pilgrim"
                  name="pilgrim"
                  value={pilgrimOptions.find((option) => option.value === pilgrim)}
                  placeholder="Select Pilgrim"
                  options={pilgrimOptions}
                  onChange={(selectedOption) => setPilgrim(selectedOption.value)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                />
                {errors.pilgrim && <span className="error">{errors.pilgrim}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="hotel">Hotel</label>
                <Select
                  id="hotel"
                  name="hotel"
                  value={hotelOptions.find((option) => option.value === hotel)}
                  placeholder="Select Hotel"
                  options={hotelOptions}
                  onChange={(selectedOption) => setHotel(selectedOption.value)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                />
                {errors.hotel && <span className="error">{errors.hotel}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="checkInDate">Check-in Date</label>
                <input
                  id="checkInDate"
                  name="checkInDate"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
                {errors.checkInDate && <span className="error">{errors.checkInDate}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="checkOutDate">Check-out Date</label>
                <input
                  id="checkOutDate"
                  name="checkOutDate"
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
                {errors.checkOutDate && <span className="error">{errors.checkOutDate}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="roomType">Room Type</label>
                <input
                  id="roomType"
                  name="roomType"
                  type="text"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                />
                {errors.roomType && <span className="error">{errors.roomType}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="numberOfRooms">Number of Rooms</label>
                <input
                  id="numberOfRooms"
                  name="numberOfRooms"
                  type="number"
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(e.target.value)}
                />
                {errors.numberOfRooms && <span className="error">{errors.numberOfRooms}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="specialRequests">Special Requests</label>
                <input
                  id="specialRequests"
                  name="specialRequests"
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default BookHotelForPilgrim;
