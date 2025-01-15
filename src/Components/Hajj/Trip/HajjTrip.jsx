import "./Trip.css";
import DataTable from "../../DataTable/DataTable";  // Ensure DataTable component is correctly imported
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useTheme } from "@emotion/react";
import HajjTabs from "../../../Tabs/HajjTabs";
import { toast } from "react-toastify";

const HajjTrip = () => {
  const theme = useTheme(); // Access the current theme
    
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/gettrip") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        const updatedTrips = data.map((trip) => ({
          ...trip,
          id: trip._id, // Assuming _id is the identifier in your API
        }));
        setTrips(updatedTrips);
      })
      .catch((err) => {
        console.log(err.message);
        // alert("Failed to fetch trip data.");
      });
  }, []);

  const CreateTrip = () => {
    navigate("/hajj/trip/create");
  };

  const ViewDetails = (_id) => {
    navigate(`/hajj/trip/view/${_id}`);
  };

  const EditDetails = (_id) => {
    navigate(`/hajj/trip/update/${_id}`);
  };

  const RemoveDetails = (_id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      fetch(`http://localhost:5000/api/auth/deletetrip/${_id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Trip removed successfully");
          setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== _id));
        
          window.location.reload(); // Reload the page
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const columns = [
    { field: "tripNumber", headerName: "Trip Number", width: 150 },
    { field: "expectedFlightDate", headerName: "Expected Flight Date", width: 200 },
    { field: "returnFlightDate", headerName: "Return Flight Date", width: 200 },
    { field: "durationOfStay", headerName: "Duration of Stay (Days)", width: 200 },
    { field: "stayFirst", headerName: "Stay First", width: 150 },
    { field: "carrier", headerName: "Carrier", width: 150 },
    {
      field: "bookedMeccaHotel",
      headerName: "Booked Mecca Hotel",
      width: 200,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "bookedMadinaHotel",
      headerName: "Booked Madina Hotel",
      width: 200,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
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

export default HajjTrip;
