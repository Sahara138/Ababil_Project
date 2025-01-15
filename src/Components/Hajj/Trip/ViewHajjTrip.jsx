import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import HajjTabs from "../../../Tabs/HajjTabs";


const ViewHajjTrip = () => {
  const {_id} = useParams()
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [umrahTripData,setUmrahTripData] = useState({})

   useEffect(()=>{
        fetch(`http://localhost:5000/api/auth/getbyidtrip/${_id}`)
        .then((res)=> res.json())
        .then((data)=>{
          setUmrahTripData(data)
          console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[_id])

  // Navigate back to the trip list
  const handleBack = () => {
    navigate("/hajj/tript");
  };

  const handleEdit = () => {
    navigate(`/hajj/trip/update/${_id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <HajjTabs />

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
          Trip Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Trip Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Trip Number", value: umrahTripData.tripNumber },
            { label: "Expected Flight Date", value: umrahTripData.expectedFlightDate },
            { label: "Return Flight Date", value: umrahTripData.returnFlightDate },
            { label: "Duration of Stay", value: umrahTripData.durationOfStay },
            { label: "Stay First", value: umrahTripData.stayFirst },
            { label: "Booked Mecca Hotel", value: umrahTripData.bookedMeccaHotel ? "Yes" : "No" },
            { label: "Mecca Hotel", value: umrahTripData.meccaHotel },
            { label: "Duration of Mecca Stay", value: umrahTripData.durationOfMeccaStay },
            { label: "Booked Madina Hotel", value: umrahTripData.bookedMadinaHotel ? "Yes" : "No" },
            { label: "Madina Hotel", value: umrahTripData.madinaHotel },
            { label: "Duration of Madina Stay", value: umrahTripData.durationOfMadinaStay },
            { label: "Carrier", value: umrahTripData.carrier },
            { label: "Note", value: umrahTripData.note },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "grey.800" : "#f5f5f5",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "#b0bec5" : "#37474f",
                  marginBottom: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ color: isDarkMode ? "#e0e0e0" : "#616161" }}>
                {item.value || "N/A"}
              </Typography>
            </Box>
          ))}
        </Box>

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
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
          >
            Edit Trip
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewHajjTrip;
