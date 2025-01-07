import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./App.css";
import Login from "./Components/Auth/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/UserList/Users";
import User from "./Components/Users/ViewUser/ViewUser";
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
// import UmrahTabs from "./Tabs/UmrahTabs";
import Pilgrim from "./Components/Umrah/Pilgrims/Pilgrim";
import Ticket_Requisition from "./Components/Umrah/Ticket_Requisition/Ticket_Requisition";
import Payment from "./Components/Umrah/Payment/Payment";
import Departure from "./Components/Umrah/Departure/Departure";
import Voucher from "./Components/Umrah/Voucher/Voucher";
import Hotel from "./Components/Umrah/Hotel_Booking/Hotel";
import Trip from "./Components/Umrah/Trip/Trip";
import CreatePilgrim from "./Components/Umrah/Pilgrims/CreatePilgrim";
import UpdatePilgrim from "./Components/Umrah/Pilgrims/UpdatePilgrim";
import CreateDeparture from "./Components/Umrah/Departure/CreateDeparture";
import UpdateDeparture from "./Components/Umrah/Departure/UpdateDeparture";
import CreateTicketRequisition from "./Components/Umrah/Ticket_Requisition/CreateTicket_Reuisition";
import UpdateTicketRequisition from "./Components/Umrah/Ticket_Requisition/UpdateTicket_Reuisition";
import CreatePayment from "./Components/Umrah/Payment/CreatePayment";
import UpdatePayment from "./Components/Umrah/Payment/UpdatePayment";
import Register from "./Components/Auth/Register/Register";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import CreateVoucher from "./Components/Umrah/Voucher/CreateVoucher";
import UpdateVoucher from "./Components/Umrah/Voucher/UpdateVoucher";
import CreateTrip from "./Components/Umrah/Trip/CreateTrip";
import UpdateTrip from "./Components/Umrah/Trip/UpdateTrip";
import CreateUser from "./Components/Users/AddNewuser/CreateUser";
import ViewUser from "./Components/Users/ViewUser/ViewUser";
import Agents from "./Components/Agent/Agents";
import CreateAgent from "./Components/Agent/CreateAgent";

// import Trip from "./Components/Umrah/Trip/Trip";
// import UmrahLayout from "./Layout/UmrahLayout";

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
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: (
        // <ProtectedRoute>
          <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        
        // For trip Start
        {
          path: "/umrah",
          element: <Trip />,
        },
        {
          path: "/umrah/trip",
          element: <Trip />,
        },
        {
          path: "/umrah/trip/create",
          element: <CreateTrip />,
        },
        {
          // path: "/umrah/pilgrim/view/:id",
          path: "/umrah/trip/view",
          element: <Pilgrim />,
        },
        {
          // path: "/umrah/trip/update/:id",
          path: "/umrah/trip/update",
          element: <UpdateTrip />,
        },
        // For trip end

        // For Pilgrim start
        {
          path: "/umrah/pilgrim",
          element: <Pilgrim />,
        },
        {
          path: "/umrah/pilgrim/create",
          element: <CreatePilgrim />,
        },
        {
          path: "/umrah/pilgrim/view/:id",
          element: <Pilgrim />,
        },
        {
          // path: "/umrah/pilgrim/update/:id",
          path: "/umrah/pilgrim/update",
          element: <UpdatePilgrim />,
        },
        // For Pilgrim end

        {
          path: "/umrah/ticket-requisition",
          element: <Ticket_Requisition />,
        },
        {
          path: "/umrah/ticket-requisition/create",
          element: <CreateTicketRequisition />,
        },
        {
          path: "/umrah/ticket-requisition/view",
          element: <Ticket_Requisition />,
        },
        {
          path: "/umrah/ticket-requisition/update",
          element: <UpdateTicketRequisition />,
        },
        {
          path: "/umrah/payment",
          element: <Payment />,
        },

        {
          path: "/umrah/payment/create",
          element: <CreatePayment />,
        },
        {
          path: "/umrah/payment/view",
          element: <Ticket_Requisition />,
        },
        {
          path: "/umrah/payment/update",
          element: <UpdatePayment />,
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
          path: "/umrah/voucher/create",
          element: <CreateVoucher />,
        },
        {
          path: "/umrah/voucher/view",
          element: <Ticket_Requisition />,
        },
        {
          path: "/umrah/voucher/update",
          element: <UpdateVoucher />,
        },

        // For Departure start
        {
          path: "/umrah/departure",
          element: <Departure />,
        },
        {
          path: "/umrah/departure/create",
          element: <CreateDeparture />,
        },
        {
          path: "/umrah/pilgrim/view/:id",
          element: <Pilgrim />,
        },
        {
          // path: "/umrah/pilgrim/update/:id",
          path: "/umrah/departure/update",
          element: <UpdateDeparture />,
        },
        // For Departure end

        {
          path: "/users/create",
          element: <CreateUser />,
        },
        {
          path: "/users/list",
          element: <Users />,
        },
        {
          // path: "/users/view/:user_id",
          path: "/users/view",
          element: <ViewUser />,
        },
        {
          path: "/users/update",
          // path: "/users/update/:user_id",
          element: <UpdateUser />,
        },
        // Agent start
        {
          path: "/agents/list",
          element: <Agents />,
        },
        {
          path: "/agents/create",
          element: <CreateAgent />,
        },
        {
          // path: "/users/view/:user_id",
          path: "/agent/view",
          element: <ViewUser />,
        },
        {
          path: "/agent/update",
          // path: "/users/update/:user_id",
          element: <UpdateUser />,
        },
        // Agent end
       
        // Employee start
        {
          path: "/employee/list",
          element: <CreateUser />,
        },
        {
          path: "/employee/create",
          element: <Users />,
        },
        {
          // path: "/users/view/:user_id",
          path: "/employee/view",
          element: <ViewUser />,
        },
        {
          path: "/employee/update",
          // path: "/users/update/:user_id",
          element: <UpdateUser />,
        },
        // Employee end
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
