import "./Ticket_Requisition.css";
import DataTable from "../../DataTable/DataTable";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";

const Ticket_Requisition = () => {
  const theme = useTheme(); // Access the current theme
  
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const CreateTicket = () => {
    navigate("/hajj/ticket-requisition/create");
  };

  const ViewDetails = (id) => {
    navigate(`/hajj/ticket-requisition/view/${id}`);
  };

  const EditDetails = (id) => {
    navigate(`/hajj/ticket-requisition/update/${id}`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      fetch(`http://localhost:8000/tickets/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Ticket removed successfully");
          window.location.reload(); // Reload the page
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "agentName", headerName: "Agent Name", width: 200 },
    {
      field: "agentType",
      headerName: "Agent Type",
      width: 200,
      renderCell: (params) => <span>{params.row.agentType || "N/A"}</span>,
    },
    { field: "pilgrimOrGroupName", headerName: "Pilgrim/Group Name", width: 250 },
    { field: "flightDate", headerName: "Flight Date", width: 200 },
    { field: "returnDate", headerName: "Return Date", width: 200 },
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
    <div style={{ width: '100%' }}>
      <HajjTabs />
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
          Ticket Requisition Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
          <div
            className="tickets"
            style={{
              width: "100%",
              maxWidth: { sm: "100%", md: "1700px" },
            }}
          >
            <div style={{ height: "auto", width: "100%" }}>
              <div className="info">
                <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                  Ticket List
                </Typography>
                <Button variant="contained" onClick={CreateTicket}>
                  Add New Ticket
                </Button>
              </div>

              <DataTable
                rows={tickets && tickets.map((item) => item)}
                columns={columns}
              />
            </div>
          </div>
        </Box>
    </div>
    
  );
};

export default Ticket_Requisition;
