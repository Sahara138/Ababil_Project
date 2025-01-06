import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import Select from 'react-select';

const CreateTicketRequisition = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate();

  // State to store form values
  const [agentName, setAgentName] = useState("");
  const [agentType, setAgentType] = useState("");
  const [pilgrimOrGroupName, setPilgrimOrGroupName] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
    
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  // State to handle errors
  const [errors, setErrors] = useState({
    agentName: "",
    agentType: "",
    pilgrimOrGroupName: "",
    flightDate: "",
    returnDate: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!agentName.trim()) {
      newErrors.agentName = "* Agent Name is required.";
    }
    if (!agentType.trim()) {
      newErrors.agentType = "* Agent Type is required.";
    }
    if (!pilgrimOrGroupName.trim()) {
      newErrors.pilgrimOrGroupName = "* Pilgrim or Group Name is required.";
    }
    if (!flightDate.trim()) {
      newErrors.flightDate = "* Flight Date is required.";
    }
    if (!returnDate.trim()) {
      newErrors.returnDate = "* Return Date is required.";
    } else if (new Date(returnDate) <= new Date(flightDate)) {
      newErrors.returnDate = "* Return Date must be after Flight Date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (create ticket requisition)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { agentName, agentType, pilgrimOrGroupName, flightDate, returnDate };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:8000/ticketRequisitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Ticket Requisition Created Successfully");
          navigate("/umrah/ticketRequisition"); // Redirect after successful creation
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setAgentName("");
    setAgentType("");
    setPilgrimOrGroupName("");
    setFlightDate("");
    setReturnDate("");
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
          backgroundColor: isDarkMode ? 'grey.900' : 'white', // Adjust for dark mode
          boxShadow: 3,
          marginBottom: '50px',
          color: isDarkMode ? '#99a1b7' : 'grey.900', // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? '#99a1b7' : 'inherit', // Adjust heading color for dark mode
          }}
        >
          Ticket Requisition Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7', // Adjust divider color
          }}
        />
        
        <div className="pilgrim-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Create Ticket Requisition
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentName">Agent Name</label>
                <input
                  id="agentName"
                  name="agentName"
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
                {errors.agentName && <span className="error">{errors.agentName}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentType">Agent Type</label>
                <Select
                  id="agentType"
                  name="agentType"
                  options={options}
                  type="text"
                  value={agentType}
                  onChange={(options) => setAgentType(options)}
                  placeholder="Select Agent Type"
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                />
                {errors.agentType && <span className="error">{errors.agentType}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pilgrimOrGroupName">Pilgrim or Group Name</label>
                <Select
                  id="pilgrimOrGroupName"
                  name="pilgrimOrGroupName"
                  options={options}
                  value={pilgrimOrGroupName}
                  onChange={(options) => setPilgrimOrGroupName(options)}
                  placeholder="Select Pilgrim or Group Name"
                  className="custom-select"
                  style={{
                          color: isDarkMode ? "black" : "inherit",
                        }}
                />
                {errors.pilgrimOrGroupName && <span className="error">{errors.pilgrimOrGroupName}</span>}

              </div>
              
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="flightDate">Flight Date</label>
                <input
                  id="flightDate"
                  name="flightDate"
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                />
                {errors.flightDate && <span className="error">{errors.flightDate}</span>}
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

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create Requisition
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateTicketRequisition;
