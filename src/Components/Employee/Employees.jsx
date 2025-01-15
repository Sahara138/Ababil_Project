import "./Employees.css";
import DataTable from "../DataTable/DataTable";
import {
  Button,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";

import EmployeeTab from "../../Tabs/EmployeeTab";
import { toast } from "react-toastify";

const Employees = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/getallemployee")
      .then((res) => res.json())
      .then((data) => {
        const updatedEmployees = data.map((employee) => ({
          ...employee,
          id: employee._id,
        }));
        setEmployees(updatedEmployees);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setError("Failed to fetch employees");
        setLoading(false);
      });
  }, []);

  const createEmployee = () => {
    navigate("/employee/create");
  };

  const viewDetails = (_id) => {
    navigate(`/employee/view/${_id}`);
  };

  const editDetails = (_id) => {
    navigate(`/employee/update/${_id}`);
  };

  const removeDetails = (_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:5000/api/auth/deleteemplyee/${_id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast("Employee removed successfully");
          setEmployees((prevEmployees) =>
            prevEmployees.filter((e) => e.id !== _id)
          );
          window.location.reload(); // Reload the page
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "fatherName", headerName: "Father's Name", width: 150 },
    { field: "motherName", headerName: "Mother's Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { 
      field: "birthOfDate", 
      headerName: "Date of Birth", 
      width: 150, 
      renderCell: (params) => 
        new Date(params.row.birthOfDate).toLocaleDateString(), // Format Date
    },
    { field: "nid", headerName: "NID", width: 150 },
    { field: "passportNo", headerName: "Passport No", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="action">
          <div className="view" onClick={() => viewDetails(params.row.id)}>
            <ViewQuiltIcon />
          </div>
          <div className="edit" onClick={() => editDetails(params.row.id)}>
            <RateReviewOutlinedIcon />
          </div>
          <div className="delete" onClick={() => removeDetails(params.row.id)}>
            <DeleteForeverOutlinedIcon />
          </div>
        </div>
      ),
    },
  ];
  

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
          color: isDarkMode ? "grey.300" : "grey.900",
        }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? "grey.300" : "inherit",
          }}
        >
          Employee Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.800" : "grey.300",
          }}
        />
        <div className="employees" style={{ height: "auto", width: "100%" }}>
          <div className="info">
            <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
              Employee List
            </Typography>
            <Button variant="contained" onClick={() => createEmployee()}>
              Add New Employee
            </Button>
          </div>
          <DataTable rows={employees} columns={columns} getRowId={(row) => row._id}/>
        </div>
      </Box>
    </div>
  );
};

export default Employees;
