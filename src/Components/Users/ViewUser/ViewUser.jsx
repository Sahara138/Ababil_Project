// import SinglePage from '../../SinglePage/SinglePage'

// const User = () => {
//   return (
//     <div style={{width:"100%",marginTop:'50px'}}>
//         <SinglePage />
//     </div>
//   )
// }

// export default User

// import { useEffect, useState } from "react";
// import { Box, Button, Typography, Divider } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { useNavigate, useParams } from "react-router";
// import UserTab from "../../../Tabs/UserTab";

// const ViewUser = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const navigate = useNavigate();
//   const { userId } = useParams(); // Get user ID from route params

//   const [userData, setUserData] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch user data by ID
//   useEffect(() => {
//     fetch(`http://localhost:8000/users/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUserData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err.message);
//         setLoading(false);
//       });
//   }, [userId]);

//   // Navigate back to the user list
//   const handleBack = () => {
//     navigate("/users/list");
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <UserTab />
//       <Box
//         sx={{
//           marginTop: 5,
//           border: 1,
//           borderRadius: 1,
//           padding: "30px",
//           borderColor: "transparent",
//           backgroundColor: isDarkMode ? "grey.900" : "white",
//           boxShadow: 3,
//           marginBottom: "50px",
//           color: isDarkMode ? "#99a1b7" : "grey.900",
//         }}
//       >
//         <Typography
//           component="h4"
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 3,
//             fontSize: 25,
//             color: isDarkMode ? "#99a1b7" : "inherit",
//           }}
//         >
//           User Details
//         </Typography>
//         <Divider sx={{ backgroundColor: isDarkMode ? "grey.700" : "#99a1b7" }} />

//         {loading ? (
//           <Typography variant="body1">Loading...</Typography>
//         ) : userData ? (
//           <div>
//             <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
//               {userData.name}
//             </Typography>
//             <Typography variant="body1">ID: {userData.id}</Typography>
//             <Typography variant="body1">Email: {userData.email}</Typography>
//             <Typography variant="body1">Phone: {userData.phone}</Typography>
//             <Typography variant="body1">Position: {userData.position}</Typography>
//             <Typography variant="body1">Role: {userData.role}</Typography>
//             <Typography variant="body1">Permission: {userData.permission}</Typography>
//             <Typography variant="body1">Status: {userData.status}</Typography>
//             {userData.avatar && (
//               <img
//                 src={userData.avatar}
//                 alt={`${userData.name}'s avatar`}
//                 style={{ width: 100, height: 100, marginTop: 10 }}
//               />
//             )}
//             <Button variant="contained" sx={{ mt: 3 }} onClick={handleBack}>
//               Back to User List
//             </Button>
//           </div>
//         ) : (
//           <Typography variant="body1">User not found.</Typography>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default ViewUser;




import { Box, Button, Typography, Divider, TableRow, TableCell, TableContainer, Table, TableBody } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import UserTab from "../../../Tabs/UserTab";

const ViewUser = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Static mock data
  const mockUserData = {
    id: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    avatar: "https://via.placeholder.com/100",
    position: "Software Engineer",
    role: "User",
    permission: "Read",
    status: "Active",
  };

  // Navigate back to the user list
  const handleBack = () => {
    navigate("/users/list");
  };

  return (
    <div style={{ width: "100%" }}>
      <UserTab />
      
      <Box
  sx={{
    // borderRadius: 2,
    padding: "30px",
    backgroundColor: isDarkMode ? "grey.800" : "white",
    boxShadow: 4,
    marginBottom: "50px",
    color: isDarkMode ? "#f0f0f0" : "grey.900",
    marginTop: 5,
    // padding: 4,
    borderRadius: 3,
    // backgroundColor: isDarkMode ? "grey.900" : "#ffffff",
    // boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    // color: isDarkMode ? "#e0e0e0" : "#37474f",
    // maxWidth: 800,
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
    User Details
  </Typography>
  <Divider sx={{ backgroundColor: isDarkMode ? "grey.800" : "#cfd8dc", mb: 3 }} />

  {/* Avatar */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 4,
    }}
  >
    {mockUserData.avatar ? (
      <img
        src={mockUserData.avatar}
        alt={`${mockUserData.name}'s avatar`}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `4px solid ${isDarkMode ? "#616161" : "#e0e0e0"}`,
        }}
      />
    ) : (
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: isDarkMode ? "grey.800" : "#eceff1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "#757575",
        }}
      >
        N/A
      </Box>
    )}
  </Box>

  {/* User Details Grid */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 3,
    }}
  >
    {[
      { label: "Name", value: mockUserData.name },
      { label: "ID", value: mockUserData.id },
      { label: "Email", value: mockUserData.email },
      { label: "Phone", value: mockUserData.phone },
      { label: "Position", value: mockUserData.position },
      { label: "Role", value: mockUserData.role },
      { label: "Permission", value: mockUserData.permission },
      { label: "Status", value: mockUserData.status },
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
      onClick={()=>navigate("/users/update")}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        paddingX: 3,
        paddingY: 1,
        borderRadius: 3,
      }}
    >
      Edit Profile
    </Button>
  </Box>
</Box>



    </div>
  );
};

export default ViewUser;

