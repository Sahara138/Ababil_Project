// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   Typography,
// } from "@mui/material";
// import Select from "react-select";
// import { useTheme } from "@emotion/react";
// import AgentTab from "../../Tabs/AgentTab";
// import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

// const CreateAgent = () => {
//   const theme = useTheme(); // Access the current theme
//   const isDarkMode = theme.palette.mode === "dark";

//   // State variables
//   const [formData, setFormData] = useState({
//     agentName: "",
//     agentType: "",
//     fatherName: "",
//     motherName: "",
//     dob: "",
//     nid: "",
//     passportNumber: "",
//     passportExpiryDate: "",
//     mobileNumber: "",
//     ksaPhoneNumber: "",
//     email: "",
//     agentPresentAddress: "",
//     emergencyInformation: "",
//     agentPhoto: "",
//     passportImage: "",
//     nidImageFront: "",
//     nidImageBack: "",
//     payment: 0,
//     pilgrim: "",
//   });

//   const [errors, setErrors] = useState({});

//   const agentTypeOptions = [
//     { value: "directAgent", label: "Direct Agent" },
//     { value: "officeAgent", label: "Office Agent" },
//     { value: "ababilAgent", label: "Ababil Agent" }
//   ];

//   const validate = () => {
//     const newErrors = {};

//     const requiredFields = [
//       "agentName",
//       "agentType",
//       "fatherName",
//       "motherName",
//       "dob",
//       "nid",
//       "passportNumber",
//       "passportExpiryDate",
//       "mobileNumber",
//       "emergencyInformation",
//       "passportImage",
//       "nidImageFront",
//       "nidImageBack",
//       "pilgrim",
//     ];

//     requiredFields.forEach((field) => {
//       if (!formData[field] || formData[field].trim() === "") {
//         newErrors[field] = `* ${field.replace(/([A-Z])/g, " $1")} is required.`;
//       }
//     });

//     if (formData.passportExpiryDate && new Date(formData.passportExpiryDate) <= new Date()) {
//       newErrors.passportExpiryDate = "* Passport expiry date must be in the future.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = async (e, field) => {
//     const files = e.target.files[0];
//     if (!files) return;
  
//     // Use FormData for file upload
//     const formData = new FormData();
//     formData.append("file", files);
//     formData.append("upload_preset", "c_tags");
  
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/agents", {
//         method: "POST",
//         headers: {
//                     "Content-Type": "application/json",
//              },
//         body: JSON.stringify(formData),
//         // body: formData, // Send the FormData directly
//       });
  
//       if (!res.ok) {
//         throw new Error(`Failed to upload image: ${res.statusText}`);
//       }
  
//       const result = await res.json();
//       setFormData((prevData) => ({
//         ...prevData,
//         [field]: result.secure_url, // Assuming the API returns the uploaded file's URL as `secure_url`
//       }));
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };
  
  

// //   const handleImageChange = async (e,field) => {
// //     const reader = new FileReader();
// //     reader.onloadend = async () => {
// //     //   setLoading(true);
      
// //     };
// //     const files = e.target.files[0];
// //     if (!files) return;
// //     const data = new FormData();
// //     data.append("file", files);
// //     // data.append("upload_preset", "c_tags");
// //     const res = await fetch("http://192.168.0.100:5000/api/auth/agents",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       }
// //     );
// //     const file = await res.json();
// //     setFormData({ ...formData, [field]: file.secure_url });
// //   };

//   const handleSelectChange = (name, option) => {
//     setFormData({ ...formData, [name]: option ? option.value : "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData)


