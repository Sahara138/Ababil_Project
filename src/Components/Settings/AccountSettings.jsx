import { useTheme } from '@emotion/react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import '../Profile/Profile.css';
import { useState } from 'react';

const AccountSettings = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const user = {
        name: "Sofia ",
        email: "sofia@gmail.com",
        avatar: '/assets/avatar.png',
        jobTitle: 'Senior Developer',
        country: 'USA',
        city: 'Los Angeles',
        timezone: 'GTM-7',
      }
    const [profileData, setProfileData] = useState({
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
        // const [errors, setErrors] = useState({});
        // const [isLoading, setIsLoading] = useState(false);
      
        const handleChange = (e) => {
          setProfileData({ ...profileData, [e.target.name]: e.target.value });
        };
      
        // Validation function for frontend checks
        // const validate = () => {
        //   const newErrors = {};
        //   if (!profileData.name) {
        //     newErrors.name = "Name is required.";
        //   }
        //   if (!profileData.phone || !/^\d{10}$/.test(profileData.phone)) {
        //     newErrors.phone = "Please enter a valid 10-digit phone number.";
        //   }
        //   if (!profileData.email || !/\S+@\S+\.\S+/.test(profileData.email)) {
        //     newErrors.email = "Please enter a valid email address.";
        //   }
        //   if (!profileData.password || profileData.password.length < 6) {
        //     newErrors.password = "Password must be at least 6 characters long.";
        //   }
        //   if (profileData.password !== profileData.confirmPassword) {
        //     newErrors.confirmPassword = "Passwords do not match.";
        //   }
        //   if (!profileData.role) {
        //     newErrors.role = "Role is required.";
        //   }
        //   if (!profileData.status) {
        //     newErrors.status = "Status is required.";
        //   }
      
        //   setErrors(newErrors);
        //   return Object.keys(newErrors).length === 0;
        // };
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          padding: "30px",
          backgroundColor: isDarkMode ? "grey.800" : "white",
          boxShadow: 4,
          marginBottom: "50px",
          color: isDarkMode ? "#f0f0f0" : "grey.900",
          marginTop: 5,
          borderRadius: 3,
          margin: "50px auto",
        }}
      >
        {/* Header */}
         <Typography
                    component="h2"
                    variant="h6"
                    sx={{
                    mt: 2,
                    mb: 3,
                    fontSize: 25,
                    }}
                    >
          Account Details
        </Typography>
        <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "30% 1fr" },
            gap: 3,
          }}
        >
          {/* User Info Card */}
          <div>
            <Card>
              <CardContent>
                <Stack spacing={2} sx={{ alignItems: "center",margin:"20px 0" }}>
                  <div>
                    <Avatar src={ user.avatar} sx={{ height: "80px", width: "80px" }} />
                  </div>
                  <Stack spacing={1} sx={{ textAlign: "center" }}>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {user.jobTitle}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {user.city} {user.country}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <CardActions>
                <Button fullWidth variant="text">
                  Upload picture
                </Button>
              </CardActions>
            </Card>
          </div>

          {/* Form Section */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Card style={{width:"100%"}}>
              <CardHeader 
              sx={{
                margin:"20px 0"
            }} 
              subheader="The information can be edited" 
              title="Profile" />
              <Divider />
              <CardContent sx={{
                margin:"20px 0"
            }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <div >
                    <label>
                      Name
                      <input
                        defaultValue="Sofia"
                        name="name"
                        type='text'
                        value={profileData.name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Email
                      <input
                        defaultValue="sofia@devias.io"
                        id='email'
                        type='email'
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Avatar
                      <input
                        defaultValue="sofia@devias.io"
                        name="email"
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Phone No
                      <input
                        id="phone"
                        name="phone"
                        type="number"
                        value={profileData.phone}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </label>
                  </div>
                  <div >
                    <label>
                        Position
                      <input
                        defaultValue="Software Engineer"
                        id="position"
                        name="position"
                        type='text'
                        value={profileData.position}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Password
                      <input
                        id="phone"
                        name="phone"
                        type="number"
                        value={profileData.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Confirm Password
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Role
                      <input
                        id="role"
                        name="role"
                        type="text"
                        value={profileData.role}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Permission
                      <input
                        id="permission"
                        name="permission"
                        type="text"
                        value={profileData.permission}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Status
                      <input
                        id="status"
                        name="status"
                        type="text"
                        value={profileData.status}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                      />
                  
                    </label>
                  </div>
                </Box>
              </CardContent>
              {/* <Divider /> */}
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" type="submit">
                  Save details
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default AccountSettings;
