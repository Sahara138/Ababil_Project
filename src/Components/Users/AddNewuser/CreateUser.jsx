import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import Select from "react-select";
import UserTab from "../../../Tabs/UserTab";

const CreateUser = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // State to store form values
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    avatar: "",
    position: "",
    password: "",
    role: "",
    permission: "",
    status: "active",
  });

  // State to handle errors
  const [errors, setErrors] = useState({});

  // Options for role and permission
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
  ];

  const permissionOptions = [
    { value: "read", label: "Read" },
    { value: "write", label: "Write" },
    { value: "execute", label: "Execute" },
  ];

  // Validation logic
  const validate = () => {
    const newErrors = {};
    const { id, name, phone, email, password, role, permission } = userData;

    if (!id.trim()) newErrors.id = "* ID is required.";
    if (!name.trim()) newErrors.name = "* Name is required.";
    if (!phone.trim()) newErrors.phone = "* Phone is required.";
    if (!email.trim()) newErrors.email = "* Email is required.";
    if (!password.trim()) newErrors.password = "* Password is required.";
    if (!role) newErrors.role = "* Role is required.";
    if (!permission) newErrors.permission = "* Permission is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", userData);
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          alert("User Created Successfully");
          navigate("/users/list");
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setUserData({
      id: "",
      name: "",
      phone: "",
      email: "",
      avatar: "",
      position: "",
      password: "",
      role: "",
      permission: "",
      status: "active",
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <UserTab />
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
          User Management
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
                Create User
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="id">ID</label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  value={userData.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                  
                />
                {errors.id && <span className="error">{errors.id}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="avatar">Avatar</label>
                <input
                  id="avatar"
                  name="avatar"
                  type="text"
                  value={userData.avatar}
                  onChange={(e) => handleChange("avatar", e.target.value)}
                />
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="position">Position</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={userData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="role">Role</label>
                <Select
                  id="role"
                  name="role"
                  options={roleOptions}
                  value={roleOptions.find((option) => option.value === userData.role)}
                  onChange={(option) => handleChange("role", option?.value)}
                  placeholder="Select Role"
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                />
                {errors.role && <span className="error">{errors.role}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="permission">Permission</label>
                <Select
                  id="permission"
                  name="permission"
                  options={permissionOptions}
                  value={permissionOptions.find((option) => option.value === userData.permission)}
                  onChange={(option) => handleChange("permission", option?.value)}
                  placeholder="Select Permission"
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                />
                {errors.permission && <span className="error">{errors.permission}</span>}
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" >
                Create User
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateUser;
