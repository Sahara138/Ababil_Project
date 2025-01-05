import { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";
import Select from 'react-select';

const UpdateTicketRequisition = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { id } = useParams(); // Get ticket requisition ID from the URL

  // State to store form values
  const [agentName, setAgentName] = useState("");
  const [agentType, setAgentType] = useState("");
  const [pilgrimOrGroupName, setPilgrimOrGroupName] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // State to handle errors
  const [errors, setErrors] = useState({
    agentName: "",
    agentType: "",
    pilgrimOrGroupName: "",
    flightDate: "",
    returnDate: "",
  });
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

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

  // Fetch the existing data to populate the form
  useEffect(() => {
    fetch(`http://localhost:8000/ticketRequisitions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAgentName(data.agentName);
        setAgentType(data.agentType);
        setPilgrimOrGroupName(data.pilgrimOrGroupName);
        setFlightDate(data.flightDate);
        setReturnDate(data.returnDate);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  // Handle form submission (update ticket requisition)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { agentName, agentType, pilgrimOrGroupName, flightDate, returnDate };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch(`http://localhost:8000/ticketRequisitions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Ticket Requisition Updated Successfully");
          navigate("/umrah/ticketRequisition"); // Redirect after successful update
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
          backgroundColor: isDarkMode ? 'grey.900' : 'white',
          boxShadow: 3,
          marginBottom: '50px',
          color: isDarkMode ? 'grey.300' : 'grey.900',
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? 'grey.300' : 'inherit',
          }}
        >
          Ticket Requisition Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300',
          }}
        />
        
        <div className="pilgrim-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
            <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Update Ticket Requisition
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="agentName">Agent Name</label>
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
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="agentType">Agent Type</label>
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
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="pilgrimOrGroupName">Pilgrim or Group Name</label>
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
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="flightDate">Flight Date</label>
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
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="returnDate">Return Date</label>
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

export default UpdateTicketRequisition;
