import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import "../../Users/UserList/Users";
import "../../Users/AddNewuser/CreateUser";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import { Link, useNavigate, useParams } from "react-router";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";
import Select from "react-select";

const UpdatePilgrim = () => {
  const theme = useTheme(); // Access the current theme

  const isDarkMode = theme.palette.mode === "dark"; // Check if the current theme is dark

  const { user_id } = useParams();
  const navigate = useNavigate();
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
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];
  const genderOption = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Fetch existing data to generate the ID dynamically
  useEffect(() => {
    fetch("http://localhost:8000/userRows")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // const maxId = data.reduce((max, user) => Math.max(max, user.id), 0);
        // setId(maxId + 1); // Set the next ID
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

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
      newErrors.passportExpireDate =
        "* Passport expiry date must be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetch("http://localhost:8000/userRows/" + user_id)
      .then((res) => res.json())
      .then((data) => {
        setReference(data.reference);
        setTrip(data.trip);
        setPassportDetails(data.passportDetails);
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setGender(data.gender);
        setBirthDate(data.birthDate);
        setNationality(data.nationality);
        setPassportNo(data.passportNo);
        setPassportExpireDate(data.passportExpireDate);
        console.log(
          reference,
          trip,
          passportDetails,
          firstName,
          middleName,
          lastName,
          gender,
          birthDate,
          nationality,
          passportNo,
          passportExpireDate
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, such as API request or form validation
    const updatedFormData = {
      reference,
      trip,
      passportDetails,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      nationality,
      passportNo,
      passportExpireDate,
    };
    if (validate()) {
      console.log("Form Submitted:", updatedFormData);
      fetch("http://localhost:8000/userRows" + user_id, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((res) => {
          alert("User Data Updated Successfully");
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
    <div style={{ width: "100%" }}>
      <UmrahTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: "30px",
          borderColor: "transparent",
          backgroundColor: isDarkMode ? "grey.900" : "white", // Adjust for dark mode
          boxShadow: 3,
          marginBottom: "50px",
          color: isDarkMode ? "grey.300" : "grey.900", // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? "grey.300" : "inherit", // Adjust heading color for dark mode
          }}
        >
          Pilgrim Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.700" : "grey.300", // Adjust divider color
          }}
        />

        <div
          className="pilgrim-create"
          style={{
            width: "100%",
            maxWidth: { sm: "100%", md: "1700px" },
            marginBottom: "30px",
          }}
        >
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon" />
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Update Pilgrim
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label
                  htmlFor="reference"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Reference
                </label>
                <Select
                  id="reference"
                  name="reference"
                  value={reference}
                  options={options}
                  placeholder="Search or Select Reference"
                  onChange={(option) => setReference(option)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                ></Select>
                {errors.reference && (
                  <span className="error">{errors.reference}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="trip"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Trip
                </label>
                <Select
                  id="trip"
                  name="trip"
                  value={trip}
                  options={options}
                  placeholder="Search or Select Trip"
                  onChange={(option) => setTrip(option)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                ></Select>
                {errors.trip && <span className="error">{errors.trip}</span>}
              </div>
            </div>
            <div className="inputField">
              <label
                htmlFor="passportDetails"
                style={{ color: isDarkMode ? "grey.300" : "inherit" }}
              >
                Passport Details
              </label>
              <textarea
                id="passportDetails"
                name="passportDetails"
                value={passportDetails}
                onChange={(e) => setPassportDetails(e.target.value)}
              ></textarea>
              {errors.passportDetails && (
                <span className="error">{errors.passportDetails}</span>
              )}
            </div>

            <div className="nameRow">
              <div className="inputField">
                <label
                  htmlFor="firstName"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="middleName"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Middle Name
                </label>
                <input
                  id="middleName"
                  name="middleName"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                {errors.middleName && (
                  <span className="error">{errors.middleName}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="lastName"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label
                  htmlFor="gender"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  value={gender}
                  options={genderOption}
                  placeholder="Select Gender"
                  onChange={(genderOption) => setGender(genderOption)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                ></Select>
                {errors.gender && (
                  <span className="error">{errors.gender}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="birthDate"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Birth Date
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                {errors.birthDate && (
                  <span className="error">{errors.birthDate}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="nationality"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Nationality
                </label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
                {errors.nationality && (
                  <span className="error">{errors.nationality}</span>
                )}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label
                  htmlFor="passportNo"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Passport No
                </label>
                <input
                  id="passportNo"
                  name="passportNo"
                  type="text"
                  value={passportNo}
                  // style={{padding:"15px 0"}}
                  onChange={(e) => setPassportNo(e.target.value)}
                />
                {errors.passportNo && (
                  <span className="error">{errors.passportNo}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="passportExpireDate"
                  style={{ color: isDarkMode ? "grey.300" : "inherit" }}
                >
                  Passport Expiry Date
                </label>
                <input
                  id="passportExpireDate"
                  name="passportExpireDate"
                  type="date"
                  value={passportExpireDate}
                  onChange={(e) => setPassportExpireDate(e.target.value)}
                />
                {errors.passportExpireDate && (
                  <span className="error">{errors.passportExpireDate}</span>
                )}
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

export default UpdatePilgrim;
