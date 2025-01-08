import { Box, Button, Typography, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import UserTab from "../../../Tabs/UserTab";

const ViewHajjVoucher = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockVoucherData = {
    agent: "John Smith",
    category: "Umrah Package",
    quantity: "5",
    totalAmount: "$2000",
  };

  // Navigate back to the voucher list
  const handleBack = () => {
    navigate("/vouchers/list");
  };

  return (
    <div style={{ width: "100%" }}>
      <UserTab />

      <Box
        sx={{
          padding: "30px",
          backgroundColor: isDarkMode ? "grey.800" : "white",
          boxShadow: 4,
          marginBottom: "50px",
          color: isDarkMode ? "#f0f0f0" : "grey.900",
          marginTop: 5,
          borderRadius: 3,
          margin: "30px auto",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 3,
            color: isDarkMode ? "#b0bec5" : "#263238",
          }}
        >
          Voucher Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

        {/* Voucher Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {[
            { label: "Agent", value: mockVoucherData.agent },
            { label: "Category", value: mockVoucherData.category },
            { label: "Quantity", value: mockVoucherData.quantity },
            { label: "Total Amount", value: mockVoucherData.totalAmount },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: isDarkMode ? "grey.800" : "#f5f5f5",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "#b0bec5" : "#37474f",
                  marginBottom: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ color: isDarkMode ? "#e0e0e0" : "#616161" }}>
                {item.value || "N/A"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/vouchers/update")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              borderRadius: 3,
            }}
          >
            Edit Voucher
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ViewHajjVoucher;
