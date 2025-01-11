import "./Trip.css";
import DataTable from "../../DataTable/DataTable";  // Ensure DataTable component is correctly imported
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useTheme } from "@emotion/react";
import UmrahTabs from "../../../Tabs/UmrahTabs";

const Trip = () => {
  const theme = useTheme(); // Access the current theme
    
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/trips") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
      })
      .catch((err) => {
        console.log(err.message);
        // alert("Failed to fetch trip data.");
      });
  }, []);

  const CreateTrip = () => {
    navigate("/umrah/trip/create");
  };

  const ViewDetails = (id) => {
    navigate(`/umrah/trip/view`);
    // navigate(`/umrah/trip/view/${id}`);
  };

  const EditDetails = (id) => {
    // navigate(`/umrah/trip/update/${id}`);
    navigate(`/umrah/trip/update`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      fetch(`http://localhost:8000/trips/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          // alert("Trip removed successfully");
          window.location.reload(); // Reload the page
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "tripName", headerName: "Trip Name", width: 200 },
    { field: "tripType", headerName: "Trip Type", width: 200 },
    { field: "startDate", headerName: "Start Date", width: 180 },
    { field: "endDate", headerName: "End Date", width: 180 },
    { field: "destination", headerName: "Destination", width: 200 },
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
      <UmrahTabs />
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
          Trip Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
         <div
            className="trip"
            style={{
              width: "100%",
              maxWidth: { sm: "100%", md: "1700px" },
            }}
          >
            <div style={{ height: "auto", width: "100%" }}>
              <div className="info">
                <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                  Trip List
                </Typography>
                <Button variant="contained" onClick={CreateTrip}>
                  Add New Trip
                </Button>
              </div>

              <DataTable
                rows={trips && trips.map((item) => item)}
                columns={columns} getRowId={(row) => row._id}
              />
            </div>
          </div>
        </Box>
    </div>
  );
};

export default Trip;
