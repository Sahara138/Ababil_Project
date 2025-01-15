import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate, useParams } from "react-router";
import EmployeeTab from "../../Tabs/EmployeeTab";
import { useEffect, useState } from "react";

const ViewEmployee = () => {
  const {_id} = useParams()
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [employeeData,setEmployeeData] = useState({})


  useEffect(()=>{
        fetch(`http://localhost:5000/api/auth/getemployee/${_id}`)
        .then((res)=> res.json())
        .then((data)=>{
          setEmployeeData(data)
          console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[_id])


  // Navigate back to the employee list
  const handleBack = () => {
    navigate("/employee/list");
  }; 
  
  const handleEdit = () => {
    navigate(`/employee/update/${_id}`);
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
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          {employeeData.employeePhoto ? (
            <img
              src={employeeData.employeePhoto}
              alt={`${employeeData.name}'s photo`}
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
        </Box> */}

        {/* Employee Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Name", value: employeeData.name },
            { label: "Father's Name", value: employeeData.fatherName },
            { label: "Mother's Name", value: employeeData.motherName },
            { label: "Gender", value: employeeData.gender },
            { label: "Birth Date", value: employeeData.birthOfDate },
            { label: "NID", value: employeeData.nid },
            { label: "Passport Number", value: employeeData.passportNo },
            { label: "Email", value: employeeData.email },
            { label: "Phone", value: employeeData.phone },
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
            Edit Profile
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewEmployee;
