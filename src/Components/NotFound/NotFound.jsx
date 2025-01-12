
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Box, Container } from "@mui/material";

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleGoHome = () => {
//     navigate("/"); // Navigate to the homepage
//   };

//   return (
//     <Container
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 500,
//           width: "100%",
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           bgcolor: "background.paper",
//         }}
//       >
//         <Typography
//           variant="h3"
//           component="h1"
//           gutterBottom
//           sx={{ fontWeight: "bold", color: "error.main" }}
//         >
//           404
//         </Typography>
//         <Typography variant="h5" color="textPrimary" sx={{ mb: 2 }}>
//           Page Not Found
//         </Typography>
//         <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
//           The page you’re looking for doesn’t exist or has been moved.
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleGoHome}
//           sx={{ textTransform: "none" }}
//         >
//           Go to Homepage
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default NotFound;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          fontSize: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h1"
          component="span"
          sx={{ fontWeight: "bold", fontSize: "5rem" }}
        >
          4
        </Typography>
        <WarningAmberIcon
          sx={{ fontSize: "5rem", color: "error.main", mx: 1 }}
        />
        <Typography
          variant="h1"
          component="span"
          sx={{ fontWeight: "bold", fontSize: "5rem" }}
        >
          4
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Oops! You’re lost.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        The page you are looking for was not found.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleGoHome}
        sx={{ textTransform: "none", fontSize: "1rem", px: 4, py: 1.5 }}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
