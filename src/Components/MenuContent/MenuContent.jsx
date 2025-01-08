import './MenuContent.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaaba } from '@fortawesome/free-solid-svg-icons'; // Example icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import MosqueIcon from '@mui/icons-material/Mosque';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FlagIcon from '@mui/icons-material/Flag';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';



import { NavLink, useLocation } from 'react-router-dom';
import { Collapse} from '@mui/material';
import { useState } from 'react';

// Main menu items
const mainListItems = [
  {
    path: '/dashboard',
    segment: 'dashboard',
    text: 'Dashboard',
    icon: <DashboardIcon />,
    children: []  // No children for dashboard
  },
  {
    segment: 'umrah',
    path: '/umrah',
    text: 'Umrah',
    icon: <MosqueIcon />,
    children: [
      { path: '/umrah/trip', 
        icon:"",text: 'Trip' },
      { path: '/umrah/pilgrim', text: 'Pilgrims' },
      { path: '/umrah/ticket-requisition', text: 'Ticket Requsation' },
      { path: '/umrah/payment', text: 'Payment' },
      { path: '/umrah/hotelBooking', text: 'Hotel Booking' },
      { 
        path: '/umrah/voucher',
        text: 'Voucher',
        children:[
          { path: '/umrah/voucher/create', text: 'Create Voucher' },
          { path: '/umrah/voucher', text: 'Voucher List' }
        ]
       },
      { path: '/umrah/departure', text: 'Departure' }
    ]
  },{
    segment: 'hajj',
    path: '/hajj',
    text: 'Hajj',
    icon: <FontAwesomeIcon icon={faKaaba} />,
    children: [
      { path: '/hajj/trip', text: 'Trip' },
      { path: '/hajj/addPilgrim', text: 'Pilgrims' },
      { path: '/hajj/ticketRequsation', text: 'Ticket Requsation' },
      { path: '/hajj/payment', text: 'Payment' },
      { path: '/hajj/hotelBooking', text: 'Hotel Booking' },
      { 
        path: '/hajj/voucher',
         text: 'Voucher' ,
         children:[
          { path: '/hajj/voucher/create', text: 'Create Voucher' },
          { path: '/hajj/voucher', text: 'Voucher List' }
        ]
        },
      { path: '/hajj/departure', text: 'Departure' }
    ]
  },
  {
    path: '/ksa',
    segment: 'ksa',
    text: 'KSA',
    icon: <FlagIcon />,
    children: [] 
  },
  {
    path: '/ticket-manager',
    segment: 'ticket-manager',
    text: 'Ticket Manager',
    icon: <ConfirmationNumberIcon />,
    children: []  
  },{
    path: '/account-manager',
    segment: 'account-manager',
    text: 'Account Manager',
    icon:  <AccountBoxIcon />,
    children: [] 
  },{
    path: '/settings',
    segment: 'settings',
    text: 'Settings',
    icon: <SettingsIcon />,
    children: [] 
  },
  {
    segment: 'users',
    path: '/users/list',
    text: 'User Management',
    icon: <PersonIcon />,
    children: [
      { path: '/users/create', text: 'Create User' },
      { path: '/users/list', text: 'All User' }
    ]
  },
  // Additional main menu items
  {
    segment: 'agents',
    path: '/agents/list',
    text: 'Agents',
    icon:<PeopleIcon />,
    children: [
      { path: '/agents/create', text: 'Create Agent' },
      { path: '/agents/list', text: 'All Agent' }
    ]
  },  
  {
    segment: 'employee',
    path: '/employee/list',
    text: 'Employee',
    icon: <WorkIcon />,
    children: [
      { path: '/employee/create', text: 'Create Employee' },
      { path: '/employee/list', text: 'Employee List' }
    ]
  },

];

export default function MenuContent() {
  const location = useLocation(); // Get the current URL
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  // Handle the opening and closing of dropdown menus
  const handleMenuClick = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle open/close on click
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between',position:"relative", top:{sm:"100px",xs:"none"}
    // padding:{xs:"0",md:" 0", lg:""}
    }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#1976d2' : 'inherit', // Active menu color
                  backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'inherit', // Active menu background
                  borderRadius: '8px',
                })}
              >
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => item.children.length > 0 && handleMenuClick(index)}
                >
                  <div className="menu">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} className="title" />
                  </div>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {item.children.length > 0 && (
              <Collapse in={openMenu === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => (
                    <ListItem key={childIndex} disablePadding sx={{ pl: 4 }}>
                      <NavLink
                        to={child.path}
                        style={({ isActive }) => ({
                          textDecoration: 'none',
                          color: isActive ? '#1976d2' : 'inherit',
                          backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'inherit',
                          borderRadius: '8px',
                        })}
                      >
                        <ListItemButton selected={location.pathname === child.path}>
                          <ListItemIcon />
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Stack>
  );
}
