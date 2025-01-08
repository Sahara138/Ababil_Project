import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./App.css";
import Login from "./Components/Auth/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/UserList/Users";
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
import UpdateAgent from "./Components/Agent/UpdateAgent";
import ViewAgent from "./Components/Agent/ViewAgent";
import ViewTrip from "./Components/Umrah/Trip/ViewTrip";
import ViewPilgrim from "./Components/Umrah/Pilgrims/ViewPilgrim";
import Employees from "./Components/Employee/Employees";
import CreateEmployee from "./Components/Employee/CreateEmployee";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";
import ViewDeparture from "./Components/Umrah/Departure/ViewDeparture";
import ViewPayment from "./Components/Umrah/Payment/ViewPayment";
import ViewTicketRequisition from "./Components/Umrah/Ticket_Requisition/ViewTicket_Requisition";
import AddHotel from "./Components/Umrah/Hotel_Booking/AddHotel";
import ViewHotel from "./Components/Umrah/Hotel_Booking/ViewHotel";
import UpdateHotel from "./Components/Umrah/Hotel_Booking/UpdateHotel";
import BookHotelForPilgrim from "./Components/Umrah/Hotel_Booking/BookHotelForPilgrim";
import BookHotelForGroup from "./Components/Umrah/Hotel_Booking/BookHotelForGroup";
import ViewVoucher from "./Components/Umrah/Voucher/ViewVoucher";

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
          element: <ViewTrip />,
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
          // path: "/umrah/pilgrim/view/:id",
          path: "/umrah/pilgrim/view",
          element: <ViewPilgrim />,
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
          element: <ViewTicketRequisition />,
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
          element: <ViewPayment />,
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
          path: "/umrah/hotelBooking/create",
          element: <AddHotel />,
        },
        {
          path: "/umrah/hotelBooking/pilgrimCreate",
          element: <BookHotelForPilgrim/>,
        },
        {
          path: "/umrah/hotelBooking/groupCreate",
          element: <BookHotelForGroup />,
        },
        {
          path: "/umrah/hotelBooking/view",
          element: <ViewHotel />,
        },
        {
          path: "/umrah/hotelBooking/update",
          element: <UpdateHotel />,
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
          element: <ViewVoucher />,
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
          // path: "/umrah/departure/view/:id",
          path: "/umrah/departure/view",
          element: <ViewDeparture />,
        },
        {
          // path: "/umrah/pilgrim/update/:id",
          path: "/umrah/departure/update",
          element: <UpdateDeparture />,
        },
        // For Departure end


        ////// For Hajj Start///////
        {
          path: "/hajj",
          element: <Trip />,
        },
        {
          path: "/hajj/trip",
          element: <Trip />,
        },
        {
          path: "/hajj/trip/create",
          element: <CreateTrip />,
        },
        {
          // path: "/umrah/pilgrim/view/:id",
          path: "/hajj/trip/view",
          element: <ViewTrip />,
        },
        {
          // path: "/umrah/trip/update/:id",
          path: "/hajj/trip/update",
          element: <UpdateTrip />,
        },
        // For trip end

        // For Pilgrim start
        {
          path: "/hajj/pilgrim",
          element: <Pilgrim />,
        },
        {
          path: "/hajj/pilgrim/create",
          element: <CreatePilgrim />,
        },
        {
          // path: "/umrah/pilgrim/view/:id",
          path: "/hajj/pilgrim/view",
          element: <ViewPilgrim />,
        },
        {
          // path: "/umrah/pilgrim/update/:id",
          path: "/hajj/pilgrim/update",
          element: <UpdatePilgrim />,
        },
        // For Pilgrim end

        {
          path: "/hajj/ticket-requisition",
          element: <Ticket_Requisition />,
        },
        {
          path: "/hajj/ticket-requisition/create",
          element: <CreateTicketRequisition />,
        },
        {
          path: "/hajj/ticket-requisition/view",
          element: <ViewTicketRequisition />,
        },
        {
          path: "/hajj/ticket-requisition/update",
          element: <UpdateTicketRequisition />,
        },
        {
          path: "/hajj/payment",
          element: <Payment />,
        },

        {
          path: "/hajj/payment/create",
          element: <CreatePayment />,
        },
        {
          path: "/hajj/payment/view",
          element: <ViewPayment />,
        },
        {
          path: "/hajj/payment/update",
          element: <UpdatePayment />,
        },
        {
          path: "/hajj/hotelBooking",
          element: <Hotel />,
        },
        {
          path: "/hajj/hotelBooking/create",
          element: <AddHotel />,
        },
        {
          path: "/hajj/hotelBooking/pilgrimCreate",
          element: <BookHotelForPilgrim/>,
        },
        {
          path: "/hajj/hotelBooking/groupCreate",
          element: <BookHotelForGroup />,
        },
        {
          path: "/hajj/hotelBooking/view",
          element: <ViewHotel />,
        },
        {
          path: "/hajj/hotelBooking/update",
          element: <UpdateHotel />,
        },
        {
          path: "/hajj/voucher",
          element: <Voucher />,
        },
        {
          path: "/hajj/voucher/create",
          element: <CreateVoucher />,
        },
        {
          path: "/hajj/voucher/view",
          element: <ViewVoucher />,
        },
        {
          path: "/hajj/voucher/update",
          element: <UpdateVoucher />,
        },

        // For Departure start
        {
          path: "/hajj/departure",
          element: <Departure />,
        },
        {
          path: "/hajj/departure/create",
          element: <CreateDeparture />,
        },
        {
          // path: "/umrah/departure/view/:id",
          path: "/hajj/departure/view",
          element: <ViewDeparture />,
        },
        {
          // path: "/umrah/pilgrim/update/:id",
          path: "/hajj/departure/update",
          element: <UpdateDeparture />,
        },
        // For Departure end
        ///// Hajj end //////

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
          path: "/agents/view",
          element: <ViewAgent />,
        },
        {
          path: "/agents/update",
          // path: "/users/update/:user_id",
          element: <UpdateAgent />,
        },
        // Agent end
       
        // Employee start
        {
          path: "/employee/list",
          element: <Employees />,
        },
        {
          path: "/employee/create",
          element: <CreateEmployee />,
        },
        {
          // path: "/users/view/:user_id",
          path: "/employee/view",
          element: <ViewEmployee />,
        },
        {
          path: "/employee/update",
          // path: "/users/update/:user_id",
          element: <UpdateEmployee />,
        },
        // Employee end
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
