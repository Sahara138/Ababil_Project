import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import HajjTabs from "../../../Tabs/HajjTabs";

const ViewHajjPilgrim = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockPilgrimData = {
    reference: "REF12345",
    trip: "Hajj 2025",
    payment: "$5000",
    firstName: "Ahmed",
    middleName: "Ibrahim",
    lastName: "Khan",
    gender: "Male",
    birthday: "1985-05-20",
    nationality: "Saudi Arabian",
    passportNo: "A12345678",
    passportExpiredDate: "2030-12-31",
  };

  // Navigate back to the pilgrim list
  const handleBack = () => {
    navigate("/pilgrims/list");
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
          Pilgrim Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Pilgrim Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Reference", value: mockPilgrimData.reference },
            { label: "Trip", value: mockPilgrimData.trip },
            { label: "Payment", value: mockPilgrimData.payment },
            { label: "First Name", value: mockPilgrimData.firstName },
            { label: "Middle Name", value: mockPilgrimData.middleName },
            { label: "Last Name", value: mockPilgrimData.lastName },
            { label: "Gender", value: mockPilgrimData.gender },
            { label: "Birthday", value: mockPilgrimData.birthday },
            { label: "Nationality", value: mockPilgrimData.nationality },
            { label: "Passport No.", value: mockPilgrimData.passportNo },
            { label: "Passport Expiry Date", value: mockPilgrimData.passportExpiredDate },
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

export default ViewHajjPilgrim;
