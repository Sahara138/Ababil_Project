
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   Link,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const Card = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   width: "100%",
//   maxWidth: "400px",
//   padding: theme.spacing(4),
//   margin: "auto",
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
//   background: theme.palette.background.paper,
// }));

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Please enter a valid email address.";
//     }
//     if (!password || password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch("http://192.168.0.100:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", result);
//         alert("Login successful!");
//       } else {
//         console.error("Login failed:", result.message);
//         setErrors({ server: result.message || "Login failed." });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrors({ server: "An unexpected error occurred. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Grid container component="main" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
//       <CssBaseline />
//       <Card>
//         <Typography component="h1" variant="h4" align="center" gutterBottom>
//           Sign In
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           {errors.server && (
//             <Typography color="error" variant="body2" align="center">
//               {errors.server}
//             </Typography>
//           )}
//           <FormControl fullWidth margin="normal">
//             <TextField
//               id="email"
//               label="Email Address"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!errors.email}
//               helperText={errors.email}
//               fullWidth
//               required
//             />
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               id="password"
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={!!errors.password}
//               helperText={errors.password}
//               fullWidth
//               required
//             />
//           </FormControl>
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2, mb: 2 }}
//             disabled={isLoading}
//           >
//             {isLoading ? <CircularProgress size={24} /> : "Sign In"}
//           </Button>
//           <Link href="#" variant="body2" align="center" display="block">
//             Forgot your password?
//           </Link>
//           <Divider sx={{ my: 2 }}>or</Divider>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={() => alert("Sign in with Google")}
//             sx={{ mb: 1 }}
//           >
//             Sign in with Google
//           </Button>
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={() => alert("Sign in with Facebook")}
//           >
//             Sign in with Facebook
//           </Button>
//           <Typography align="center" sx={{ mt: 2 }}>
//             Don't have an account?{" "}
//             <Link href="/signup" variant="body2">
//               Sign up
//             </Link>
//           </Typography>
//         </Box>
//       </Card>
//     </Grid>
//   );
// };

// export default Login;



import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance from "../axiosInstance";
import { Navigate } from "react-router";

const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(4),
  margin: "auto",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("http://192.168.0.100:5000/api/auth/login", { email, password });
      const { accessToken, refreshToken, role } = response.data;

      // Store tokens and role in localStorage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("role", role);

      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect user
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setErrors({ server: error.response?.data?.message || "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <Grid container component="main" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Card>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {errors.server && (
            <Typography color="error" variant="body2" align="center">
              {errors.server}
            </Typography>
          )}
          <TextField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Login;
