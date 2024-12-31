import "./Users.css";
import DataTable from "../../DataTable/DataTable";
import { Button, Typography } from "@mui/material";
// import AddNewUser from "./AddNewuser/AddNewUser";
// import UpdateUserForm from "./UpdateUser.jsx";
// import {userRows} from "../Data/data.js";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";

const Users = () => {
  // const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
        <img src={params.row.img || "/noavatar.png"} alt="" />
      ),
    },
    { field: "userName", headerName: "User Name", width: 200, editable: true },
    { field: "email", type: "string", headerName: "Email", width: 200 },
    { field: "phone", type: "string", headerName: "Phone", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      type: "string",
    },
    { field: "status", headerName: "Status", width: 150, type: "boolean" },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="action">
          <div className="view" onClick={() => ViewDetails(params.row.id)}>
            <ViewQuiltIcon />
          </div>
          <div className="edit" onClick={() => EditDetails(params.row.id)}>
            <RateReviewOutlinedIcon />
          </div>
          <div className="delete" onClick={() => RemoveDetails(params.row.id)}>
            <DeleteForeverOutlinedIcon />
          </div>
        </div>
      ),
    },
  ];
  return (
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
  );
};

export default Users;