//     if (validate()) {
//       fetch("http://localhost:5000/api/auth/agents", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((res) => {
//           if (res.ok) {
//             alert("Agent Data Saved Successfully");
//             // Reset form after successful submission
//             setFormData({
//               agentName: "",
//               agentType: "",
//               fatherName: "",
//               motherName: "",
//               dob: "",
//               nid: "",
//               passportNumber: "",
//               passportExpiryDate: "",
//               mobileNumber: "",
//               ksaPhoneNumber: "",
//               email: "",
//               agentPresentAddress: "",
//               emergencyInformation: "",
//               agentPhoto: "",
//               passportImage: "",
//               nidImageFront: "",
//               nidImageBack: "",
//               payment: 0,
//               pilgrim: "",
//             });
//             console.log(formData)
//           } else {
//             console.error("Error:", res.statusText);
//           }
//         })
//         .catch((err) => console.error(err));
//     } else {
//       console.log("Validation Failed");
//     }
//   };
//   const handleCancel = () => {
//     setFormData({
//       agentName: "",
//       agentType: "",
//       fatherName: "",
//       motherName: "",
//       dob: "",
//       nid: "",
//       passportNumber: "",
//       passportExpiryDate: "",
//       mobileNumber: "",
//       ksaPhoneNumber: "",
//       email: "",
//       agentPresentAddress: "",
//       emergencyInformation: "",
//       agentPhoto: "",
//       passportImage: "",
//       nidImageFront: "",
//       nidImageBack: "",
//       payment: 0,
//       pilgrim: "",
//     });
//     setErrors({});
//   };
//   return (
//     <div style={{ width: "100%" }}>
//       <AgentTab />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: "30px",
//           borderColor: "transparent",
//           backgroundColor: isDarkMode ? "grey.900" : "white",
//           boxShadow: 3,
//           marginBottom: "50px",
//           color: isDarkMode ? "#99a1b7" : "grey.900",
//         }}
//       >
//         <Typography
//           component="h4"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? "#99a1b7" : "inherit",
//           }}
//         >
//           Agent Management
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: isDarkMode ? "grey.700" : "#99a1b7",
//           }}
//         />

//         <div className="user-create" style={{ width: "100%" }}>
//           <div style={{ height: "auto", width: "100%" }}>
//             <div className="info">
//               <ContactsRoundedIcon className="title-icon" />
//               <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
//                 Create Agent
//               </Typography>
//             </div>
//           </div>
//       <form onSubmit={handleSubmit}>
//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentPhoto">Agent Photo URL</label>
//             <input
//                     id="agentPhoto"
//                     name="agentPhoto"
//                     accept="image/*"
//                     type="file"
//                     onChange={(e) => handleImageChange(e, "agentPhoto")} // Handle file change
//                 />
//                 {formData.agentPhoto && (
//                     <img src={formData.agentPhoto} alt="Agent Preview" style={{ width: 100, height: 100 }} />
//                 )}
//             </div>
//             <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentName">Agent Name</label>
//                 <input
//                 id="agentName"
//                 name="agentName"
//                 type="text"
//                 value={formData.agentName}
//                 onChange={handleInputChange}
//                 />
//                 {errors.agentName && <span className="error">{errors.agentName}</span>}
//             </div>

//             <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentType">Agent Type</label>
//                 <Select
//                 id="agentType"
//                 name="agentType"
//                 value={agentTypeOptions.find((opt) => opt.value === formData.agentType) || null}
//                 options={agentTypeOptions}
//                 placeholder="Select Agent Type"
//                 onChange={(option) => handleSelectChange("agentType", option)}
//                 />
//                 {errors.agentType && <span className="error">{errors.agentType}</span>}
//             </div>
//         </div>
//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="fatherName">Father Name</label>
//             <input
//                 id="fatherName"
//                 name="fatherName"
//                 type="text"
//                 value={formData.fatherName}
//                 onChange={handleInputChange}
//             />
//             {errors.fatherName && <span className="error">{errors.fatherName}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="motherName">Mother Name</label>
//             <input
//                 id="motherName"
//                 name="motherName"
//                 type="text"
//                 value={formData.motherName}
//                 onChange={handleInputChange}
//             />
//             {errors.motherName && <span className="error">{errors.motherName}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="dob">Date of Birth</label>
//             <input
//                 id="dob"
//                 name="dob"
//                 type="date"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//             />
//             {errors.dob && <span className="error">{errors.dob}</span>}
//             </div>
//         </div>
//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nid">NID</label>
//             <input
//                 id="nid"
//                 name="nid"
//                 type="text"
//                 value={formData.nid}
//                 onChange={handleInputChange}
//             />
//             {errors.nid && <span className="error">{errors.nid}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportNumber">Passport Number</label>
//             <input
//                 id="passportNumber"
//                 name="passportNumber"
//                 type="text"
//                 value={formData.passportNumber}
//                 onChange={handleInputChange}
//             />
//             {errors.passportNumber && <span className="error">{errors.passportNumber}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportExpiryDate">Passport Expiry Date</label>
//             <input
//                 id="passportExpiryDate"
//                 name="passportExpiryDate"
//                 type="date"
//                 value={formData.passportExpiryDate}
//                 onChange={handleInputChange}
//             />
//             {errors.passportExpiryDate && <span className="error">{errors.passportExpiryDate}</span>}
//             </div>
//         </div>
//         <div className="infoRow">           
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="email">Email</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//             />
//             {errors.email && <span className="error">{errors.email}</span>}
//             </div>
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="mobileNumber">Mobile Number</label>
//             <input
//                 id="mobileNumber"
//                 name="mobileNumber"
//                 type="text"
//                 value={formData.mobileNumber}
//                 onChange={handleInputChange}
//             />
//             {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="ksaPhoneNumber">KSA Phone Number</label>
//             <input
//                 id="ksaPhoneNumber"
//                 name="ksaPhoneNumber"
//                 type="text"
//                 value={formData.ksaPhoneNumber}
//                 onChange={handleInputChange}
//             />
//             </div>

