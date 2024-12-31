import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./App.css";
import Login from "./components/auth/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/UserList/Users";
import User from "./Components/Users/ViewUser/User";
import AddNewUser from "./Components/Users/AddNewuser/AddNewUser";
import SideMenu from "./Components/SideMenu/SideMenu";
import AppTheme from "./Components/shared-theme/AppTheme";
import { alpha, Box, CssBaseline, Stack } from "@mui/material";
import AppNavbar from "./Components/AppNavbar/AppNavbar";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./Components/theme/customizations";
import Header from "./Components/Header";
import UpdateUser from "./Components/Users/UpdateUser/UpdateUser";
import UmrahTabs from "./Tabs/UmrahTabs";
import Pilgrim from "./Components/Umrah/Pilgrims/Pilgrim";
import Ticket_Requisition from "./Components/Umrah/Ticket_Requisition/Ticket_Requisition";
import Payment from "./Components/Umrah/Payment/Payment";
import Departure from "./Components/Umrah/Departure/Departure";
import Voucher from "./Components/Umrah/Voucher/Voucher";
import Hotel from "./Components/Umrah/Hotel_Booking/Hotel";
import Trip from "./Components/Umrah/Trip/Trip";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App() {
  const Layout = (props) => {
    return (
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: "flex" }}>
          <SideMenu style={{ margin: "50px" }} />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: "auto",
            })}
          >
            <Stack
              className="menu-footer"
              spacing={2}
              sx={{
                alignItems: "center",
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
                position: "absolute",
                top: "50px",
                left: "400px",
                right: "50px",
                bottom: "50px",
              }}
            >
              <Header />
              <Outlet />
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/umrah",
          element: <Users />,
        },
        {
          path: "/users/create",
          element: <AddNewUser />,
        },
        {
          path: "/users/view/:user_id",
          element: <User />,
        },
        {
          path: "/users/update/:user_id",
          element: <UpdateUser />,
        },
        {
          path: "/umrah/trip",
          element: <Trip />,
        },
        {
          path: "/umrah/pilgrim",
          element: <Pilgrim />,
        },
        {
          path: "/umrah/ticket-requisition",
          element: <Ticket_Requisition />,
        },
        {
          path: "/umrah/payment",
          element: <Payment />,
        },
        {
          path: "/umrah/hotelBooking",
          element: <Hotel />,
        },
        {
          path: "/umrah/voucher",
          element: <Voucher />,
        },
        {
          path: "/umrah/departure",
          element: <Departure />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;