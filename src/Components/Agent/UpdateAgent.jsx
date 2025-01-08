import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { useTheme } from "@emotion/react";
import AgentTab from "../../Tabs/AgentTab";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

const UpdateAgent = ({ agentId }) => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === "dark";

  // State variables
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
    payment: 0,
    pilgrim: "",
  });

  const [errors, setErrors] = useState({});

  const agentTypeOptions = [
    { value: "directAgent", label: "Direct Agent" },
    { value: "officeAgent", label: "Office Agent" },
    { value: "ababilAgent", label: "Ababil Agent" },
  ];

  useEffect(() => {
    // Fetch existing agent data by ID
    const fetchAgentData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/agents/${agentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch agent data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgentData();
  }, [agentId]);

  const validate = () => {
    const newErrors = {};

    const requiredFields = [
      "agentName",
      "agentType",
      "fatherName",
      "motherName",
      "dob",
      "nid",
      "passportNumber",
      "passportExpiryDate",
      "mobileNumber",
      "emergencyInformation",
      "passportImage",
      "nidImageFront",
      "nidImageBack",
      "pilgrim",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `* ${field.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    if (formData.passportExpiryDate && new Date(formData.passportExpiryDate) <= new Date()) {
      newErrors.passportExpiryDate = "* Passport expiry date must be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e, field) => {
    const files = e.target.files[0];
    if (!files) return;

    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "c_tags");

    try {
      const res = await fetch("http://localhost:8000/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to upload image: ${res.statusText}`);
      }

      const result = await res.json();
      setFormData((prevData) => ({
        ...prevData,
        [field]: result.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSelectChange = (name, option) => {
    setFormData({ ...formData, [name]: option ? option.value : "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      fetch(`http://localhost:8000/agents/${agentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            alert("Agent Data Updated Successfully");
          } else {
            console.error("Error:", res.statusText);
          }
        })
        .catch((err) => console.error(err));
    } else {
      console.log("Validation Failed");
    }
  };

  const handleCancel = () => {
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
      pilgrim: "",
    });
    setErrors({});
  };

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
          Update Agent Information
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
                    Update Agent
                </Typography>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentPhoto">Agent Photo URL</label>
                <input
                        id="agentPhoto"
                        name="agentPhoto"
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleImageChange(e, "agentPhoto")} // Handle file change
                    />
                    {formData.agentPhoto && (
                        <img src={formData.agentPhoto} alt="Agent Preview" style={{ width: 100, height: 100 }} />
                    )}
                </div>
                <div className="inputField">
                    <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentName">Agent Name</label>
                    <input
                    id="agentName"
                    name="agentName"
                    type="text"
                    value={formData.agentName}
                    onChange={handleInputChange}
                    />
                    {errors.agentName && <span className="error">{errors.agentName}</span>}
                </div>

                <div className="inputField">
                    <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentType">Agent Type</label>
                    <Select
                    id="agentType"
                    name="agentType"
                    value={agentTypeOptions.find((opt) => opt.value === formData.agentType) || null}
                    options={agentTypeOptions}
                    placeholder="Select Agent Type"
                    onChange={(option) => handleSelectChange("agentType", option)}
                    />
                    {errors.agentType && <span className="error">{errors.agentType}</span>}
                </div>
            </div>
            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="fatherName">Father Name</label>
                <input
                    id="fatherName"
                    name="fatherName"
                    type="text"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                />
                {errors.fatherName && <span className="error">{errors.fatherName}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="motherName">Mother Name</label>
                <input
                    id="motherName"
                    name="motherName"
                    type="text"
                    value={formData.motherName}
                    onChange={handleInputChange}
                />
                {errors.motherName && <span className="error">{errors.motherName}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="dob">Date of Birth</label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
                </div>
            </div>
            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nid">NID</label>
                <input
                    id="nid"
                    name="nid"
                    type="text"
                    value={formData.nid}
                    onChange={handleInputChange}
                />
                {errors.nid && <span className="error">{errors.nid}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportNumber">Passport Number</label>
                <input
                    id="passportNumber"
                    name="passportNumber"
                    type="text"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                />
                {errors.passportNumber && <span className="error">{errors.passportNumber}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportExpiryDate">Passport Expiry Date</label>
                <input
                    id="passportExpiryDate"
                    name="passportExpiryDate"
                    type="date"
                    value={formData.passportExpiryDate}
                    onChange={handleInputChange}
                />
                {errors.passportExpiryDate && <span className="error">{errors.passportExpiryDate}</span>}
                </div>
            </div>
            <div className="infoRow">           
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="mobileNumber">Mobile Number</label>
                <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                />
                {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="ksaPhoneNumber">KSA Phone Number</label>
                <input
                    id="ksaPhoneNumber"
                    name="ksaPhoneNumber"
                    type="text"
                    value={formData.ksaPhoneNumber}
                    onChange={handleInputChange}
                />
                </div>

            </div>

            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agentPresentAddress">Agent Present Address</label>
                <input
                    id="agentPresentAddress"
                    name="agentPresentAddress"
                    type="text"
                    value={formData.agentPresentAddress}
                    onChange={handleInputChange}
                />
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="emergencyInformation">Emergency Information</label>
                <input
                    id="emergencyInformation"
                    name="emergencyInformation"
                    type="text"
                    value={formData.emergencyInformation}
                    onChange={handleInputChange}
                />
                {errors.emergencyInformation && <span className="error">{errors.emergencyInformation}</span>}
                </div>
            </div>
            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportImage">Passport Image URL</label>
                <input
                    id="passportImage"
                    name="passportImage"
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageChange(e, "passportImage")} // Handle file change
                />
                {formData.passportImage && <span className="error">{errors.passportImage}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageFront">NID Image Front URL</label>
                <input
                    id="nidImageFront"
                    name="nidImageFront"
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageChange(e, "nidImageFront")} // Handle file change
                />
                {formData.nidImageFront && <span className="error">{errors.nidImageFront}</span>}
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nidImageBack">NID Image Back URL</label>
                <input
                    id="nidImageBack"
                    name="nidImageBack"
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageChange(e, "nidImageBack")} // Handle file change
                />
                {formData.nidImageBack && <span className="error">{errors.nidImageBack}</span>}
                </div>
            </div>
            <div className="infoRow">
                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="payment">Payment</label>
                <input
                    id="payment"
                    name="payment"
                    type="number"
                    value={formData.payment}
                    onChange={handleInputChange}
                />
                </div>

                <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="pilgrim">Pilgrim Name</label>
                <input
                    id="pilgrim"
                    name="pilgrim"
                    type="text"
                    value={formData.pilgrim}
                    onChange={handleInputChange}
                />
                {errors.pilgrim && <span className="error">{errors.pilgrim}</span>}
                </div>
            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
                variant="outlined"
                onClick={handleCancel} // Reset form
                sx={{ borderRadius: 3, textTransform: "none" }}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                variant="contained"
                sx={{
                backgroundColor: isDarkMode ? "grey.700" : "#1976d2",
                color: "white",
                textTransform: "none",
                borderRadius: 3,
                ":hover": {
                    backgroundColor: isDarkMode ? "grey.600" : "#1565c0",
                },
                }}
            >
                Submit
            </Button>
            </Box>
        </form>
            </div>
      </Box>
    </div>
  );
};

export default UpdateAgent;