//         </div>

//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentPresentAddress">Agent Present Address</label>
//             <input
//                 id="agentPresentAddress"
//                 name="agentPresentAddress"
//                 type="text"
//                 value={formData.agentPresentAddress}
//                 onChange={handleInputChange}
//             />
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="emergencyInformation">Emergency Information</label>
//             <input
//                 id="emergencyInformation"
//                 name="emergencyInformation"
//                 type="text"
//                 value={formData.emergencyInformation}
//                 onChange={handleInputChange}
//             />
//             {errors.emergencyInformation && <span className="error">{errors.emergencyInformation}</span>}
//             </div>
//         </div>
//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportImage">Passport Image URL</label>
//             <input
//                 id="passportImage"
//                 name="passportImage"
//                 accept="image/*"
//                 type="file"
//                 onChange={(e) => handleImageChange(e, "passportImage")} // Handle file change
//             />
//             {formData.passportImage && <span className="error">{errors.passportImage}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageFront">NID Image Front URL</label>
//             <input
//                 id="nidImageFront"
//                 name="nidImageFront"
//                 accept="image/*"
//                 type="file"
//                 onChange={(e) => handleImageChange(e, "nidImageFront")} // Handle file change
//             />
//             {formData.nidImageFront && <span className="error">{errors.nidImageFront}</span>}
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageBack">NID Image Back URL</label>
//             <input
//                 id="nidImageBack"
//                 name="nidImageBack"
//                 accept="image/*"
//                 type="file"
//                 onChange={(e) => handleImageChange(e, "nidImageBack")} // Handle file change
//             />
//             {formData.nidImageBack && <span className="error">{errors.nidImageBack}</span>}
//             </div>
//         </div>
//         <div className="infoRow">
//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="payment">Payment</label>
//             <input
//                 id="payment"
//                 name="payment"
//                 type="number"
//                 value={formData.payment}
//                 onChange={handleInputChange}
//             />
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pilgrim">Pilgrim Name</label>
//             <input
//                 id="pilgrim"
//                 name="pilgrim"
//                 type="text"
//                 value={formData.pilgrim}
//                 onChange={handleInputChange}
//             />
//             {errors.pilgrim && <span className="error">{errors.pilgrim}</span>}
//             </div>
//         </div>
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Button
//             variant="outlined"
//             onClick={handleCancel} // Reset form
//             sx={{ borderRadius: 3, textTransform: "none" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               backgroundColor: isDarkMode ? "grey.700" : "#1976d2",
//               color: "white",
//               textTransform: "none",
//               borderRadius: 3,
//               ":hover": {
//                 backgroundColor: isDarkMode ? "grey.600" : "#1565c0",
//               },
//             }}
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default CreateAgent;




// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   Typography,
// } from "@mui/material";
// import Select from "react-select";
// import { useTheme } from "@emotion/react";
// import AgentTab from "../../Tabs/AgentTab";
// import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

// const CreateAgent = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";

//   // State variables
//   const [formData, setFormData] = useState({
//     agentName: "",
//     agentType: "",
//     fatherName: "",
//     motherName: "",
//     dob: "",
//     nid: "",
//     passportNumber: "",
//     passportExpiryDate: "",
//     mobileNumber: "",
//     ksaPhoneNumber: "",
//     email: "",
//     agentPresentAddress: "",
//     emergencyInformation: "",
//     agentPhoto: "",
//     passportImage: "",
//     nidImageFront: "",
//     nidImageBack: "",
//     payment: 0,
//   });

//   const [errors, setErrors] = useState({});

