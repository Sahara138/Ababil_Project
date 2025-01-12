import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useEffect, useState } from "react";

const ViewPilgrim = () => {
  const {_id } = useParams();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [umrahPilgrimData,setUmrahPilgrimData] = useState({})

  useEffect(()=>{
    fetch(`http://localhost:5000/api/auth/getpilgrimbyid/${_id}`)
    .then((res)=> res.json())
    .then((data)=>{
      setUmrahPilgrimData(data)
      console.log(data)
    }).catch((err)=>{
        console.log(err.message)
    })
},[])

  // Navigate back to the pilgrim list
  const handleBack = () => {
    navigate("/umrah/pilgrim");
  };

  return (
    <div style={{ width: "100%" }}>
      <UmrahTabs />

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
          Pilgrim Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Pilgrim Details Grid */}
        {
          umrahPilgrimData && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 3,
              }}
            >
              {[
                { label: "Reference", value: umrahPilgrimData.reference },
                { label: "Trip", value: umrahPilgrimData.trip },
                { label: "Payment", value: umrahPilgrimData.payment },
                { label: "First Name", value:umrahPilgrimData.firstName },
                { label: "Middle Name", value: umrahPilgrimData.middleName },
                { label: "Last Name", value: umrahPilgrimData.lastName },
                { label: "Gender", value: umrahPilgrimData.gender },
                { label: "Birthday", value: umrahPilgrimData.birthday },
                { label: "Nationality", value: umrahPilgrimData.nationality },
                { label: "Passport No.", value: umrahPilgrimData.passportNo },
                { label: "Passport Expiry Date", value: umrahPilgrimData.passportExpiredDate },
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
          )
        }

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
            onClick={() => navigate("/pilgrims/update")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewPilgrim;
