import "./Voucher.css";
import DataTable from "../../DataTable/DataTable";
import { Button, Typography, CircularProgress, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";

const Voucher = () => {
  const theme = useTheme(); // Access the current theme
    
    const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [vouchers, setVouchers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/vouchers")
      .then((res) => res.json())
      .then((data) => {
        setVouchers(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        // alert("Failed to fetch voucher data.");
        // setLoading(false);
      });
  }, []);

  const CreateVoucher = () => {
    navigate("/hajj/voucher/create");
  };

  const ViewDetails = (id) => {
    navigate(`/hajj/voucher/view/${id}`);
  };

  const EditDetails = () => {
    navigate(`/hajj/voucher/update`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      fetch(`http://localhost:8000/vouchers/${id}`, { method: "DELETE" })
        .then(() => {
          setVouchers((prev) => prev.filter((voucher) => voucher.id !== id));
          alert("Voucher removed successfully");
        })
        .catch((err) => {
          console.error(err.message);
          alert("Failed to delete voucher.");
        });
    }
  };

  const columns = [
    { field: "id", headerName: "Voucher ID", width: 150 },
    { field: "agentName", headerName: "Agent Name", width: 250 },
    { field: "category", headerName: "Category Type", width: 250 },
    { field: "issueDate", headerName: "Issue Date", width: 200 },
    { field: "amount", headerName: "Total Amount", width: 200 },
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
            Voucher Management
          </Typography>
          <Divider
            sx={{
              backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
            }}
          />
            
            <div style={{ width: "100%" }}>
              <div className="vouchers" style={{ width: "100%", maxWidth: "1700px" }}>
                <div style={{ height: "auto", width: "100%" }}>
                  <div className="info">
                    <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                      Voucher List
                    </Typography>
                    <Button variant="contained" onClick={CreateVoucher}>
                      Add New Voucher
                    </Button>
                  </div>
                  <DataTable rows={vouchers} columns={columns} />
                  {/* {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataTable rows={vouchers} columns={columns} />
                  )} */}
                </div>
              </div>
            </div>
          </Box>
    </div>
  );
};

export default Voucher;
