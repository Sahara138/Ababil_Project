import "./Departure.css";
import DataTable from "../../DataTable/DataTable";
import { Button, Typography, CircularProgress, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";

const Departure = () => {
  const theme = useTheme(); // Access the current theme
    
 const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [departures, setDepartures] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/departures")
      .then((res) => res.json())
      .then((data) => {
        setDepartures(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        // alert("Failed to fetch departure data.");
        // setLoading(false);
      });
  }, []);

  const CreateDeparture = () => {
    navigate("/umrah/departure/create");
  };

  const ViewDetails = (id) => {
    navigate(`/umrah/departure/view/${id}`);
  };

  const EditDetails = (id) => {
    navigate(`/umrah/departure/update/${id}`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this departure?")) {
      fetch(`http://localhost:8000/departures/${id}`, { method: "DELETE" })
        .then(() => {
          setDepartures((prev) => prev.filter((departure) => departure.id !== id));
          alert("Departure removed successfully");
        })
        .catch((err) => {
          console.error(err.message);
          alert("Failed to delete departure.");
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "pilgrimName", headerName: "Pilgrim Name", width: 200 },
    { field: "departureDate", headerName: "Departure Date", width: 200 },
    { field: "flightNumber", headerName: "Flight Number", width: 150 },
    { field: "airportName", headerName: "Airport Name", width: 200 },
    { field: "terminal", headerName: "Terminal", width: 150 },
    { field: "gateNumber", headerName: "Gate Number", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 300 },
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
            Departure Management
          </Typography>
          <Divider
            sx={{
              backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
            }}
          />
            <div style={{ width: "100%" }}>
              <div className="departures" style={{ width: "100%", maxWidth: "1700px" }}>
                <div style={{ height: "auto", width: "100%" }}>
                  <div className="info">
                    <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                      Departure list
                    </Typography>
                    <Button variant="contained" onClick={CreateDeparture}>
                      Add New Departure
                    </Button>
                  </div>
                  <DataTable rows={departures} columns={columns} />

                  {/* {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataTable rows={departures} columns={columns} />
                  )} */}
                </div>
              </div>
            </div>
          </Box>
    </div>
  );
};

export default Departure;
