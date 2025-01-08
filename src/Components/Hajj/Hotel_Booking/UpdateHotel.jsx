import { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { useNavigate, useParams } from "react-router";
import { useTheme } from "@emotion/react";
import './Hotel.css';
import HotelBookingTab from "../../../Tabs/HotelBookingTab";

const UpdateHotel = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate();
  const { id } = useParams(); // Get hotel ID from the URL

  // State to store form values
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [facilities, setFacilities] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [contact, setContact] = useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  // Fetch the hotel data from the API for updating (based on hotel ID)
  useEffect(() => {
    fetch(`http://localhost:8000/hotelRows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotelName(data.hotelName);
        setLocation(data.location);
        setRating(data.rating);
        setAvailableRooms(data.availableRooms);
        setFacilities(data.facilities);
        setPricePerNight(data.pricePerNight);
        setContact(data.contact);
      })
      .catch((err) => console.error("Error fetching hotel data:", err));
  }, [id]);

  // State to handle errors
  const [errors, setErrors] = useState({
    hotelName: "",
    location: "",
    rating: "",
    availableRooms: "",
    facilities: "",
    pricePerNight: "",
    contact: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!hotelName.trim()) {
      newErrors.hotelName = "* Hotel name is required.";
    }
    if (!location.trim()) {
      newErrors.location = "* Location is required.";
    }
    if (!rating.trim()) {
      newErrors.rating = "* Rating is required.";
    }
    if (!availableRooms.trim()) {
      newErrors.availableRooms = "* Available rooms are required.";
    }
    if (!facilities.trim()) {
      newErrors.facilities = "* Facilities are required.";
    }
    if (!pricePerNight.trim()) {
      newErrors.pricePerNight = "* Price per night is required.";
    }
    if (!contact.trim()) {
      newErrors.contact = "* Contact is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for updating hotel
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      hotelName,
      location,
      rating,
      availableRooms,
      facilities,
      pricePerNight,
      contact,
    };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch(`http://localhost:8000/hotelRows/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Hotel Updated Successfully");
          navigate("/hajj/hotelBooking"); // Redirect after successful form submission
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setHotelName("");
    setLocation("");
    setRating("");
    setAvailableRooms("");
    setFacilities("");
    setPricePerNight("");
    setContact("");
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
          Hotel Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7', // Adjust divider color
          }}
        />
        
        <div className="hotel-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <HotelRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3,}}>
                Update Hotel Details
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="hotelName">Hotel Name</label>
                <input
                  id="hotelName"
                  name="hotelName"
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
                {errors.hotelName && <span className="error">{errors.hotelName}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <span className="error">{errors.location}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="rating">Rating</label>
                <input
                  id="rating"
                  name="rating"
                  type="text"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                {errors.rating && <span className="error">{errors.rating}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="availableRooms">Available Rooms</label>
                <input
                  id="availableRooms"
                  name="availableRooms"
                  type="number"
                  value={availableRooms}
                  onChange={(e) => setAvailableRooms(e.target.value)}
                />
                {errors.availableRooms && <span className="error">{errors.availableRooms}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="facilities">Facilities</label>
                <input
                  id="facilities"
                  name="facilities"
                  type="text"
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                />
                {errors.facilities && <span className="error">{errors.facilities}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pricePerNight">Price Per Night</label>
                <input
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                />
                {errors.pricePerNight && <span className="error">{errors.pricePerNight}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="contact">Contact</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {errors.contact && <span className="error">{errors.contact}</span>}
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default UpdateHotel;
