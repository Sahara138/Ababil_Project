import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import { toast } from "react-toastify";

const CreateEmployee = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // State for form values
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [gender, setGender] = useState("");
  const [birthOfDate, setBirthOfDate] = useState("");
  const [nid, setNid] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "* Name is required.";
    if (!fatherName.trim()) newErrors.fatherName = "* Father's Name is required.";
    if (!motherName.trim()) newErrors.motherName = "* Mother's Name is required.";
    if (!gender.trim()) newErrors.gender = "* Gender is required.";
    if (!birthOfDate.trim()) newErrors.birthOfDate = "* Birth Date is required.";
    if (!nid.trim()) newErrors.nid = "* NID is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "* Valid Email is required.";
    if (!phone.trim() || !/^\d+$/.test(phone)) newErrors.phone = "* Valid Phone Number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      fatherName,
      motherName,
      gender,
      birthOfDate,
      nid,
      passportNo,
      email,
      phone,
    };

    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:5000/api/auth/createemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          toast("Employee Created Successfully");
          navigate("/employee/list");
        })
        .catch((err) => console.error(err.message));
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setName("");
    setFatherName("");
    setMotherName("");
    setGender("");
    setBirthOfDate("");
    setNid("");
    setPassportNo("");
    setEmail("");
    setPhone("");
  };

  return (
    <div style={{ width: "100%" }}>
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
        <Typography component="h4" variant="h6" sx={{ mt: 2, mb: 3, fontSize: 25 }}>
          Create Employee
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.700" : "#99a1b7" }} />
        <div className="info">
          <ContactsRoundedIcon className="title-icon" />
          <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
            Add New Employee
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="name">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="fatherName">Father's Name</label>
              <input
                id="fatherName"
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
              {errors.fatherName && <span className="error">{errors.fatherName}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="motherName">Mother's Name</label>
              <input
                id="motherName"
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
              {errors.motherName && <span className="error">{errors.motherName}</span>}
            </div>
          </div>
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="gender">Gender</label>
              <input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="birthOfDate">Birth Date</label>
              <input
                id="birthOfDate"
                type="date"
                value={birthOfDate}
                onChange={(e) => setBirthOfDate(e.target.value)}
              />
              {errors.birthOfDate && <span className="error">{errors.birthOfDate}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="nid">NID</label>
              <input id="nid" type="text" value={nid} onChange={(e) => setNid(e.target.value)} />
              {errors.nid && <span className="error">{errors.nid}</span>}
            </div>
          </div>
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="passportNo">Passport Number</label>
              <input
                id="passportNo"
                type="text"
                value={passportNo}
                onChange={(e) => setPassportNo(e.target.value)}
              />
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="phone">Phone</label>
              <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="formActions">
            <Button type="button" variant="outlined" onClick={handleCancel} sx={{ mt: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Save
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateEmployee;
