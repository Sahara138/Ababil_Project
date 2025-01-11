import "./Payment.css";
import DataTable from "../../DataTable/DataTable";
import { Button, Typography, CircularProgress, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useEffect, useState } from "react";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";

const HajjPayment = () => {
  const theme = useTheme(); // Access the current theme
  
  const isDarkMode = theme.palette.mode === 'dark'; // Check if the current theme is dark
  const [payments, setPayments] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/payments")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        // alert("Failed to fetch payment data.");
        // setLoading(false);
      });
  }, []);

  const CreatePayment = () => {
    navigate("/hajj/payment/create");
  };

  const ViewDetails = (id) => {
    navigate(`/hajj/payments/view/${id}`);
  };

  const EditDetails = (id) => {
    navigate(`/hajj/payments/update/${id}`);
  };

  const RemoveDetails = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      fetch(`http://localhost:8000/payments/${id}`, { method: "DELETE" })
        .then(() => {
          setPayments((prev) => prev.filter((payment) => payment.id !== id));
          alert("Payment removed successfully");
        })
        .catch((err) => {
          console.error(err.message);
          alert("Failed to delete payment.");
        });
    }
  };

  const columns = [
    { field: "id", headerName: "Payment ID", width: 120 },
    { field: "pilgrimName", headerName: "Pilgrim Name", width: 200 },
    { field: "amountPaid", headerName: "Amount Paid", width: 150 },
    { field: "paymentDate", headerName: "Payment Date", width: 200 },
    { field: "paymentMethod", headerName: "Payment Method", width: 200 },
    { field: "transactionId", headerName: "Transaction ID", width: 250 },
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
            Payment Management
          </Typography>
          <Divider
            sx={{
              backgroundColor: isDarkMode ? 'grey.700' : 'grey.300', // Adjust divider color
            }}
          />
            <div style={{ width: "100%" }}>
              <div className="payments" style={{ width: "100%", maxWidth: "1700px" }}>
                <div style={{ height: "auto", width: "100%" }}>
                  <div className="info">
                    <Typography component="h2" variant="h6" sx={{ mb: 3, mt: 3 }}>
                      Payment List
                    </Typography>
                    <Button variant="contained" onClick={CreatePayment}>
                      Add New Payment
                    </Button>
                  </div>
                  <DataTable rows={payments} columns={columns} getRowId={(row) => row._id}/>
                  {/* {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataTable rows={payments} columns={columns} />
                  )} */}
                </div>
              </div>
            </div>
          </Box>
    </div>
  );
};

export default HajjPayment;
