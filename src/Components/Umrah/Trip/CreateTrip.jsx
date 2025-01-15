// import { Box, Button, Divider, Typography } from "@mui/material";
// import { useNavigate } from "react-router";
// import UmrahTabs from "../../../Tabs/UmrahTabs";
// import { useTheme } from "@emotion/react";
// import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
// import { useState } from "react";

// const CreateTrip = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';
//   const navigate = useNavigate();

//   // State to store form values
//   const [tripId, setTripId] = useState("");
//   const [tripName, setTripName] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [tripType, setTripType] = useState("");
//   const [destination, setDestination] = useState("");
//   const [remarks, setRemarks] = useState("");

//   // State to handle errors
//   const [errors, setErrors] = useState({
//     tripId: "",
//     tripName: "",
//     departureDate: "",
//     returnDate: "",
//     tripType: "",
//     destination: "",
//   });

//   // Validation logic
//   const validate = () => {
//     const newErrors = {};

//     if (!tripId.trim()) {
//       newErrors.tripId = "* Trip ID is required.";
//     }
//     if (!tripName.trim()) {
//       newErrors.tripName = "* Trip Name is required.";
//     }
//     if (!departureDate.trim()) {
//       newErrors.departureDate = "* Departure Date is required.";
//     }
//     if (!returnDate.trim()) {
//       newErrors.returnDate = "* Return Date is required.";
//     }
//     if (!tripType.trim()) {
//       newErrors.tripType = "* Trip Type is required.";
//     }
//     if (!destination.trim()) {
//       newErrors.destination = "* Destination is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       tripId,
//       tripName,
//       departureDate,
//       returnDate,
//       tripType,
//       destination,
//       remarks,
//     };
//     if (validate()) {
//       console.log("Form Submitted:", formData);
//       fetch("http://localhost:5000/api/auth/createtrip", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((res) => {
//           alert("Trip Created Successfully");
//           navigate("/umrah/trips"); // Redirect after successful creation
//         })
//         .catch((err) => console.log(err.message));
//     } else {
//       console.log("Validation Failed");
//     }
//   };

//   // Handle cancel action (reset form fields)
//   const handleCancel = () => {
//     setTripId("");
//     setTripName("");
//     setDepartureDate("");
//     setReturnDate("");
//     setTripType("");
//     setDestination("");
//     setRemarks("");
//   };

//   return (
//     <div style={{ width: '100%' }}>
//       <UmrahTabs />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: '30px',
//           borderColor: 'transparent',
//           backgroundColor: isDarkMode ? 'grey.900' : 'white',
//           boxShadow: 3,
//           marginBottom: '50px',
//           color: isDarkMode ? '#99a1b7' : 'grey.900',
//         }}
//       >
//         <Typography
//           component="h4"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? '#99a1b7' : 'inherit',
//           }}
//         >
//           Trip Management
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7',
//           }}
//         />
        
//         <div className="trip-create" style={{ width: "100%" }}>
//           <div style={{ height: "auto", width: "100%" }}>
//             <div className="info">
//               <ContactsRoundedIcon className="title-icon"/>
//               <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
//                 Create Trip
//               </Typography>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="tripType">Trip Type</label>
//                 <input
//                   id="tripType"
//                   name="tripType"
//                   type="text"
//                   value={tripType}
//                   onChange={(e) => setTripType(e.target.value)}
//                 />
//                 {errors.tripType && <span className="error">{errors.tripType}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="tripName">Trip Name</label>
//                 <input
//                   id="tripName"
//                   name="tripName"
//                   type="text"
//                   value={tripName}
//                   onChange={(e) => setTripName(e.target.value)}
//                 />
//                 {errors.tripName && <span className="error">{errors.tripName}</span>}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                   <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="destination">Destination</label>
//                   <input
//                     id="destination"
//                     name="destination"
//                     type="text"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                   />
//                   {errors.destination && <span className="error">{errors.destination}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="departureDate">Departure Date</label>
//                 <input
//                   id="departureDate"
//                   name="departureDate"
//                   type="date"
//                   value={departureDate}
//                   onChange={(e) => setDepartureDate(e.target.value)}
//                 />
//                 {errors.departureDate && <span className="error">{errors.departureDate}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="returnDate">Return Date</label>
//                 <input
//                   id="returnDate"
//                   name="returnDate"
//                   type="date"
//                   value={returnDate}
//                   onChange={(e) => setReturnDate(e.target.value)}
//                 />
//                 {errors.returnDate && <span className="error">{errors.returnDate}</span>}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="remarks">Remarks</label>
//                 <textarea
//                   id="remarks"
//                   name="remarks"
//                   rows="4"
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="formActions">
//               <Button type="button" onClick={handleCancel} variant="outlined">
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained">
//                 Create Trip
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default CreateTrip;










