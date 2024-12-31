import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { useNavigate } from "react-router";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";

const CreateDeparture = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate();

  // State to store form values
  const [passportDetails, setPassportDetails] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [passportExpireDate, setPassportExpireDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [reference, setReference] = useState("");

  // Fetch data from the API (if needed for dynamic ID generation or other purposes)
  useEffect(() => {
    fetch("http://localhost:8000/userRows")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);  // Log or set data for further use
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

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
    reference: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};
  
    if (!reference.trim()) {
      newErrors.reference = "* Reference is required.";
    }
    if (!passportDetails.trim()) {
      newErrors.passportDetails = "* Passport details are required.";
    }
    if (!firstName.trim()) {
      newErrors.firstName = "* First name is required.";
    }
    if (!middleName.trim()) {
      newErrors.middleName = "* Middle name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "* Last name is required.";
    }
    if (!gender.trim()) {
      newErrors.gender = "* Gender is required.";
    }
    if (!passportNo.trim()) {
      newErrors.passportNo = "* Passport number is required.";
    } else if (!/^[A-Z0-9]{6,9}$/.test(passportNo)) {
      newErrors.passportNo = "* Invalid passport number format.";
    }
    if (!passportExpireDate.trim()) {
      newErrors.passportExpireDate = "* Passport expiry date is required.";
    } else if (new Date(passportExpireDate) <= new Date()) {
      newErrors.passportExpireDate = "* Passport expiry date must be in the future.";
    }
    if (!birthDate.trim()) {
      newErrors.birthDate = "* Birth date is required.";
    }
    if (!nationality.trim()) {
      newErrors.nationality = "* Nationality is required.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { passportDetails, firstName, middleName, lastName, gender, passportNo, passportExpireDate, birthDate, nationality, reference };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:8000/userRows", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Departure Data Saved Successfully");
          navigate("/umrah/departure");  // Redirect after successful form submission
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setPassportDetails("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setPassportNo("");
    setPassportExpireDate("");
    setBirthDate("");
    setNationality("");
    setReference("");
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
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3,}}>
                Add New Departure
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label htmlFor="reference">Reference</label>
                <select
                  id="reference"
                  name="reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                >
                  <option value="">Select Reference</option>
                  <option value="reference1">Reference 1</option>
                  <option value="reference2">Reference 2</option>
                </select>
                {errors.reference && <span className="error">{errors.reference}</span>}
              </div>
            </div>

            <div className="inputField">
              <label htmlFor="passportDetails">Passport Details</label>
              <textarea
                id="passportDetails"
                name="passportDetails"
                value={passportDetails}
                onChange={(e) => setPassportDetails(e.target.value)}
              ></textarea>
              {errors.passportDetails && <span className="error">{errors.passportDetails}</span>}
            </div>

            <div className="nameRow">
              <div className="inputField">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>

              <div className="inputField">
                <label htmlFor="middleName">Middle Name</label>
                <input
                  id="middleName"
                  name="middleName"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                {errors.middleName && <span className="error">{errors.middleName}</span>}
              </div>

              <div className="inputField">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>

              <div className="inputField">
                <label htmlFor="birthDate">Birth Date</label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                {errors.birthDate && <span className="error">{errors.birthDate}</span>}
              </div>

              <div className="inputField">
                <label htmlFor="nationality">Nationality</label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
                {errors.nationality && <span className="error">{errors.nationality}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label htmlFor="passportNo">Passport No</label>
                <input
                  id="passportNo"
                  name="passportNo"
                  type="text"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                />
                {errors.passportNo && <span className="error">{errors.passportNo}</span>}
              </div>

              <div className="inputField">
                <label htmlFor="passportExpireDate">Passport Expiry Date</label>
                <input
                  id="passportExpireDate"
                  name="passportExpireDate"
                  type="date"
                  value={passportExpireDate}
                  onChange={(e) => setPassportExpireDate(e.target.value)}
                />
                {errors.passportExpireDate && <span className="error">{errors.passportExpireDate}</span>}
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateDeparture;
