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
// import axios from "../../Api/axios";

const UpdatePilgrim = () => {
  const theme = useTheme(); // Access the current theme

  const isDarkMode = theme.palette.mode === "dark"; // Check if the current theme is dark
  const {_id } = useParams();

  const navigate = useNavigate();
  const [reference, setReference] = useState("");
  const [trip, setTrip] = useState("");
  const [passportDetails, setPassportDetails] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [passportExpiredDate, setPassportExpiredDate] = useState("");

  const [errors, setErrors] = useState({
    reference: "",
    trip: "",
    passportDetails: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthday: "",
    nationality: "",
    passportNo: "",
    passportExpiredDate: "",
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
    fetch(`http://localhost:5000/api/auth/getpilgrimbyid/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReference(data.reference)
        setTrip(data.trip)
        setPassportDetails(data.passportDetails);
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setGender(data.gender);
        setBirthday(data.birthday);
        setNationality(data.nationality);
        setPassportNo(data.passportNo);
        setPassportExpiredDate(data.passportExpiredDate);
       
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [_id]);

  const validate = () => {
    const newErrors = {};

    // Validate each field
    if (!reference) {
      newErrors.reference = "* Reference is required.";
    }

    if (!firstName) {
      newErrors.firstName = "* First name is required.";
    }

    if (!lastName) {
      newErrors.lastName = "* Last name is required.";
    }

    if (!gender) {
      newErrors.gender = "* Gender is required.";
    }

    if (!birthday) {
      newErrors.birthday = "* Birth date is required.";
    }

    if (!nationality) {
      newErrors.nationality = "* Nationality is required.";
    }

    if (!passportNo) {
      newErrors.passportNo = "* Passport number is required.";
    } 
    // else if (!/^[A-Z0-9]{6,9}$/.test(passportNo)) {
    //   newErrors.passportNo = "* Invalid passport number format.";
    // }

    if (!passportExpiredDate) {
      newErrors.passportExpiredDate = "* Passport expiry date is required.";
    } else if (new Date(passportExpiredDate) <= new Date()) {
      newErrors.passportExpiredDate =
        "* Passport expiry date must be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Prepare the updated form data
  //   const updatedFormData = {
  //     reference,
  //     trip,
  //     passportDetails,
  //     firstName,
  //     middleName,
  //     lastName,
  //     gender,
  //     birthday,
  //     nationality,
  //     passportNo,
  //     passportExpiredDate,
  //   };

  //     try {
  //       console.log("Form Submitted:", updatedFormData);
  
  //       // Axios PUT request
  //       const response = await axios.put(
  //         `/getallpilgrim/${_id}`,
  //         updatedFormData,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  
  //       if (response.status === 200) {
  //         alert("User Data Updated Successfully");
  //         navigate("/umrah/pilgrim");
  //       } else {
  //         console.error("Unexpected response status:", response.status);
  //       }
  //     } catch (err) {
  //       console.error("Error updating data:", err.message);
  //     }
  // };

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
      birthday,
      nationality,
      passportNo,
      passportExpiredDate,
    };
    if (validate()) {
      console.log("Form Submitted:", updatedFormData);

      fetch(`http://localhost:5000/api/auth/updatepilgrimbyid/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();

        })
        .then((data) => {
          console.log("Response: ", data);
          alert("User Data Updated Successfully");
          navigate("/umrah/pilgrim");
        })
        .catch((err) => console.error("Error during update: ", err.message));
      }
    // try {
    //   const response = await fetch(`http://localhost:5000/api/auth/updatepilgrimbyid/${_id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedFormData),
    //   });
    
    //   if (!response.ok) {
    //     throw new Error("Failed to update pilgrim data");
    //   }
    
    //   alert("Pilgrim data updated successfully");
    //   navigate("/umrah/pilgrim");
    // } catch (error) {
    //   console.error("Error updating pilgrim data:", error.message);
    //   alert("An error occurred. Please try again.");
    // }
    // } else {
    //   console.log("Validation Failed");
    // }
  };

  const handleCancel = () => {
    navigate('/umrah/pilgrim')
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
          color: isDarkMode ? "#99a1b7" : "grey.900", // Adjust text color for dark mode
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? "#99a1b7" : "inherit", // Adjust heading color for dark mode
          }}
        >
          Pilgrim Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.700" : "#99a1b7", // Adjust divider color
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Reference
                </label>
                <Select
                  id="reference"
                  name="reference"
                  value={options.find((opt) => opt.value === reference)}

                  options={options}
                  placeholder="Search or Select Reference"
                  onChange={(option) => setReference(option.value)}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Trip
                </label>
                <Select
                  id="trip"
                  name="trip"
                  value={options.find((opt) => opt.value ===trip)}
                  options={options}
                  placeholder="Search or Select Trip"
                  onChange={(option) => setTrip(option.value)}
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
                style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  value={genderOption.find((opt) => opt.value === gender)}
                  options={genderOption}
                  placeholder="Select Gender"
                  onChange={(genderOption) => setGender(genderOption.value)}
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
                  htmlFor="birthday"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Birth Date
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                {errors.birthday && (
                  <span className="error">{errors.birthday}</span>
                )}
              </div>

              <div className="inputField">
                <label
                  htmlFor="nationality"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
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
                  htmlFor="passportExpiredDate"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Passport Expiry Date
                </label>
                <input
                  id="passportExpiredDate"
                  name="passportExpiredDate"
                  type="date"
                  value={passportExpiredDate}
                  onChange={(e) => setPassportExpiredDate(e.target.value)}
                />
                {errors.passportExpiredDate && (
                  <span className="error">{errors.passportExpiredDate}</span>
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
