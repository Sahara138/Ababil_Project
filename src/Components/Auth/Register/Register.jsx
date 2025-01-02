import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Card Component for clean UI
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    avatar: "",
    position: "",
    password: "",
    role: "",
    permission: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function for frontend checks
  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.role) {
      newErrors.role = "Role is required.";
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit function that communicates with the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true); // Start loading spinner

    try {
      const response = await fetch("http://192.168.0.100:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the access and refresh tokens
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        console.log("Registration successful:", result);
        alert("Registration successful!");
      } else {
        console.error("Registration failed:", result.message);
        setErrors({ server: result.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ server: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false); // End loading spinner
    }
  };

  return (
    <Grid container component="main" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Card>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {errors.server && (
            <Typography color="error" variant="body2" align="center">
              {errors.server}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <TextField
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="phone"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="avatar"
              label="Avatar URL"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="position"
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="role"
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              error={!!errors.role}
              helperText={errors.role}
              fullWidth
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="permission"
              label="Permission"
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="status"
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              error={!!errors.status}
              helperText={errors.status}
              fullWidth
              required
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="agreeTerms" color="primary" />}
            label="I agree to the terms and conditions"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Link href="/login" variant="body2" align="center" display="block">
            Already have an account? Sign in
          </Link>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Register with Google")}
            sx={{ mb: 1 }}
          >
            Register with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Register with Facebook")}
          >
            Register with Facebook
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Register;
