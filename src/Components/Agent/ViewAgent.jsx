import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import AgentTab from "../../Tabs/AgentTab";

const ViewAgent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockAgentData = {
    agentName: "Jane Doe",
    agentType: "Travel Agent",
    fatherName: "John Doe",
    motherName: "Mary Doe",
    dob: "1990-05-20",
    nid: "123456789",
    passportNumber: "AB1234567",
    passportExpiryDate: "2030-12-31",
    mobileNumber: "555-123-4567",
    ksaPhoneNumber: "+966-50-123-4567",
    email: "janedoe@example.com",
    agentPresentAddress: "123 Main St, City, Country",
    emergencyInformation: "Contact: 555-987-6543",
    agentPhoto: "https://via.placeholder.com/100",
    passportImage: "https://via.placeholder.com/100",
    nidImageFront: "https://via.placeholder.com/100",
    nidImageBack: "https://via.placeholder.com/100",
    payment: 1000,
    pilgrim: "50 Pilgrims",
  };

  // Navigate back to the agent list
  const handleBack = () => {
    navigate("/agents/list");
  };

  return (
    <div style={{ width: "100%" }}>
      <AgentTab />

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
          Agent Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Agent Photo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          {mockAgentData.agentPhoto ? (
            <img
              src={mockAgentData.agentPhoto}
              alt={`${mockAgentData.agentName}'s photo`}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `4px solid ${isDarkMode ? "#616161" : "#e0e0e0"}`,
              }}
            />
          ) : (
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: isDarkMode ? "grey.800" : "#eceff1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#757575",
              }}
            >
              N/A
            </Box>
          )}
        </Box>

        {/* Agent Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[ 
            { label: "Agent Name", value: mockAgentData.agentName },
            { label: "Agent Type", value: mockAgentData.agentType },
            { label: "Father's Name", value: mockAgentData.fatherName },
            { label: "Mother's Name", value: mockAgentData.motherName },
            { label: "Date of Birth", value: mockAgentData.dob },
            { label: "NID", value: mockAgentData.nid },
            { label: "Passport Number", value: mockAgentData.passportNumber },
            { label: "Passport Expiry Date", value: mockAgentData.passportExpiryDate },
            { label: "Mobile Number", value: mockAgentData.mobileNumber },
            { label: "KSA Phone Number", value: mockAgentData.ksaPhoneNumber },
            { label: "Email", value: mockAgentData.email },
            { label: "Present Address", value: mockAgentData.agentPresentAddress },
            { label: "Emergency Information", value: mockAgentData.emergencyInformation },
            { label: "Payment", value: `$${mockAgentData.payment}` },
            { label: "Pilgrim", value: mockAgentData.pilgrim },
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
            onClick={() => navigate("/agents/update")}
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

export default ViewAgent;