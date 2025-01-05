import "./Users.css";
import DataTable from "../../DataTable/DataTable";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
// import AddNewUser from "./AddNewuser/AddNewUser";
// import UpdateUserForm from "./UpdateUser.jsx";
// import {userRows} from "../Data/data.js";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import UserTab from "../../../Tabs/UserTab";

const Users = () => {
  // const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme(); // Access the current theme
  
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark


  useEffect(() => {
    fetch("http://localhost:8000/userRows")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const CreateUser = () => {
    navigate("/users/create");
  };
  const ViewDetails = (id) => {
    navigate(`/users/view/${id}`);
  };
  const EditDetails = (id) => {
    navigate(`/users/update/${id}`);
  };
  const RemoveDetails = (id) => {
    if (window.confirm("Are You sure you want to delete user data"))
      fetch(`http://localhost:8000/userRows/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          alert("User Data removed Successfully");
          window.location.reload(); //for reload page
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.avatar || "/noavatar.png"}
          alt=""
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => ViewDetails(params.row.id)}>
            <ViewQuiltIcon />
          </Button>
          <Button onClick={() => EditDetails(params.row.id)}>
            <RateReviewOutlinedIcon />
          </Button>
          <Button onClick={() => RemoveDetails(params.row.id)}>
            <DeleteForeverOutlinedIcon color="error" />
          </Button>
        </div>
      ),
    },
  ]



  return (
    <div style={{ width: '100%' }}>
      <UserTab />
      <Box
          sx={{
            marginTop: 5,
            border: 1,
            borderRadius: 1,
            padding: '30px',
            borderColor: 'transparent',
            backgroundColor: isDarkMode ? 'grey.900' : 'white', // Adjust for dark mode
            boxShadow: 3,
            marginBottom: '50px',
            color: isDarkMode ? 'grey.300' : 'grey.900', // Adjust text color for dark mode
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              mt: 2,
              mb: 3,
              fontSize: 25,
              color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
            }}
          >
            Voucher Management
          </Typography>
          <Divider
            sx={{
              backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
            }}
          />
            
            <div style={{ width: "100%" }}>
              <div
                className="users"
                style={{
                  width: "100%",
                  maxWidth: { sm: "100%", md: "1700px" },
                }}
              >
                <div style={{ height: "auto", width: "100%" }}>
                  <div className="info">
                    <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                      User Management
                    </Typography>
                    <Button variant="contained" onClick={() => CreateUser()}>
                      Add New User
                    </Button>
                  </div>

                  <DataTable
                    rows={users && users.map((item) => item)}
                    columns={columns}
                  />
                </div>
              </div>
            
            </div>
          </Box>
    </div>
  );
};

export default Users;
