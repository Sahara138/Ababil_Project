import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import "../../Users/UserList/Users"
import "../../Users/AddNewuser/AddNewUser";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import { Link, useNavigate } from "react-router";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";

const CreatePilgrim = () => {
  const theme = useTheme(); // Access the current theme
    
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const navigate = useNavigate()
  const [reference, setReference] = useState("");
  const [trip, setTrip] = useState("");
  const [passportDetails, setPassportDetails] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [passportExpireDate, setPassportExpireDate] = useState("");
 


   // Fetch existing data to generate the ID dynamically
  useEffect(() => {
    fetch("http://localhost:8000/userRows")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);
  const [errors, setErrors] = useState({
      reference: "",
      trip: "",
      passportDetails: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      nationality: "",
      passportNo: "",
      passportExpireDate: "",
  });

  const validate = () => {
    const newErrors = {};
  
    // Validate each field
    if (!reference.trim()) {
      newErrors.reference = "* Reference is required.";
    }
  
    if (!trip.trim()) {
      newErrors.trip = "* Trip is required.";
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
  
    if (!birthDate.trim()) {
      newErrors.birthDate = "* Birth date is required.";
    }
  
    if (!nationality.trim()) {
      newErrors.nationality = "* Nationality is required.";
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
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, such as API request or form validation
    const formData = { reference, trip,passportDetails,firstName,middleName,lastName, gender, birthDate,nationality,passportNo,passportExpireDate }
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
            alert("User Data Saved Successfully");
            navigate("/umrah/pilgrim");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("Validation Failed");
      }
  };



  const handleCancel = () => {
    // Reset all fields if user clicks on Cancel
    setReference("");
    setTrip("");
    setPassportDetails("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setBirthDate("");
    setNationality("");
    setPassportNo("");
    setPassportExpireDate("");
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
          Pilgrim Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
        
        <div
            className="pilgrim-create"
            style={{
              width: "100%",
              maxWidth: { sm: "100%", md: "1700px" },
              marginBottom:"30px",
            }}
          >
            <div style={{ height: "auto", width: "100%" }}>
              <div className="info">
                <ContactsRoundedIcon className="title-icon"/>
                <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3,}}>
                  Add New Pilgrim
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

                  <div className="inputField">
                    <label htmlFor="trip">Trip</label>
                    <select
                      id="trip"
                      name="trip"
                      value={trip}
                      onChange={(e) => setTrip(e.target.value)}
                    >
                      <option value="">Select Trip</option>
                      <option value="trip1">Trip 1</option>
                      <option value="trip2">Trip 2</option>
                    </select>
                    {errors.trip && <span className="error">{errors.trip}</span>}
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
                  <Button type="submit" variant="contained" >
                    Save
                  </Button>
                </div>
    </form>
            {/* <form onSubmit={handleSubmit}>
                  <div className="inputField">
                    <label htmlFor="id">User ID</label>
                    <input
                      id="id"
                      type="number"
                      name="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                    {errors.userName && <span className="error">{errors.id}</span>}
                  </div>
                  <div className="inputField">
                    <label htmlFor="userName">User Name</label>
                    <input
                      id="userName"
                      type="text"
                      name="userName"
                      value={userName}
                      // onChange={handleChange}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.userName && (
                      <span className="error">{errors.userName}</span>
                    )}
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="inputField">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      // onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>
                  <div className="inputField statusInput">
                    <label>Status:</label>
                    <select
                      id="status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      // onChange={handleChange}
                    >
                      <option value="deactive">Deactive</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                  <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                    Save
                  </Button>
            </form> */}
          </div>
      </Box>
    </div>

  );
};

export default CreatePilgrim;
