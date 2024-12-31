// import { Box, Divider, Typography } from '@mui/material'
// import UmrahTabs from '../../../Tabs/UmrahTabs'
// import Users from '../../Users/Users'

// const Pilgrim = () => {
//   return (
//     <div style={{width:"100%"}}>
//       <UmrahTabs />
//       <Box
//             sx={{
//                 marginTop:5,
//                 border: 1,
//                 borderRadius: 1,
//                 padding: '30px',
//                 borderColor: 'transparent',
//                 backgroundColor: 'white',
//                 boxShadow: 3,
//                 marginBottom:"50px"
 

//             }}
//           >
//             <Typography
//                 component="h2"
//                 variant="h6"
//                 sx={{mt: 2,mb:3,fontSize:25 }}
//             >
//                 Pilgrim List
//             </Typography>
//             <Divider />
//             <Users />
            
//           </Box>
//     </div>
//   )
// }

// export default Pilgrim
import "../Pilgrims/Pilgrim.css";
import DataTable from "../../DataTable/DataTable";
import {
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import { Box, Divider, useTheme } from '@mui/material';
import UmrahTabs from '../../../Tabs/UmrahTabs';
// import Users from '../../Users/Users';

const Pilgrim = () => {
  const theme = useTheme(); // Access the current theme

  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [pilgrims, setPilgrims] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/pilgrims")
      .then((res) => res.json())
      .then((data) => {
        setPilgrims(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const CreatePilgrim = () => {
    navigate("/pilgrims/create");
  };

  const ViewDetails = (id) => {
    navigate(`/pilgrims/view/${id}`);
  };

  const EditDetails = (id) => {
    navigate(`/pilgrims/update/${id}`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this pilgrim?")) {
      fetch(`http://localhost:8000/pilgrims/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Pilgrim removed successfully");
          window.location.reload(); // Reload the page
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "middleName", headerName: "Middle Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "nationality", headerName: "Nationality", width: 150 },
    { field: "passportNo", headerName: "Passport No", width: 150 },
    { field: "passportExpiry", headerName: "Passport Expiry Date", width: 150 },
    {
      field: "reference",
      headerName: "Reference",
      width: 200,
      renderCell: (params) => <span>{params.row.reference || "N/A"}</span>,
    },
    {
      field: "trip",
      headerName: "Trip",
      width: 200,
      renderCell: (params) => <span>{params.row.trip || "N/A"}</span>,
    },
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
          Pilgrim List
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
          }}
        />
         <div
      className="pilgrims"
      style={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <div className="pilgrim" style={{ height: "auto", width: "100%" }}>
        <div className="info">
          <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
            Pilgrim Management
          </Typography>
          <Button variant="contained" onClick={CreatePilgrim}>
            Add New Pilgrim
          </Button>
        </div>

        <DataTable
          rows={pilgrims && pilgrims.map((item) => item)}
          columns={columns}
        />
      </div>
    </div>
      </Box>
    </div>
  );
};

export default Pilgrim;
