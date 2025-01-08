import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { useNavigate, useParams } from "react-router";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";
import Select from 'react-select';

const UpdateDeparture = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you have an ID param for the departure to update

  // State to store form values
  const [pilgrim, setPilgrim] = useState("");
  const [addressInBangladesh, setAddressInBangladesh] = useState("");
  const [visaNumber, setVisaNumber] = useState("");
  const [visaExpireDate, setVisaExpireDate] = useState("");
  const [visaType, setVisaType] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [tripType, setTripType] = useState("");
  const [agentName, setAgentName] = useState("");

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  // State to handle errors
  const [errors, setErrors] = useState({
    passportDetails: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    passportNo: "",
    passportExpireDate: "",
    birthDate: "",
    nationality: "",
    pilgrim: "",
  });

  // Fetch the current departure details by ID to populate the form (assuming a GET request by ID)
  useEffect(() => {
    fetch(`http://localhost:8000/userRows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAgentName(data.agentName || "");
        setTripType(data.tripType || "");
        setAddressInBangladesh(data.addressInBangladesh || "");
        setPilgrim(data.pilgrim || "");
        setVisaNumber(data.visaNumber || "");
        setVisaType(data.visaType|| "");
        setVisaExpireDate(data.visaExpireDate || "");
        setVisitPurpose(data.visitPurpose|| "");
        
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [id]);

  // Validation logic
  const validate = () => {
    const newErrors = {};
  
    if (!pilgrim.trim()) {
      newErrors.pilgrim = "* Pilgrim is required.";
    }
    if (!agentName.trim()) {
      newErrors.passportDetails = "* Agent Name are required.";
    }
    if (!tripType.trim()) {
      newErrors.firstName = "* Trip Type is required.";
    }
    if (!visaNumber.trim()) {
      newErrors.middleName = "* Visa Number is required.";
    }
    if (!addressInBangladesh.trim()) {
      newErrors.lastName = "* Address In Bangladesh is required.";
    }
    if (!visaType.trim()) {
      newErrors.gender = "* Visa Type is required.";
    }
    if (!visaNumber.trim()) {
      newErrors.visaNumber= "*Visa number is required.";
    } else if (!/^[A-Z0-9]{6,9}$/.test(visaNumber)) {
      newErrors.visaNumber = "* Invalid Visa Number format.";
    }
    if (!visaExpireDate.trim()) {
      newErrors.visaExpireDate = "* Visa expiry date is required.";
    } else if (new Date(visaExpireDate) <= new Date()) {
      newErrors.visaExpireDate = "* Visa expiry date must be in the future.";
    }
 
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (update data)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      pilgrim,
      addressInBangladesh,
      visaNumber,
      visaExpireDate,
      visaType,
      visitPurpose,
      tripType,
      agentName,
    };if (validate()) {
      console.log("Form Submitted:", formData);
      fetch(`http://localhost:8000/userRows/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Departure Data Updated Successfully");
          navigate("/hajj/departure"); // Redirect after successful update
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setPilgrim("");
     setAddressInBangladesh("");
     setVisaNumber("");
     setVisaExpireDate("");
     setVisaType("");
     setVisitPurpose("");
     setTripType("");
     setAgentName("");
  };

  return (
    <div style={{ width: '100%' }}>
      <HajjTabs />
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
          color: isDarkMode ? 'grey.300' : 'grey.900', // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
          }}
        >
          Departure Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
        
        <div className="pilgrim-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3, }}>
                Update Departure
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
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="tripType">Trip Type</label>
                  <Select
                    id="tripType"
                    name="tripType"
                    value={options.find((option) => option.value === tripType)}
                    placeholder="Select Trip Type"
                    options={options}
                    onChange={(selectedOption) => setTripType(selectedOption.value)}
                    className="custom-select"
                    style={{
                      color: isDarkMode ? "black" : "inherit",
                    }}
                  />
                  {errors.tripType && <span className="error">{errors.tripType}</span>}
                </div>
              </div>
              <div className="infoRow">
                <div className="inputField">
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="pilgrim">Pilgrim</label>
                  <Select
                    id="pilgrim"
                    name="pilgrim"
                    value={options.find((option) => option.value === pilgrim)}
                    placeholder="Select Pilgrim"
                    options={options}
                    onChange={(selectedOption) => setPilgrim(selectedOption.value)}
                    className="custom-select"
                    style={{
                      color: isDarkMode ? "black" : "inherit",
                    }}
                  />
                  {errors.pilgrim && <span className="error">{errors.pilgrim}</span>}
                </div>

                <div className="inputField">
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="addressInBangladesh">Address in Bangladesh</label>
                  <Select
                    id="addressInBangladesh"
                    name="addressInBangladesh"
                    value={options.find((option) => option.value === addressInBangladesh)}
                    placeholder="Select Address"
                    options={options}
                    onChange={(selectedOption) =>
                      setAddressInBangladesh(selectedOption.value)
                    }
                    className="custom-select"
                    style={{
                      color: isDarkMode ? "black" : "inherit",
                    }}
                  />
                  {errors.addressInBangladesh && <span className="error">{errors.addressInBangladesh}</span>}
                </div>
              </div>
              <div className="infoRow">
                <div className="inputField">
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="visaNumber">Visa Number</label>
                  <input
                    id="visaNumber"
                    name="visaNumber"
                    type="text"
                    value={visaNumber}
                    onChange={(e) => setVisaNumber(e.target.value)}
                  />
                  {errors.visaNumber && <span className="error">{errors.visaNumber}</span>}
                </div>

                <div className="inputField">
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="visaExpireDate">Visa Expiry Date</label>
                  <input
                    id="visaExpireDate"
                    name="visaExpireDate"
                    type="date"
                    value={visaExpireDate}
                    onChange={(e) => setVisaExpireDate(e.target.value)}
                  />
                  {errors.visaExpireDate && <span className="error">{errors.visaExpireDate}</span>}
                </div>

                <div className="inputField">
                  <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="visaType">Visa Type</label>
                  <Select
                    id="visaType"
                    name="visaType"
                    value={options.find((option) => option.value === visaType)}
                    placeholder="Select Visa Type"
                    options={options}
                    className="custom-select"
                    style={{
                      color: isDarkMode ? "black" : "inherit",
                    }}
                    onChange={(selectedOption) => setVisaType(selectedOption.value)}
                  />
                  {errors.visaType && <span className="error">{errors.visaType}</span>}
                </div>
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }} htmlFor="visitPurpose">Visit Purpose</label>
                <textarea
                  id="visitPurpose"
                  name="visitPurpose"
                  value={visitPurpose}
                  onChange={(e) => setVisitPurpose(e.target.value)}
                ></textarea>
                {errors.visitPurpose && <span className="error">{errors.visitPurpose}</span>}
              </div>
            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default UpdateDeparture;
