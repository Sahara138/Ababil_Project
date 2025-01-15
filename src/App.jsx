import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router";
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
import HajjTrip from "./Components/Hajj/Trip/HajjTrip";
import CreateHajjTrip from "./Components/Hajj/Trip/CreateHajjTrip";
import ViewHajjTrip from "./Components/Hajj/Trip/ViewHajjTrip";
import UpdateHajjTrip from "./Components/Hajj/Trip/UpdateHajjTrip";
import HajjPilgrim from "./Components/Hajj/Pilgrims/HajjPilgrim";
import CreateHajjPilgrim from "./Components/Hajj/Pilgrims/CreateHajjPilgrim";
import ViewHajjPilgrim from "./Components/Hajj/Pilgrims/ViewHajjPilgrim";
import UpdateHajjPilgrim from "./Components/Hajj/Pilgrims/UpdateHajjPilgrim";
import HajjTicket_Requisition from "./Components/Hajj/Ticket_Requisition/HajjTicket_Requisition";
import CreateHajjTicket_Reuisition from "./Components/Hajj/Ticket_Requisition/CreateHajjTicket_Reuisition";
import ViewHajjTicket_Requisition from "./Components/Hajj/Ticket_Requisition/ViewHajjTicket_Requisition";
import UpdateHajjTicket_Reuisition from "./Components/Hajj/Ticket_Requisition/UpdateHajjTicket_Reuisition";
import HajjPayment from "./Components/Hajj/Payment/HajjPayment";
import CreateHajjPayment from "./Components/Hajj/Payment/CreateHajjPayment";
import ViewHajjPayment from "./Components/Hajj/Payment/ViewHajjPayment";
import UpdateHajjPayment from "./Components/Hajj/Payment/UpdateHajjPayment";
import HajjHotel from "./Components/Hajj/Hotel_Booking/HajjHotel";
import AddHajjHotel from "./Components/Hajj/Hotel_Booking/AddHajjHotel";
import BookHotelForHajjPilgrim from "./Components/Hajj/Hotel_Booking/BookHotelForHajjPilgrim";
import BookHotelForHajjGroup from "./Components/Hajj/Hotel_Booking/BookHotelForHajjGroup";
import ViewHajjHotel from "./Components/Hajj/Hotel_Booking/ViewHajjHotel";
import UpdateHajjHotel from "./Components/Hajj/Hotel_Booking/UpdateHajjHotel";
import HajjVoucher from "./Components/Hajj/Voucher/HajjVoucher";
import CreateHajjVoucher from "./Components/Hajj/Voucher/CreateHajjVoucher";
import ViewHajjVoucher from "./Components/Hajj/Voucher/ViewHajjVoucher";
import UpdateHajjVoucher from "./Components/Hajj/Voucher/UpdateHajjVoucher";
import HajjDeparture from "./Components/Hajj/Departure/HajjDeparture";
import CreateHajjDeparture from "./Components/Hajj/Departure/CreateHajjDeparture";
import UpdateHajjDeparture from "./Components/Hajj/Departure/UpdateHajjDeparture";
import Settings from "./Components/Settings/Settings";
import Profile from "./Components/Profile/Profile";
import Calculator from "./Components/Calculator/Calculator";
import ThemeCustomization from "./Components/Settings/ThemeCustomization";
import Support from "./Components/Settings/Support";
import AccountSettings from "./Components/Settings/AccountSettings";
import PrivacyCenter from "./Components/Settings/PrivacyCenter";
import Feedback from "./Components/Settings/Feedback";
import History from "./Components/Settings/History";
import RequireAuth from "./Components/Auth/RequireAuth";
import Unauthorized from "./Components/Auth/Unauthorized";
import NotFound from "./Components/NotFound/NotFound";
import Message from "./Components/Message/ChatUI";
import ChatUI from "./Components/Message/ChatUI";


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};


