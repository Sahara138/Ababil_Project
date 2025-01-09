import { useState } from "react";
import './Register.css';
import MuiCard from '@mui/material/Card';
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
  Stack,
  InputAdornment,
} from "@mui/material";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { styled } from "@mui/material/styles";
import { GridVisibilityOffIcon } from "@mui/x-data-grid";


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  // overflow:'auto',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '550px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#673ab7"),
  backgroundColor: "#673ab7",
  borderColor:"#673ab7",
  '&:hover': {
    // backgroundColor: "transparent",
    color:"#673ab7",

  },
}));

const Background = styled(Grid)(() => ({
  // minHeight: "100vh",
  // background:"#eef2f6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // padding: theme.spacing(3), 
}));

const Register = (props) => {
  // const { setUser } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    avatar: "",
    position: "",
    password: "",
    confirmPassword: "",
    role: "",
    permission: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
        // localStorage.setItem("userData", JSON.stringify(result.user));
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
    <AppTheme {...props}>
      <Background container>
        <CssBaseline enableColorScheme/>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            paddingTop="10px"
            paddingBottom="20px"
            sx={{ width: '100%', fontSize: ' 1.15rem'}}
          >
               Ababil Hajj Group
            </Typography>
            <Typography variant="h6" align="center" color="#673ab7" fontWeight={700} sx={{ width: '100%', fontSize: ' 1.25rem',padding:"0"}} gutterBottom>
              Hi, Welcome Back
            </Typography>
            <Typography variant="body2" align="center" sx={{fontSize:"1rem"}} color="textSecondary" gutterBottom>
              Create your account to get started!
            </Typography>
            {errors.server && (
              <Typography color="error" variant="body2" align="center">
                {errors.server}
              </Typography>
            )}
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign in with Google')}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            </Box>
            <Divider sx={{ my: 2 }}>
              <Button
                  fullWidth
                  variant="outlined"
                  sx={{borderRadius:"20px",px:"40px"}}
                >
                  OR
                </Button>
            </Divider>
            <Typography variant="body2" align="center" fontWeight="600" gutterBottom>
              Sign in with Email address
            </Typography> */}
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <div className="infoRow">
                <FormControl fullWidth margin="normal">
                  {/* <FormLabel htmlFor="email">Name</FormLabel> */}
                  <TextField
                    error={!!errors.name}
                    helperText={errors.name}
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    // placeholder={errors.name? errors.name:"Name"}
                    autoComplete="name"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.name? 'error' :'secondary'}
                  />
                </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      error={!!errors.email}
                      helperText={errors.email}
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={!!errors.email ? errors.email: "your@email.com"}
                      autoComplete="email"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.email ? 'error' : 'primary'}
                    />
                </FormControl>
              </div>
              <div className="infoRow">
                <FormControl fullWidth margin="normal">
                    <TextField
                      id="avatar"
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="Avatar URL"
                      autoComplete="avatar"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                      error={!!errors.phone}
                      helperText={errors.phone}
                      id="phone"
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone No."
                      autoComplete="phone"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.name ? 'error' : 'primary'}
                    />
                </FormControl>
              </div>
              <FormControl fullWidth margin="normal">
              <TextField
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div
                         onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <GridVisibilityOffIcon /> : <GridVisibilityOffIcon />}
                        </div>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                    helperText={errors.password}
                    id="password"
                    // type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    style={{cursor:"pointer"}}
                    color={errors.name ? 'error' : 'primary'}
                  // Other props...
                />

                  {/* <TextField
                    error={!!errors.password}
                    helperText={errors.password}
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.name ? 'error' : 'primary'}
                  /> */}
              </FormControl>
              <div className="infoRow">
                <FormControl fullWidth margin="normal">
                    <TextField
                      error={!!errors.role}
                      helperText={errors.role}
                      id="role"
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Role"
                      autoComplete="role"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.name ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                      id="permission"
                      type="text"
                      name="permission"
                      value={formData.permissiion}
                      onChange={handleChange}
                      placeholder="Permission"
                      autoComplete="permission"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                    <TextField
                      error={!!errors.status}
                      helperText={errors.status}
                      id="status"
                      type="boolean"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      placeholder="Status"
                      autoComplete="status"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={errors.name ? 'error' : 'primary'}
                    />
                </FormControl>
              </div>

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I agree to the terms and conditions"
              />
              <ColorButton
                type="submit" fullWidth sx={{ mt: 2 ,border:"2px solid #673ab7"}} disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
              </ColorButton>
              <Divider sx={{mt:1}}/>
              <Typography sx={{ textAlign: 'center',mt:2 }}>
                Already have an account?
                  <span>
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign in
                    </Link>
                  </span>
                </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </Background>
    </AppTheme>
  );
};

export default Register;
