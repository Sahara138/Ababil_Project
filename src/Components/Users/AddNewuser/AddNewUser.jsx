import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "../UserList/Users";
import "../AddNewuser/AddNewUser.css";
import { Link, useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddNewUser = () => {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Deactive");
  const navigate = useNavigate();

  // Fetch existing data to generate the ID dynamically
  useEffect(() => {
    fetch("http://localhost:8000/userRows")
      .then((res) => res.json())
      .then((data) => {
        const maxId = data.reduce((max, user) => Math.max(max, user.id), 0);
        setId(maxId + 1); // Set the next ID
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);
  const [errors, setErrors] = useState({
    // id:"",
    userName: "",
    email: "",
    phone: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!id.trim()) {
      newErrors.userName = "Id is required.";
    }
    if (!userName.trim()) {
      newErrors.userName = "User Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = "Phone number must be 11 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { id, userName, email, phone, status };
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
          navigate("/users");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Validation Failed");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 6,
    p: 4,
    m: 4,
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Box sx={style}>
          <Link to="/users">
            <ArrowBackIcon style={{ justifyContent: "flex-start" }} />
          </Link>
          <Typography
            variant="h6"
            component="h2"
            style={{ textAlign: "center", fontSize: "24px" }}
          >
            Add New User
          </Typography>

          <form onSubmit={handleSubmit}>
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
          </form>
        </Box>
      </div>
    </div>
  );
};

export default AddNewUser;