function App() {
 


  const Layout = (props) => {

   
    return (
        <AppTheme {...props} themeComponents={xThemeComponents} >
              <CssBaseline enableColorScheme />
              <Box sx={{ display: "flex" }}>
                <SideMenu  style={{ margin: "50px" }} />
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
      path: "/unauthorized",
      element: <Unauthorized />
    },

    {
      path: "/",
      element: (
        <RequireAuth allowedRoles={"admin"}>
          <Layout />
        </RequireAuth>
        
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/users/:id",
          element: <Profile />,
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
          path: "/umrah/trip/view/:_id",
          element: <ViewTrip />,
        },
        {
          path: "/umrah/trip/update/:_id",
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
          path: "/umrah/pilgrim/view/:_id",
          // path: "/umrah/pilgrim/view",
          element: <ViewPilgrim />
        },
        {
          // path: "/umrah/pilgrim/update/:_id",
          path: "/umrah/pilgrim/update/:_id",
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

          path: "/umrah/departure/update",
          element: <UpdateDeparture />,
        },
        // For Departure end


        ////// For Hajj Start///////
        {
          path: "/hajj",
          element: <HajjTrip/>,
        },
        {
          path: "/hajj/trip",
          element: <HajjTrip />,
        },
        {
          path: "/hajj/trip/create",
          element: <CreateHajjTrip />,
        },
        {
          path: "/hajj/trip/view/:_id",
          element: <ViewHajjTrip />,
        },
        {
          path: "/hajj/trip/update/:_id",
          element: <UpdateHajjTrip />,
        },
        // For trip end

        // For Pilgrim start
        {
          path: "/hajj/pilgrim",
          element: <HajjPilgrim />,
        },
        {
          path: "/hajj/pilgrim/create",
          element: <CreateHajjPilgrim />,
        },
        {
          path: "/hajj/pilgrim/view/:_id",
          element: <ViewHajjPilgrim />,
        },
        {
          path: "/hajj/pilgrim/update/:_id",
          element: <UpdateHajjPilgrim/>,
        },
        // For Pilgrim end

        {
          path: "/hajj/ticket-requisition",
          element: <HajjTicket_Requisition />,
        },
        {
          path: "/hajj/ticket-requisition/create",
          element: <CreateHajjTicket_Reuisition/>,
        },
        {
          path: "/hajj/ticket-requisition/view",
          element: <ViewHajjTicket_Requisition />,
        },
        {
          path: "/hajj/ticket-requisition/update",
          element: <UpdateHajjTicket_Reuisition/>,
        },
        {
          path: "/hajj/payment",
          element: <HajjPayment />,
        },

        {
          path: "/hajj/payment/create",
          element: <CreateHajjPayment />,
        },
        {
          path: "/hajj/payment/view",
          element: <ViewHajjPayment />,
        },
        {
          path: "/hajj/payment/update",
          element: <UpdateHajjPayment />,
        },
        {
          path: "/hajj/hotelBooking",
          element: <HajjHotel />,
        },
        {
          path: "/hajj/hotelBooking/create",
          element: <AddHajjHotel />,
        },
        {
          path: "/hajj/hotelBooking/pilgrimCreate",
          element: <BookHotelForHajjPilgrim/>,
        },
        {
          path: "/hajj/hotelBooking/groupCreate",
          element: <BookHotelForHajjGroup />,
        },
        {
          path: "/hajj/hotelBooking/view",
          element: <ViewHajjHotel />,
        },
        {
          path: "/hajj/hotelBooking/update",
          element: <UpdateHajjHotel />,
        },
        {
          path: "/hajj/voucher",
          element: <HajjVoucher />,
        },
        {
          path: "/hajj/voucher/create",
          element: <CreateHajjVoucher />,
        },
        {
          path: "/hajj/voucher/view",
          element: <ViewHajjVoucher/>,
        },
        {
          path: "/hajj/voucher/update",
          element: <UpdateHajjVoucher />,
        },

        // For Departure start
        {
          path: "/hajj/departure",
          element: <HajjDeparture />,
        },
        {
          path: "/hajj/departure/create",
          element: <CreateHajjDeparture />,
        },
        {
          // path: "/umrah/departure/view/:id",
          path: "/hajj/departure/view",
          element: <ViewHajjVoucher/>,
        },
        {

          path: "/hajj/departure/update",
          element: <UpdateHajjDeparture />,
        },
        // For Departure end
        ///// Hajj end //////
        {
          path: "/ksa",
          element: <Dashboard />,
        },{

          path: "/ticket-manager",
          element: <Dashboard />,
        },{

          path: "/account-manager",
          element: <Dashboard />,
        },
        /////// Settings //////
        {
          path: "/settings",
          element:<Settings />,
          children:[
            {
              path:"theme", 
              element:<ThemeCustomization />
            },
            {
              path:"support", 
              element:<Support />
            },
            {
              path:"account", 
              element:<AccountSettings/>
            },{
              path:"privacy", 
              element:<PrivacyCenter />
            },{
              path:"feedback", 
              element:<Feedback />
            },
            {
              path:"history", 
              element:<History />
            },
          ]
                        
        },
        /////// Settings //////

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
          path: "/agents/view/:_id",
          element: <ViewAgent />,
        },
        {
          path: "/agents/update/:_id",
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
          path: "/employee/view/:_id",
          element: <ViewEmployee />,
        },
        {
          path: "/employee/update/:_id",
          // path: "/users/update/:user_id",
          element: <UpdateEmployee />,
        },
        // Employee end
        {
          path:"/messages" ,
          element:<ChatUI />
        },
        {
          path: "/calculator",
          element: <Calculator />,
        },
      ],
    },
    {
      path:"*", 
      element:<NotFound />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
