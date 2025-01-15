import { useState, useEffect} from "react";
import MuiCard from '@mui/material/Card';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance from "../axiosInstance";
import AppTheme from "../../shared-theme/AppTheme";

import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { Link, useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { GridVisibilityOffIcon } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
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
  // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100vh',
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
    // backgroundColor: "#AA84EB",
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


const Login = (props) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  // Load saved data from localStorage if "Remember Me" was clicked
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    const savedPassword = localStorage.getItem("remembered_password");
    console.log(savedEmail,savedPassword)

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Automatically check "Remember Me"
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

   
    try {
      const response = await axiosInstance.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response);
      console.log(JSON.stringify(response?.data));         

      const accessToken = response?.data?.accessToken;
  
      console.log(accessToken)
      const roles = response?.data?.role;
      setAuth({user:email, password, roles, accessToken });
     

      // Save access token to local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userRole", roles);

      // Save email and password only if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
        localStorage.setItem("remembered_password", password);
      } else {
        // Remove remembered email and password if "Remember Me" is not checked
        localStorage.removeItem("remembered_email");
        localStorage.removeItem("remembered_password");
      }
      console.log(email,password)
      // Redirect to dashboard and clear login credentials if "Remember Me" is not checked
      toast.success("Login successfully!");
      // navigate("/dashboard"); // Redirect to dashboard
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
     
    } catch (error) {
      if (!error?.response) {
        setErrors('No Server Response');
    } else if (error.response?.status === 400) {
        setErrors('Missing Username or Password');
    } else if (error.response?.status === 401) {
        setErrors('Unauthorized');
    }else{
      toast(error.response?.data?.message || "Login failed.");
      setErrors({ server: error.response?.data?.message || "An error occurred." });
    }
    } finally {
      setIsLoading(false);
    }
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await axios.post(`http://192.168.0.100:5000/api/auth/login`,
//             JSON.stringify({ email, password }),
//             {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             }
//         );
//         console.log(JSON.stringify(response?.data));
//         //console.log(JSON.stringify(response));
//         const accessToken = response?.data?.accessToken;
//         const roles = response?.data?.roles;
//         setAuth({ email, password, roles, accessToken });
//         setEmail('');
//         setPassword('');
//         window.location.href = '/dashboard'
//     } catch (err) {
//         if (!err?.response) {
//             setErrors('No Server Response');
//         } else if (err.response?.status === 400) {
//             setErrors('Missing Username or Password');
//         } else if (err.response?.status === 401) {
//             setErrors('Unauthorized');
//         } else {
//             setErrors('Login Failed');
//         }
//     }
// }

  return (
    <AppTheme {...props}>
      <Background container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <CssBaseline enableColorScheme/>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }}/> 
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
          <Typography
              component="h1"
              variant="h4"
              align="center"
              paddingTop="10px"
              paddingBottom="30px"
              sx={{ width: '100%', fontSize: ' 1.15rem'}}
            >
                Ababil Hajj Group
              </Typography>
              <Typography variant="h6" align="center" color="#673ab7" fontWeight={700} sx={{ width: '100%', fontSize: ' 1.25rem',padding:"0"}} gutterBottom>
                Hi, Welcome Back
              </Typography>
              <Typography variant="body2" align="center" sx={{fontSize:"1rem"}} color="textSecondary" gutterBottom>
                Enter your credentials to continue
              </Typography>
              {errors.server && (
                <Typography color="error" variant="body2" align="center">
                  {errors.server}
                </Typography>
              )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {errors.server && <Typography color="error">{errors.server}</Typography>}
              <FormControl fullWidth margin="normal">
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email}
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={errors.email ? errors.email: "your@email.com"}
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.email ? 'error' : 'primary'}
                  />
              </FormControl>
              <FormControl fullWidth margin="normal">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" style={{cursor:"pointer"}}>
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
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors.name ? 'error' : 'primary'}
                  />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember Me"
              />
              <ColorButton type="submit" fullWidth sx={{ mt: 2 ,border:"2px solid #673ab7"}} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Sign In"}
              </ColorButton>
              <Divider sx={{my:1}}/>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                  <span>
                    <Link
                      style={{color: theme=== 'dark'  ? '#ffffff' : '#000000'}}
                      to="/register"
                      variant="body2"
                      sx={{ alignSelf: 'center',fontWeight:700 }}
                    >
                    <u>Register</u>
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

export default Login;

