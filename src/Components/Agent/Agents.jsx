import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import DataTable from "../DataTable/DataTable";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import AgentTab from "../../Tabs/AgentTab";
import './Agents.css';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    fetch("http://localhost:8000/agentData")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.log(err.message));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/agents/view/${id}`);
  };

  const handleEditDetails = (id) => {
    navigate(`/agents/edit/${id}`);
  };

  const handleRemoveAgent = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      fetch(`http://localhost:8000/agentData/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Agent removed successfully.");
          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleAddAgent = () => {
    navigate("/agents/create");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.photo || "/noavatar.png"}
          alt="Agent"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Agent Name", width: 200 },
    { field: "type", headerName: "Agent Type", width: 150 },
    { field: "fatherName", headerName: "Father's Name", width: 200 },
    { field: "motherName", headerName: "Mother's Name", width: 200 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "nid", headerName: "NID Number", width: 150 },
    { field: "passportNumber", headerName: "Passport Number", width: 200 },
    { field: "passportExpiry", headerName: "Date of Expiry", width: 200 },
    { field: "mobile", headerName: "Mobile Number", width: 150 },
    { field: "ksaPhone", headerName: "KSA Phone Number", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "presentAddress", headerName: "Present Address", width: 300 },
    { field: "emergencyInfo", headerName: "Emergency Information", width: 300 },
    {
      field: "passportImage",
      headerName: "Passport Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.passportImage || "/nopassport.png"}
          alt="Passport"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "nidFrontImage",
      headerName: "NID Front",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.nidFrontImage || "/nonid.png"}
          alt="NID Front"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "nidBackImage",
      headerName: "NID Back",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.nidBackImage || "/nonid.png"}
          alt="NID Back"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => handleViewDetails(params.row.id)}>
            <ViewQuiltIcon />
          </Button>
          <Button onClick={() => handleEditDetails(params.row.id)}>
            <RateReviewOutlinedIcon />
          </Button>
          <Button onClick={() => handleRemoveAgent(params.row.id)}>
            <DeleteForeverOutlinedIcon color="error" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <AgentTab />
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
              color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
            }}
          >
          Agent Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? "grey.800" : "grey.300",
            // marginBottom: 3,
          }}
        />
        <div className="agents" style={{ height: "auto", width: "100%" }}>
          <div className="info">
            <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
               Agent List
            </Typography>
            <Button variant="contained" onClick={() =>handleAddAgent()}>
              Add New Agent
            </Button>
          </div>
          <DataTable rows={agents} columns={columns} />
        </div>
      </Box>
    </div>
  );
};

export default Agents;