//   const agentTypeOptions = [
//     { value: "directAgent", label: "Direct Agent" },
//     { value: "officeAgent", label: "Office Agent" },
//     { value: "ababilAgent", label: "Ababil Agent" },
//   ];

//   const validate = () => {
//     const newErrors = {};

//       // Required fields check
//     if (!formData.agentName.trim()) newErrors.agentName = "* Agent Name is required.";
//     if (!formData.agentType.trim()) newErrors.agentType = "* Agent Type is required.";
//     if (!formData.dob.trim()) newErrors.dob = "* Date of Birth is required.";
//     if (!formData.nid.trim()) newErrors.nid = "* NID is required.";
//     if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "* Mobile Number is required.";
//     if (!formData.emergencyInformation.trim()) newErrors.emergencyInformation = "* Emergency Information is required.";
//     if (!formData.passportImage) newErrors.passportImage = "* Passport Image is required.";
//     if (!formData.nidImageFront) newErrors.nidImageFront = "* NID Image Front is required.";
//     if (!formData.nidImageBack) newErrors.nidImageBack = "* NID Image Back is required.";

//     // Passport expiry date check
//     if (formData.passportExpiryDate && new Date(formData.passportExpiryDate) <= new Date()) {
//       newErrors.passportExpiryDate = "* Passport expiry date must be in the future.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleImageChange = async (e, field) => {
//   //   const files = e.target.files[0];
//   //   if (!files) return;

//   //   const formData = new FormData();
//   //   formData.append("file", files);
//   //   formData.append("upload_preset", "c_tags");

//   //   try {
//   //     const res = await fetch("http://192.168.0.100:5000/api/auth/agents", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (!res.ok) {
//   //       throw new Error(`Failed to upload image: ${res.statusText}`);
//   //     }

//   //     const result = await res.json();
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [field]: result.secure_url,
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //   }
//   // };


//   const handleImageChange = (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     const reader = new FileReader();
//     reader.onload = () => {
//       const base64String = reader.result;
  
//       // Save the Base64 string in localStorage
//       localStorage.setItem(field, base64String);
  
//       // Update the state
//       setFormData((prevData) => ({
//         ...prevData,
//         [field]: base64String,
//       }));
//     };
  
//     reader.readAsDataURL(file);
//   };
  
//   // When the form initializes, load images from localStorage
//   useEffect(() => {
//     const storedPassportImage = localStorage.getItem("passportImage");
//     const storedNidImageFront = localStorage.getItem("nidImageFront");
//     const storedNidImageBack = localStorage.getItem("nidImageBack");
  
//     setFormData((prevData) => ({
//       ...prevData,
//       passportImage: storedPassportImage || "",
//       nidImageFront: storedNidImageFront || "",
//       nidImageBack: storedNidImageBack || "",
//     }));
//   }, []);
  
//   const handleSelectChange = (name, option) => {
//     setFormData({ ...formData, [name]: option ? option.value : "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       fetch("http://localhost:5000/api/auth/agents", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((res) => {
//           if (res.ok) {
//             alert("Agent Data Saved Successfully");
//             setFormData({
//               agentName: "",
//               agentType: "",
//               fatherName: "",
//               motherName: "",
//               dob: "",
//               nid: "",
//               passportNumber: "",
//               passportExpiryDate: "",
//               mobileNumber: "",
//               ksaPhoneNumber: "",
//               email: "",
//               agentPresentAddress: "",
//               emergencyInformation: "",
//               agentPhoto: "",
//               passportImage: "",
//               nidImageFront: "",
//               nidImageBack: "",
//               payment: 0,
//             });
//           } else {
//             console.error("Error:", res.statusText);
//           }
//         })
//         .catch((err) => console.error(err));
//     } else {
//       console.log("Validation Failed");
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       agentName: "",
//       agentType: "",
//       fatherName: "",
//       motherName: "",
//       dob: "",
//       nid: "",
//       passportNumber: "",
//       passportExpiryDate: "",
//       mobileNumber: "",
//       ksaPhoneNumber: "",
//       email: "",
//       agentPresentAddress: "",
//       emergencyInformation: "",
//       agentPhoto: "",
//       passportImage: "",
//       nidImageFront: "",
//       nidImageBack: "",
//       payment: 0,
//     });
//     setErrors({});
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <AgentTab />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: "30px",
//           borderColor: "transparent",
//           backgroundColor: isDarkMode ? "grey.900" : "white",
//           boxShadow: 3,
//           marginBottom: "50px",
//           color: isDarkMode ? "#99a1b7" : "grey.900",
//         }}
//       >
//         <Typography
//           component="h4"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? "#99a1b7" : "inherit",
//           }}
//         >
//           Agent Management
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: isDarkMode ? "grey.700" : "#99a1b7",
//           }}
//         />

