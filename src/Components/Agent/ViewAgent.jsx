import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router";
import AgentTab from "../../Tabs/AgentTab";
import { useEffect, useState } from "react";

const ViewAgent = () => {
  const {_id} = useParams()
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [agentData,setAgentDate] = useState({})

  useEffect(()=>{
        fetch(`http://localhost:5000/api/auth/agents/${_id}`)
        .then((res)=> res.json())
        .then((data)=>{
          setAgentDate(data)
          console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[])
  // Static mock data
  // const agentData = {
  //   agentName: "Jane Doe",
  //   agentType: "Travel Agent",
  //   fatherName: "John Doe",
  //   motherName: "Mary Doe",
  //   dob: "1990-05-20",
  //   nid: "123456789",
  //   passportNumber: "AB1234567",
  //   passportExpiryDate: "2030-12-31",
  //   mobileNumber: "555-123-4567",
  //   ksaPhoneNumber: "+966-50-123-4567",
  //   email: "janedoe@example.com",
  //   agentPresentAddress: "123 Main St, City, Country",
  //   emergencyInformation: "Contact: 555-987-6543",
  //   agentPhoto: "https://via.placeholder.com/100",
  //   passportImage: "https://via.placeholder.com/100",
  //   nidImageFront: "https://via.placeholder.com/100",
  //   nidImageBack: "https://via.placeholder.com/100",
  //   payment: 1000,
  //   pilgrim: "50 Pilgrims",
  // };

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
          {agentData.agentPhoto ? (
            <img
              src={agentData.agentPhoto}
              alt={`${agentData.agentName}'s photo`}
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
            { label: "Agent Name", value: agentData.agentName },
            { label: "Agent Type", value: agentData.agentType },
            { label: "Father's Name", value: agentData.fatherName },
            { label: "Mother's Name", value: agentData.motherName },
            { label: "Date of Birth", value: agentData.dob },
            { label: "NID", value: agentData.nid },
            { label: "Passport Number", value: agentData.passportNumber },
            { label: "Passport Expiry Date", value: agentData.passportExpiryDate },
            { label: "Mobile Number", value: agentData.mobileNumber },
            { label: "KSA Phone Number", value: agentData.ksaPhoneNumber },
            { label: "Email", value: agentData.email },
            { label: "Present Address", value: agentData.agentPresentAddress },
            { label: "Emergency Information", value: agentData.emergencyInformation },
            { label: "Payment", value: `$${agentData.payment}` },
            { label: "Pilgrim", value: agentData.pilgrim },
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