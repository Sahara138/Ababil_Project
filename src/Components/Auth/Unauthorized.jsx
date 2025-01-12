import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "error.main", fontWeight: "bold" }}
        >
          Unauthorized
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          You do not have permission to access this page.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGoBack}
            sx={{ textTransform: "none" }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Unauthorized;