//         <div className="user-create" style={{ width: "100%" }}>
//           <div style={{ height: "auto", width: "100%" }}>
//             <div className="info">
//               <ContactsRoundedIcon className="title-icon" />
//               <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
//                 Create Agent
//               </Typography>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             {/* All form fields */}
//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentName">
//                   Agent Name
//                 </label>
//                 <input
//                   id="agentName"
//                   name="agentName"
//                   type="text"
//                   value={formData.agentName}
//                   onChange={handleInputChange}
//                 />
//                 {errors.agentName && <span className="error">{errors.agentName}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentType">
//                   Agent Type
//                 </label>
//                 <Select
//                   id="agentType"
//                   name="agentType"
//                   value={agentTypeOptions.find((opt) => opt.value === formData.agentType) || null}
//                   options={agentTypeOptions}
//                   placeholder="Select Agent Type"
//                   onChange={(option) => handleSelectChange("agentType", option)}
//                 />
//                 {errors.agentType && <span className="error">{errors.agentType}</span>}
//               </div>
//             </div>
//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="fatherName">
//                   Father Name
//                 </label>
//                 <input
//                   id="fatherName"
//                   name="fatherName"
//                   type="text"
//                   value={formData.fatherName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="motherName">
//                   Mother Name
//                 </label>
//                 <input
//                   id="motherName"
//                   name="motherName"
//                   type="text"
//                   value={formData.motherName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="dob">
//                   Date of Birth
//                 </label>
//                 <input
//                   id="dob"
//                   name="dob"
//                   type="date"
//                   value={formData.dob}
//                   onChange={handleInputChange}
//                 />
//                 {errors.dob && <span className="error">{errors.dob}</span>}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nid">
//                   NID Number
//                 </label>
//                 <input
//                   id="nid"
//                   name="nid"
//                   type="text"
//                   value={formData.nid}
//                   onChange={handleInputChange}
//                 />
//                 {errors.nid && <span className="error">{errors.nid}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportNumber">
//                   Passport Number
//                 </label>
//                 <input
//                   id="passportNumber"
//                   name="passportNumber"
//                   type="text"
//                   value={formData.passportNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportExpiryDate">
//                   Passport Expiry Date
//                 </label>
//                 <input
//                   id="passportExpiryDate"
//                   name="passportExpiryDate"
//                   type="date"
//                   value={formData.passportExpiryDate}
//                   onChange={handleInputChange}
//                 />
//                 {errors.passportExpiryDate && <span className="error">{errors.passportExpiryDate}</span>}
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="mobileNumber">
//                   Mobile Number
//                 </label>
//                 <input
//                   id="mobileNumber"
//                   name="mobileNumber"
//                   type="text"
//                   value={formData.mobileNumber}
//                   onChange={handleInputChange}
//                 />
//                 {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="ksaPhoneNumber">
//                   KSA Phone Number
//                 </label>
//                 <input
//                   id="ksaPhoneNumber"
//                   name="ksaPhoneNumber"
//                   type="text"
//                   value={formData.ksaPhoneNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentPresentAddress">
//                   Agent Present Address
//                 </label>
//                 <input
//                   id="agentPresentAddress"
//                   name="agentPresentAddress"
//                   type="text"
//                   value={formData.agentPresentAddress}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="emergencyInformation">
//                   Emergency Information
//                 </label>
//                 <input
//                   id="emergencyInformation"
//                   name="emergencyInformation"
//                   type="text"
//                   value={formData.emergencyInformation}
//                   onChange={handleInputChange}
//                 />
//                 {errors.emergencyInformation && (
//                   <span className="error">{errors.emergencyInformation}</span>
//                 )}
//               </div>
//             </div>

