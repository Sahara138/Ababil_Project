import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { useState } from "react";

const CreateTrip = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  // State to store form values
  const [tripId, setTripId] = useState("");
  const [tripName, setTripName] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("");
  const [destination, setDestination] = useState("");
  const [remarks, setRemarks] = useState("");

  // State to handle errors
  const [errors, setErrors] = useState({
    tripId: "",
    tripName: "",
    departureDate: "",
    returnDate: "",
    tripType: "",
    destination: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!tripId.trim()) {
      newErrors.tripId = "* Trip ID is required.";
    }
    if (!tripName.trim()) {
      newErrors.tripName = "* Trip Name is required.";
    }
    if (!departureDate.trim()) {
      newErrors.departureDate = "* Departure Date is required.";
    }
    if (!returnDate.trim()) {
      newErrors.returnDate = "* Return Date is required.";
    }
    if (!tripType.trim()) {
      newErrors.tripType = "* Trip Type is required.";
    }
    if (!destination.trim()) {
      newErrors.destination = "* Destination is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tripId,
      tripName,
      departureDate,
      returnDate,
      tripType,
      destination,
      remarks,
    };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:5000/api/auth/createtrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Trip Created Successfully");
          navigate("/umrah/trips"); // Redirect after successful creation
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setTripId("");
    setTripName("");
    setDepartureDate("");
    setReturnDate("");
    setTripType("");
    setDestination("");
    setRemarks("");
  };

  return (
    <div style={{ width: '100%' }}>
      <UmrahTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: '30px',
          borderColor: 'transparent',
          backgroundColor: isDarkMode ? 'grey.900' : 'white',
          boxShadow: 3,
          marginBottom: '50px',
          color: isDarkMode ? '#99a1b7' : 'grey.900',
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? '#99a1b7' : 'inherit',
          }}
        >
          Trip Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7',
          }}
        />
        
        <div className="trip-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Create Trip
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="tripType">Trip Type</label>
                <input
                  id="tripType"
                  name="tripType"
                  type="text"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                />
                {errors.tripType && <span className="error">{errors.tripType}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="tripName">Trip Name</label>
                <input
                  id="tripName"
                  name="tripName"
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
                {errors.tripName && <span className="error">{errors.tripName}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                  <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="destination">Destination</label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  {errors.destination && <span className="error">{errors.destination}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="departureDate">Departure Date</label>
                <input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                {errors.departureDate && <span className="error">{errors.departureDate}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="returnDate">Return Date</label>
                <input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                {errors.returnDate && <span className="error">{errors.returnDate}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows="4"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create Trip
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateTrip;