// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Divider,
//   FormControl,
//   FormLabel,
//   Typography,
// } from "@mui/material";
// import "../../Users/UserList/Users";
// import "../../Users/AddNewuser/CreateUser";
// import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
// import { useNavigate } from "react-router";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import HajjTabs from "../../../Tabs/HajjTabs";
// import { useTheme } from "@emotion/react";
// import Select from "react-select";

// const CreatePilgrim = () => {
//   const theme = useTheme(); // Access the current theme

//   const isDarkMode = theme.palette.mode === "dark"; // Check if the current theme is dark
//   const navigate = useNavigate();
//   const [reference, setReference] = useState("");
//   const [trip, setTrip] = useState("");
//   const [payment, setPayment] = useState(0);
//   // const [payment, setPayment] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [gender, setGender] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [passportNo, setPassportNo] = useState("");
//   const [passportExpiredDate, setPassportExpiredDate] = useState("");

//   const options = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//     { value: "option4", label: "Option 4" },
//   ];
//   const genderOption = [
//     { value: "male", label: "Male" },
//     { value: "female", label: "Female" },
//     { value: "other", label: "Other" },
//   ];

//   // Fetch existing data to generate the ID dynamically
//   useEffect(() => {
//     fetch("http://192.168.0.100:5000/api/auth/createpilgrim")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => console.error("Error fetching user data:", err));
//   }, []);
//   const [errors, setErrors] = useState({
//     reference: "",
//     trip: "",
//     payment: "",
//     // payment: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     gender: "",
//     birthday: "",
//     nationality: "",
//     passportNo: "",
//     passportExpiredDate: "",
//   });

//   const validate = () => {
//     const newErrors = {};

//     // Validate each field
//     if (!reference) {
//       newErrors.reference = "* Reference is required.";
//     }

//     if (!trip) {
//       newErrors.trip = "* Trip is required.";
//     }

//     // if (!payment.trim()) {
//     //   newErrors.payment = "* Passport details are required.";
//     // }
//     if (!payment.trim()) {
//       newErrors.payment = "* Payment are required.";
//     }

//     if (!firstName.trim()) {
//       newErrors.firstName = "* First name is required.";
//     }

//     if (!middleName.trim()) {
//       newErrors.middleName = "* Middle name is required.";
//     }

//     if (!lastName.trim()) {
//       newErrors.lastName = "* Last name is required.";
//     }

//     if (!gender) {
//       newErrors.gender = "* Gender is required.";
//     }

//     if (!birthday.trim()) {
//       newErrors.birthday = "* Birth date is required.";
//     }

//     if (!nationality.trim()) {
//       newErrors.nationality = "* Nationality is required.";
//     }

//     if (!passportNo.trim()) {
//       newErrors.passportNo = "* Passport number is required.";
//     } else if (!/^[A-Z0-9]{6,9}$/.test(passportNo)) {
//       newErrors.passportNo = "* Invalid passport number format.";
//     }

//     if (!passportExpiredDate.trim()) {
//       newErrors.passportExpiredDate = "* Passport expiry date is required.";
//     } else if (new Date(passportExpiredDate) <= new Date()) {
//       newErrors.passportExpiredDate =
//         "* Passport expiry date must be in the future.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Handle form submission here, such as API request or form validation
//   //   const formData = {
//   //     reference: reference ? reference.value : "",
//   //     trip: trip ? trip.value : "",
//   //     payment,
//   //     firstName,
//   //     middleName,
//   //     lastName,
//   //     gender: gender ? gender.value : "",
//   //     birthday,
//   //     nationality,
//   //     passportNo,
//   //     passportExpiredDate,
//   //   };
//   //   if (validate()) {
//   //     console.log("Form Submitted:", formData);
//   //     fetch("http://192.168.0.100:5000/api/auth/createpilgrim", {
//   //       method: "POST",
//   //       headers: {
//   //         "content-type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     })
//   //       .then((res) => {
//   //         alert("User Data Saved Successfully");
//   //         navigate("/hajj/pilgrim");
//   //       })
//   //       .catch((err) => {
//   //         console.log(err.message);
//   //       });
//   //   } else {
//   //     console.log("Validation Failed");
//   //   }
//   // };


//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const paymentAmount = parseFloat(payment);

//   // Check if the conversion is successful
//   if (isNaN(paymentAmount)) {
//     console.error("Invalid payment value");
//     return;
//   }
//     // Extract values from objects
//     const formData = {
//       reference: reference ? reference.value : "",
//       trip: trip ? trip.value : "",
//       payment:paymentAmount,
//       firstName,
//       middleName,
//       lastName,
//       gender: gender ? gender.value : "",
//       birthday,
//       nationality,
//       passportNo,
//       passportExpiredDate,
//     };
  
//     console.log("Form Data Submitted:", formData); // Add this log to inspect the submitted data
  
//     if (validate()) {
//       fetch("http://192.168.0.100:5000/api/auth/createpilgrim", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((res) => {
//           if (res.ok) {
//             alert("User Data Saved Successfully");
//             navigate("/hajj/pilgrim");
//           } else {
//             console.error("Error:", res.statusText);
//           }
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     } else {
//       console.log("Validation Failed");
//     }
//   };

//   const handleCancel = () => {
//     // Reset all fields if user clicks on Cancel
//     setReference("");
//     setTrip("");
//     setPayment(0);
//     // setPayment("");
//     setFirstName("");
//     setMiddleName("");
//     setLastName("");
//     setGender("");
//     setBirthday("");
//     setNationality("");
//     setPassportNo("");
//     setPassportExpiredDate("");
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <HajjTabs />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: "30px",
//           borderColor: "transparent",
//           backgroundColor: isDarkMode ? "grey.900" : "white", // Adjust for dark mode
//           boxShadow: 3,
//           marginBottom: "50px",
//           color: isDarkMode ? "#99a1b7" : "grey.900", // Adjust text color for dark mode
//         }}
//       >
//         <Typography
//           component="h4"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? "#99a1b7" : "inherit", // Adjust heading color for dark mode
//           }}
//         >
//           Pilgrim Management
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: isDarkMode ? "grey.700" : "#99a1b7", // Adjust divider color
//           }}
//         />

//         <div
//           className="pilgrim-create"
//           style={{
//             width: "100%",
//             maxWidth: { sm: "100%", md: "1700px" },
//             marginBottom: "30px",
//           }}
//         >
//           <div style={{ height: "auto", width: "100%" }}>
//             <div className="info">
//               <ContactsRoundedIcon className="title-icon" />
//               <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
//                 Add New Pilgrim
//               </Typography>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="infoRow">
//               <div className="inputField">
//                 <label
//                   htmlFor="reference"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Reference
//                 </label>
//                 <Select
//                   id="reference"
//                   name="reference"
//                   value={reference}
//                   options={options}
//                   placeholder="Search or Select Reference"
//                   onChange={(option) => setReference(option)}
//                   className="custom-select"
//                   style={{
//                     color: isDarkMode ? "black" : "inherit",
//                   }}
//                 ></Select>
//                 {errors.reference && (
//                   <span className="error">{errors.reference}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="trip"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Trip
//                 </label>
//                 <Select
//                   id="trip"
//                   name="trip"
//                   value={trip}
//                   options={options}
//                   placeholder="Search or Select Trip"
//                   onChange={(option) => setTrip(option)}
//                   className="custom-select"
//                   style={{
//                     color: isDarkMode ? "black" : "inherit",
//                   }}
//                 ></Select>
//                 {errors.trip && <span className="error">{errors.trip}</span>}
//               </div>
//             </div>
//             <div className="inputField">
//               {/* <label
//                 htmlFor="payment"
//                 style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//               >
//                 Passport Details
//               </label> */}
//               {/* <textarea
//                 id="payment"
//                 name="payment"
//                 value={payment}
//                 onChange={(e) => setPayment(e.target.value)}
//               ></textarea>
//               {errors.payment && (
//                 <span className="error">{errors.payment}</span>
//               )} */}

//               <label
//                 htmlFor="payment"
//                 style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//               >
//                 Payment
//               </label>
              
//               <textarea
//                 id="payment"
//                 name="payment"
//                 value={payment}
//                 onChange={(e) => setPayment(e.target.value)}
//               ></textarea>
//               {errors.payment && (
//                 <span className="error">{errors.payment}</span>
//               )}
//             </div>

//             <div className="nameRow">
//               <div className="inputField">
//                 <label
//                   htmlFor="firstName"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//                 {errors.firstName && (
//                   <span className="error">{errors.firstName}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="middleName"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Middle Name
//                 </label>
//                 <input
//                   id="middleName"
//                   name="middleName"
//                   type="text"
//                   value={middleName}
//                   onChange={(e) => setMiddleName(e.target.value)}
//                 />
//                 {errors.middleName && (
//                   <span className="error">{errors.middleName}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="lastName"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//                 {errors.lastName && (
//                   <span className="error">{errors.lastName}</span>
//                 )}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label
//                   htmlFor="gender"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Gender
//                 </label>
//                 <Select
//                   id="gender"
//                   name="gender"
//                   value={gender}
//                   options={genderOption}
//                   placeholder="Select Gender"
//                   onChange={(genderOption) => setGender(genderOption)}
//                   className="custom-select"
//                   style={{
//                     color: isDarkMode ? "black" : "inherit",
//                   }}
//                 ></Select>
//                 {errors.gender && (
//                   <span className="error">{errors.gender}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="birthday"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Birth Date
//                 </label>
//                 <input
//                   id="birthday"
//                   name="birthday"
//                   type="date"
//                   value={birthday}
//                   onChange={(e) => setBirthday(e.target.value)}
//                 />
//                 {errors.birthday && (
//                   <span className="error">{errors.birthday}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="nationality"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Nationality
//                 </label>
//                 <input
//                   id="nationality"
//                   name="nationality"
//                   type="text"
//                   value={nationality}
//                   onChange={(e) => setNationality(e.target.value)}
//                 />
//                 {errors.nationality && (
//                   <span className="error">{errors.nationality}</span>
//                 )}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label
//                   htmlFor="passportNo"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Passport No
//                 </label>
//                 <input
//                   id="passportNo"
//                   name="passportNo"
//                   type="text"
//                   value={passportNo}
//                   // style={{padding:"15px 0"}}
//                   onChange={(e) => setPassportNo(e.target.value)}
//                 />
//                 {errors.passportNo && (
//                   <span className="error">{errors.passportNo}</span>
//                 )}
//               </div>

//               <div className="inputField">
//                 <label
//                   htmlFor="passportExpiredDate"
//                   style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
//                 >
//                   Passport Expiry Date
//                 </label>
//                 <input
//                   id="passportExpiredDate"
//                   name="passportExpiredDate"
//                   type="date"
//                   value={passportExpiredDate}
//                   onChange={(e) => setPassportExpiredDate(e.target.value)}
//                 />
//                 {errors.passportExpiredDate && (
//                   <span className="error">{errors.passportExpiredDate}</span>
//                 )}
//               </div>
//             </div>

//             <div className="formActions">
//               <Button type="button" onClick={handleCancel} variant="outlined">
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default CreatePilgrim;










import { useState } from "react";
import {
  Box,
  Button,
  // Card,
  Divider,
  // FormControl,
  // FormLabel,
  Typography,
} from "@mui/material";
import "../../Users/UserList/Users";
import "../../Users/AddNewuser/CreateUser";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
// import { useNavigate } from "react-router";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";
import Select from "react-select";

const CreateHajjPilgrim = (id) => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === "dark"; // Check if the current theme is dark

  
  // State variables
  const [reference, setReference] = useState("");
  const [trip, setTrip] = useState("");
  const [payment, setPayment] = useState(0); // Store as number
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [passportExpiredDate, setPassportExpiredDate] = useState("");

  const options = [
    { value: "63e9e2a8f1b23c1a2f12345", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];
  const genderOption = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];



  const [errors, setErrors] = useState({
    reference: "",
    trip: "",
    payment: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthday: "",
    nationality: "",
    passportNo: "",
    passportExpiredDate: "",
  });

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!reference) newErrors.reference = "* Reference is required.";
    if (!trip) newErrors.trip = "* Trip is required.";
    if (!payment) newErrors.payment = "* Payment is required.";
    if (!firstName.trim()) newErrors.firstName = "* First name is required.";
    if (!middleName.trim()) newErrors.middleName = "* Middle name is required.";
    if (!lastName.trim()) newErrors.lastName = "* Last name is required.";
    if (!gender) newErrors.gender = "* Gender is required.";
    if (!birthday.trim()) newErrors.birthday = "* Birth date is required.";
    if (!nationality.trim()) newErrors.nationality = "* Nationality is required.";
    if (!passportNo.trim()) {
      newErrors.passportNo = "* Passport number is required.";
    }
    // } else if (!/^[A-Z]{1}[0-9]{9}-[0-9]{6}$/.test(passportNo)) {
    //   newErrors.passportNo = "* Invalid passport number format.";
    // }
    if (!passportExpiredDate.trim()) newErrors.passportExpiredDate = "* Passport expiry date is required.";
    else if (new Date(passportExpiredDate) <= new Date()) newErrors.passportExpiredDate = "* Passport expiry date must be in the future.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentAmount = parseFloat(payment);
    if (isNaN(paymentAmount)) {
      console.error("Invalid payment value");
      return;
    }

    const formData = {
      reference: reference == id ? reference.value : "",
      trip: trip ? trip.value : "",
      payment: paymentAmount,
      firstName,
      middleName,
      lastName,
      gender: gender ? gender.value : "",
      birthday,
      nationality,
      passportNo,
      passportExpiredDate,
    };

    console.log("Form Data Submitted:", formData);

    if (validate()) {
      fetch("http://192.168.0.100:5000/api/auth/createpilgrim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        // .then((res) => {
        //   if (res.ok) {
        //     alert("User Data Saved Successfully");
        //     navigate("/hajj/pilgrim");
        //   } else {
        //     console.error("Error:", res.statusText);
        //   }
        // })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form)
  const handleCancel = () => {
    setReference("");
    setTrip("");
    setPayment(0);
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setBirthday("");
    setNationality("");
    setPassportNo("");
    setPassportExpiredDate("");
  };

  return (
    <div style={{ width: "100%" }}>
      <HajjTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: "30px",
          borderColor: "transparent",
          backgroundColor: isDarkMode ? "grey.900" : "white",
          boxShadow: 3,
          marginBottom: "50px",
          color: isDarkMode ? "#99a1b7" : "grey.900",
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? "#99a1b7" : "inherit",
          }}
        >
          Pilgrim Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.700" : "#99a1b7",
          }}
        />

        <div className="pilgrim-create" style={{ width: "100%" }}>
          <div className="info">
            <ContactsRoundedIcon className="title-icon" />
            <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
              Add New Pilgrim
            </Typography>
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
                  value={reference}
                  options={options}
                  placeholder="Search or Select Reference"
                  onChange={(option) => setReference(option)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                ></Select>
                {errors.reference && <span className="error">{errors.reference}</span>}
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
                htmlFor="payment"
                style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
              >
                Payment
              </label>
              <textarea
                id="payment"
                name="payment"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              ></textarea>
              {errors.payment && <span className="error">{errors.payment}</span>}
            </div>

            <div className="nameRow">
              <div className="inputField">
                <label htmlFor="firstName" style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>
                  First Name
                </label>
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
                <label htmlFor="middleName" style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>
                  Middle Name
                </label>
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
                <label htmlFor="lastName" style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>
                  Last Name
                </label>
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
                <label
                  htmlFor="gender"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  value={gender}
                  options={genderOption}
                  placeholder="Search or Select Gender"
                  onChange={(option) => setGender(option)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                ></Select>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>

              <div className="inputField">
                <label
                  htmlFor="birthday"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                {errors.birthday && <span className="error">{errors.birthday}</span>}
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
                {errors.nationality && <span className="error">{errors.nationality}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label
                  htmlFor="passportNo"
                  style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}
                >
                  Passport Number
                </label>
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
                Create Pilgrim
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateHajjPilgrim;