//             {/* File Inputs */}
//             <div className="infoRow">
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportImage">
//                   Passport Image
//                 </label>
//                 <input
//                   type="file"
//                   id="passportImage"
//                   name="passportImage"
//                   onChange={handleImageChange}
//                   // onChange={(e) => handleImageChange(e, "passportImage")}
//                 />
//                 {formData.passportImage && (
//                   <img src={formData.passportImage} alt="Passport Preview" style={{ width: 100, height: 100 }} />
//                 )}
//                 {errors.passportImage && <span className="error">{errors.passportImage}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageFront">
//                   NID Image Front
//                 </label>
//                 <input
//                   type="file"
//                   id="nidImageFront"
//                   name="nidImageFront"
//                   onChange={handleImageChange}
//                   // onChange={(e) => handleImageChange(e, "nidImageFront")}
//                 />
//                 {formData.nidImageFront && (
//                   <img
//                     src={formData.nidImageFront}
//                     alt="NID Front Preview"
//                     style={{ width: 100, height: 100 }}
//                   />
//                 )}
//                 {errors.nidImageFront && <span className="error">{errors.nidImageBack}</span>}
//               </div>
//               <div className="inputField">
//                 <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageBack">
//                   NID Image Back
//                 </label>
//                 <input
//                   type="file"
//                   id="nidImageBack"
//                   name="nidImageBack"
//                   onChange={handleImageChange}
//                   // onChange={(e) => handleImageChange(e, "nidImageBack")}
//                 />
//                 {formData.nidImageBack && (
//                   <img
//                     src={formData.nidImageBack}
//                     alt="NID Back Preview"
//                     style={{ width: 100, height: 100 }}
//                   />
//                 )}
//                 {errors.nidImageBack && <span className="error">{errors.nidImageBack}</span>}
//               </div>
//             </div>
//             <div className="infoRow">
//               <div className="inputField">
//                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="payment">Payment</label>
//                <input
//                 id="payment"
//                 name="payment"
//                 type="number"
//                 value={formData.payment}
//                 onChange={handleInputChange}
//             />
//             </div>

//             <div className="inputField">
//             <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pilgrim">Pilgrim Name</label>
//             <input
//                 id="pilgrim"
//                 name="pilgrim"
//                 type="text"
//                 value={formData.pilgrim}
//                 onChange={handleInputChange}
//             />
//             {errors.pilgrim && <span className="error">{errors.pilgrim}</span>}
//             </div>
//         </div>

//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleCancel}
//                 sx={{ borderRadius: 3, textTransform: "none" }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   backgroundColor: isDarkMode ? "grey.700" : "#1976d2",
//                   color: "white",
//                   textTransform: "none",
//                   borderRadius: 3,
//                   ":hover": {
//                     backgroundColor: isDarkMode ? "grey.600" : "#1565c0",
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         </div>
//       </Box>
//     </div>
//   );
// };

// export default CreateAgent;




