import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import EmployeeTab from "../../Tabs/EmployeeTab";

const ViewEmployee = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockEmployeeData = {
    employeePhoto: "https://via.placeholder.com/100",
    name: "Jane Smith",
    designation: "Senior Developer",
    department: "IT",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    dateOfJoining: "2023-01-15",
  };

  // Navigate back to the employee list
  const handleBack = () => {
    navigate("/employees/list");
  };

  return (
    <div style={{ width: "100%" }}>
      <EmployeeTab />

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
          Employee Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Employee Photo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          {mockEmployeeData.employeePhoto ? (
            <img
              src={mockEmployeeData.employeePhoto}
              alt={`${mockEmployeeData.name}'s photo`}
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

        {/* Employee Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Name", value: mockEmployeeData.name },
            { label: "Designation", value: mockEmployeeData.designation },
            { label: "Department", value: mockEmployeeData.department },
            { label: "Email", value: mockEmployeeData.email },
            { label: "Phone", value: mockEmployeeData.phone },
            { label: "Date of Joining", value: mockEmployeeData.dateOfJoining },
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
            onClick={() => navigate("/employees/update")}
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

export default ViewEmployee;
