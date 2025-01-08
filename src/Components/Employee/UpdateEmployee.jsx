import { useState, useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Select from "react-select";
import { useTheme } from "@emotion/react";
import EmployeeTab from "../../Tabs/EmployeeTab";

const UpdateEmployee = ({ employeeId }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    dateOfJoining: "",
    employeePhoto: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const departmentOptions = [
    { value: "hr", label: "Human Resources" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
  ];

  useEffect(() => {
    if (employeeId) {
      setLoading(true);
      fetch(`http://localhost:8000/employees/${employeeId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching employee data:", err);
          setLoading(false);
        });
    }
  }, [employeeId]);

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "designation",
      "department",
      "email",
      "phone",
      "dateOfJoining",
      "employeePhoto",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `* ${field.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

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
      const res = await fetch("http://localhost:8000/employees/upload", {
        method: "POST",
        body: formData,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      fetch(`http://localhost:8000/employees/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            alert("Employee Data Updated Successfully");
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
      name: "",
      designation: "",
      department: "",
      email: "",
      phone: "",
      dateOfJoining: "",
      employeePhoto: "",
    });
    setErrors({});
  };

  if (loading) {
    return <Typography>Loading employee data...</Typography>;
  }

  return (
    <div style={{ width: "100%" }}>
      <EmployeeTab />
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
          Update Employee
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.700" : "#99a1b7",
          }}
        />

        <form onSubmit={handleSubmit}>
          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="employeePhoto">Employee Photo</label>
              <input
                id="employeePhoto"
                name="employeePhoto"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "employeePhoto")}
              />
              {formData.employeePhoto && (
                <img
                  src={formData.employeePhoto}
                  alt="Employee Preview"
                  style={{ width: 100, height: 100 }}
                />
              )}
              {errors.employeePhoto && (
                <span className="error">{errors.employeePhoto}</span>
              )}
            </div>

            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
          </div>

          <div className="infoRow">
            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="designation">Designation</label>
              <input
                id="designation"
                name="designation"
                type="text"
                value={formData.designation}
                onChange={handleInputChange}
              />
              {errors.designation && (
                <span className="error">{errors.designation}</span>
              )}
            </div>

            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="department">Department</label>
              <Select
                id="department"
                name="department"
                value={
                  departmentOptions.find(
                    (opt) => opt.value === formData.department
                  ) || null
                }
                options={departmentOptions}
                placeholder="Select Department"
                onChange={(option) =>
                  setFormData({ ...formData, department: option.value })
                }
              />
              {errors.department && (
                <span className="error">{errors.department}</span>
              )}
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
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="inputField">
              <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="dateOfJoining">Date of Joining</label>
              <input
                id="dateOfJoining"
                name="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
              />
              {errors.dateOfJoining && (
                <span className="error">{errors.dateOfJoining}</span>
              )}
            </div>
          </div>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
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
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default UpdateEmployee;