import { useState } from "react";
import axios from "axios";
import AgentTab from "../../Tabs/AgentTab";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateAgent = () => {
  const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    agentName: "",
    agentType: "",
    fatherName: "",
    motherName: "",
    dob: "",
    nid: "",
    passportNumber: "",
    passportExpiryDate: "",
    mobileNumber: "",
    ksaPhoneNumber: "",
    email: "",
    agentPresentAddress: "",
    emergencyInformation: "",
    agentPhoto: "",
    passportImage: "",
    nidImageFront: "",
    nidImageBack: "",
    payment: "",
  });

  
  const [errors, setErrors] = useState({
    agentName: "",
    agentType: "",
    dob: "",
    nid: "",
    passportNumber: "",
    passportExpiryDate: "",
    mobileNumber: "",
    agentPresentAddress: "",
    emergencyInformation: "",
    passportImage: "",
    nidImageFront: "",
    nidImageBack: "",


  });

    // const agentTypeOptions = [
    //   { value: "directAgent", label: "Direct Agent" },
    //   { value: "officeAgent", label: "Office Agent" },
    //   { value: "ababilAgent", label: "Ababil Agent" },
    // ];
  
    const validate = () => {
      const newErrors = {};
  
        // Required fields check
      if (!formData.agentName.trim()) newErrors.agentName = "* Agent Name is required.";
      if (!formData.agentType.trim()) newErrors.agentType = "* Agent Type is required.";
      if (!formData.dob.trim()) newErrors.dob = "* Date of Birth is required.";
      if (!formData.nid.trim()) newErrors.nid = "* NID is required.";
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "* Mobile Number is required.";
      if (!formData.agentPresentAddress.trim()) newErrors.agentPresentAddress = "*Present Address  is required."; 
      if (!formData.emergencyInformation.trim()) newErrors.emergencyInformation = "* Emergency Information is required.";
      if (!formData.passportImage) newErrors.passportImage = "* Passport Image is required.";
      if (!formData.nidImageFront) newErrors.nidImageFront = "* NID Image Front is required.";
      if (!formData.nidImageBack) newErrors.nidImageBack = "* NID Image Back is required.";
  
      // Passport expiry date check
      if (formData.passportExpiryDate && new Date(formData.passportExpiryDate) <= new Date()) {
        newErrors.passportExpiryDate = "* Passport expiry date must be in the future.";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [field]: reader.result, // Store Base64 string
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      try {
        await axios.post("http://localhost:5000/api/auth/agents", formData); // Adjust API endpoint as needed
        toast("Agent created successfully!");
        setFormData({
          agentName: "",
          agentType: "",
          fatherName: "",
          motherName: "",
          dob: "",
          nid: "",
          passportNumber: "",
          passportExpiryDate: "",
          mobileNumber: "",
          ksaPhoneNumber: "",
          email: "",
          agentPresentAddress: "",
          emergencyInformation: "",
          agentPhoto: "",
          passportImage: "",
          nidImageFront: "",
          nidImageBack: "",
          payment: "",
        });
      } catch (error) {
        console.error("Error creating agent:", error);
        toast.error("Failed to create agent. Please try again.");
      }
    }
    else{
      toast.error("Validation Failed");
      console.log("Validation Failed");
    }
  };

  const handleCancel = () =>{
          setFormData({
            agentName: "",
            agentType: "",
            fatherName: "",
            motherName: "",
            dob: "",
            nid: "",
            passportNumber: "",
            passportExpiryDate: "",
            mobileNumber: "",
            ksaPhoneNumber: "",
            email: "",
            agentPresentAddress: "",
            emergencyInformation: "",
            agentPhoto: "",
            passportImage: "",
            nidImageFront: "",
            nidImageBack: "",
            payment: 0,
          });
          navigate('/agents/list')

  }

  return (
    <div style={{ width: "100%" }}>
       <AgentTab />
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
          Agent Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.700" : "#99a1b7",
          }}
        />

        <div className="user-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon" />
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Create Agent
              </Typography>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Agent Photo</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "agentPhoto")}
                />
                {formData.agentPhoto && <img src={formData.agentPhoto} alt="Agent Photo" />}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Agent Name</label>
                <input
                  type="text"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleChange}
                  required
                />
                {errors.agentName && <span className="error">{errors.agentName}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Agent Type</label>
                <input
                  type="text"
                  name="agentType"
                  value={formData.agentType}
                  onChange={handleChange}
                  required
                />
                {errors.agentType && <span className="error">{errors.agentType}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Mother Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>NID</label>
                <input
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  required
                />
                {errors.nid && <span className="error">{errors.nid}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Passport Number</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Passport Expiry Date</label>
                <input
                  type="date"
                  name="passportExpiryDate"
                  value={formData.passportExpiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>KSA Phone Number</label>
                <input
                  type="text"
                  name="ksaPhoneNumber"
                  value={formData.ksaPhoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Present Address</label>
                <textarea
                  name="agentPresentAddress"
                  value={formData.agentPresentAddress}
                  onChange={handleChange}
                />
                {errors.agentPresentAddress && <span className="error">{errors.agentPresentAddress}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Emergency Information</label>
                <textarea
                  name="emergencyInformation"
                  value={formData.emergencyInformation}
                  onChange={handleChange}
                  required
                />
                {errors.emergencyInformation && <span className="error">{errors.emergencyInformation}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Passport Image</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "passportImage")}
                  required
                />
                {formData.passportImage && <img src={formData.passportImage} alt="Passport Image" />}
                {errors.passportImage && <span className="error">{errors.passportImage}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>NID Image (Front)</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "nidImageFront")}
                  required
                />
                {formData.nidImageFront && <img src={formData.nidImageFront} alt="NID Front Image" />}
                {errors.nidImageFront && <span className="error">{errors.nidImageFront}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>NID Image (Back)</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "nidImageBack")}
                  required
                />
                {formData.nidImageBack && <img src={formData.nidImageBack} alt="NID Back Image" />}
                {errors.nidImageBack && <span className="error">{errors.nidImageBack}</span>}
              </div>

              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }}>Payment</label>
                <input
                  type="number"
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateAgent;
