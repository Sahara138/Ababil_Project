import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import UserTab from "../../../Tabs/UserTab";

const ViewDeparture = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockDepartureData = {
    pilgrim: "John Doe",
    addressInBangladesh: "123, Main Street, Dhaka, Bangladesh",
    visaNumber: "VISA123456",
    visaExpireDate: "2025-12-31",
    visaType: "Tourist",
    visitPurpose: "Leisure",
    tripType: "Round-trip",
    agentName: "XYZ Travel Agency",
  };

  // Navigate back to the departure list
  const handleBack = () => {
    navigate("/departures/list");
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
          Departure Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Departure Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Pilgrim", value: mockDepartureData.pilgrim },
            { label: "Address in Bangladesh", value: mockDepartureData.addressInBangladesh },
            { label: "Visa Number", value: mockDepartureData.visaNumber },
            { label: "Visa Expiry Date", value: mockDepartureData.visaExpireDate },
            { label: "Visa Type", value: mockDepartureData.visaType },
            { label: "Visit Purpose", value: mockDepartureData.visitPurpose },
            { label: "Trip Type", value: mockDepartureData.tripType },
            { label: "Agent Name", value: mockDepartureData.agentName },
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
            onClick={() => navigate("/departures/update")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
          >
            Edit Departure
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewDeparture;