import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { toast } from "react-toastify";

const CreateTrip = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // State for form values
  const [tripNumber, setTripNumber] = useState("");
  const [expectedFlightDate, setExpectedFlightDate] = useState("");
  const [returnFlightDate, setReturnFlightDate] = useState("");
  const [durationOfStay, setDurationOfStay] = useState("");
  const [stayFirst, setStayFirst] = useState("");
  const [bookedMeccaHotel, setBookedMeccaHotel] = useState(false);
  const [meccaHotel, setMeccaHotel] = useState("");
  const [durationOfMeccaStay, setDurationOfMeccaStay] = useState("");
  const [bookedMadinaHotel, setBookedMadinaHotel] = useState(false);
  const [madinaHotel, setMadinaHotel] = useState("");
  const [durationOfMadinaStay, setDurationOfMadinaStay] = useState("");
  const [carrier, setCarrier] = useState("");
  const [note, setNote] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!tripNumber.trim()) newErrors.tripNumber = "* Trip Number is required.";
    if (!expectedFlightDate.trim()) newErrors.expectedFlightDate = "* Expected Flight Date is required.";
    if (!returnFlightDate.trim()) newErrors.returnFlightDate = "* Return Flight Date is required.";
    if (!durationOfStay || durationOfStay <= 0) newErrors.durationOfStay = "* Duration of Stay must be positive.";
    if (!stayFirst.trim()) newErrors.stayFirst = "* Stay First is required.";
    if (!carrier.trim()) newErrors.carrier = "* Carrier is required.";

    if (bookedMeccaHotel) {
      if (!meccaHotel.trim()) newErrors.meccaHotel = "* Mecca Hotel is required.";
      if (!durationOfMeccaStay || durationOfMeccaStay <= 0) newErrors.durationOfMeccaStay = "* Duration must be positive.";
    }

    if (bookedMadinaHotel) {
      if (!madinaHotel.trim()) newErrors.madinaHotel = "* Madina Hotel is required.";
      if (!durationOfMadinaStay || durationOfMadinaStay <= 0) newErrors.durationOfMadinaStay = "* Duration must be positive.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      tripNumber,
      expectedFlightDate,
      returnFlightDate,
      durationOfStay,
      stayFirst,
      bookedMeccaHotel,
      meccaHotel: bookedMeccaHotel ? meccaHotel : "",
      durationOfMeccaStay: bookedMeccaHotel ? durationOfMeccaStay : "",
      bookedMadinaHotel,
      madinaHotel: bookedMadinaHotel ? madinaHotel : "",
      durationOfMadinaStay: bookedMadinaHotel ? durationOfMadinaStay : "",
      carrier,
      note,
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
          toast("Trip Created Successfully");
          navigate("/hajj/trip");
        })
        .catch((err) => console.error(err.message));
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setTripNumber("");
    setExpectedFlightDate("");
    setReturnFlightDate("");
    setDurationOfStay("");
    setStayFirst("");
    setBookedMeccaHotel(false);
    setMeccaHotel("");
    setDurationOfMeccaStay("");
    setBookedMadinaHotel(false);
    setMadinaHotel("");
    setDurationOfMadinaStay("");
    setCarrier("");
    setNote("");
  };

  return (
    <div style={{ width: "100%" }}>
      <UmrahTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: "30px",
          borderColor: "transparent",
          backgroundColor: isDarkMode ? "grey.900" : "white",
          boxShadow: 3,
          marginBottom: "50px",
          color: isDarkMode ? "#99a1b7" : "grey.900",
        }}
      >
        <Typography component="h4" variant="h6" sx={{ mt: 2, mb: 3, fontSize: 25 }}>
          Trip Management
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.700" : "#99a1b7" }} />
        <div className="info">
            <ContactsRoundedIcon className="title-icon" />
            <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
              Add New Trip
            </Typography>
          </div>
        <form onSubmit={handleSubmit}>
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="tripNumber">Trip Number</label>
              <input
                id="tripNumber"
                type="text"
                value={tripNumber}
                onChange={(e) => setTripNumber(e.target.value)}
              />
              {errors.tripNumber && <span className="error">{errors.tripNumber}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="expectedFlightDate">Expected Flight Date</label>
              <input
                id="expectedFlightDate"
                type="date"
                value={expectedFlightDate}
                onChange={(e) => setExpectedFlightDate(e.target.value)}
              />
              {errors.expectedFlightDate && <span className="error">{errors.expectedFlightDate}</span>}
            </div>
          </div>
          
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="returnFlightDate">Return Flight Date</label>
              <input
                id="returnFlightDate"
                type="date"
                value={returnFlightDate}
                onChange={(e) => setReturnFlightDate(e.target.value)}
              />
              {errors.returnFlightDate && <span className="error">{errors.returnFlightDate}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="durationOfStay">Duration of Stay (days)</label>
              <input
                id="durationOfStay"
                type="number"
                value={durationOfStay}
                onChange={(e) => setDurationOfStay(e.target.value)}
              />
              {errors.durationOfStay && <span className="error">{errors.durationOfStay}</span>}
            </div>
          </div>

          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="stayFirst">Stay First</label>
              <input
                id="stayFirst"
                type="text"
                value={stayFirst}
                onChange={(e) => setStayFirst(e.target.value)}
              />
              {errors.stayFirst && <span className="error">{errors.stayFirst}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="carrier">Carrier</label>
              <input
                id="carrier"
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
              />
              {errors.carrier && <span className="error">{errors.carrier}</span>}
            </div>
          </div>

          <div className="infoRow">
            <div className="inputField">
              <label>
                <input
                  type="checkbox"
                  checked={bookedMeccaHotel}
                  onChange={(e) => setBookedMeccaHotel(e.target.checked)}
                />{" "}
                Booked Mecca Hotel
              </label>
            </div>
            {bookedMeccaHotel && (
              <>
                <div className="inputField">
                  <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="meccaHotel">Mecca Hotel</label>
                  <input
                    id="meccaHotel"
                    type="text"
                    value={meccaHotel}
                    onChange={(e) => setMeccaHotel(e.target.value)}
                  />
                  {errors.meccaHotel && <span className="error">{errors.meccaHotel}</span>}
                </div>
                <div className="inputField">
                  <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="durationOfMeccaStay">Duration of Mecca Stay (days)</label>
                  <input
                    id="durationOfMeccaStay"
                    type="number"
                    value={durationOfMeccaStay}
                    onChange={(e) => setDurationOfMeccaStay(e.target.value)}
                  />
                  {errors.durationOfMeccaStay && <span className="error">{errors.durationOfMeccaStay}</span>}
                </div>
              </>
            )}
          </div>

          <div className="infoRow">
            <div className="inputField">
              <label>
                <input
                  type="checkbox"
                  checked={bookedMadinaHotel}
                  onChange={(e) => setBookedMadinaHotel(e.target.checked)}
                />{" "}
                Booked Madina Hotel
              </label>
            </div>
            {bookedMadinaHotel && (
              <>
                <div className="inputField">
                  <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="madinaHotel">Madina Hotel</label>
                  <input
                    id="madinaHotel"
                    type="text"
                    value={madinaHotel}
                    onChange={(e) => setMadinaHotel(e.target.value)}
                    />
                    {errors.madinaHotel && <span className="error">{errors.madinaHotel}</span>}
                  </div>
                  <div className="inputField">
                    <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="durationOfMadinaStay">Duration of Madina Stay (days)</label>
                    <input
                      id="durationOfMadinaStay"
                      type="number"
                      value={durationOfMadinaStay}
                      onChange={(e) => setDurationOfMadinaStay(e.target.value)}
                    />
                    {errors.durationOfMadinaStay && <span className="error">{errors.durationOfMadinaStay}</span>}
                  </div>
                </>
              )}
            </div>
      
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}  htmlFor="note">Note</label>
                <textarea
                  id="note"
                  rows="4"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: "100%" }}
                ></textarea>
              </div>
            </div>
      
            <div className="formActions">
              <Button type="button" variant="outlined" onClick={handleCancel} sx={{ mt: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Save
              </Button>
            </div>
          </form>
        </Box>
      </div>
      ); 
    };

  export default CreateTrip;