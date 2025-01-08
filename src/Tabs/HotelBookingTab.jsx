import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Typography, useTheme } from '@mui/material';

const HotelBookingTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // Access the current theme

  const hotelBookingTab = [
    { label: 'Add Hotel', value: '/umrah/hotelBooking/create' },
    { label: 'Book Hotel for pilgrim', value: '/umrah/hotelBooking/pilgrimCreate' },
    { label: 'Book Hotel for group', value: '/umrah/hotelBooking/groupCreate' },
    { label: 'View All Hotel', value: '/umrah/hotelBooking' },
  ];

  // Get current route to set the active tab
  const currentPath = location.pathname;
  const value = hotelBookingTab.find((tab) => currentPath.startsWith(tab.value))?.value || '/umrah/hotelBooking';

  // Get the label for the current tab
  const currentTab = hotelBookingTab.find((tab) => tab.value === value);

  const handleChange = (event, newValue) => {
    navigate(newValue); // Navigate to the selected tab
  };

  // Check if dark mode is enabled
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <div style={{ width: '100%' }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          mt: 2,
          mb: 3,
          fontSize: 25,
          color: isDarkMode ? 'grey.300' : 'inherit', // Adjust heading color for dark mode
        }}
      >
        {currentTab?.label || 'Hotel Booking'} Details
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box
            sx={{
              border: 1,
              borderRadius: 1,
              padding: '30px 15px 0 15px',
              borderColor: 'transparent',
              backgroundColor: isDarkMode ? 'grey.900' : 'white', // Adjust background for dark mode
              boxShadow: 3,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="Hotel Booking Tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: isDarkMode ? 'blue' : 'blue', // Tab indicator color
                },
              }}
            >
              {hotelBookingTab.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  sx={{
                    color: isDarkMode ? 'grey.300' : 'gray', // Default text color for dark mode
                    '&.Mui-selected': {
                      color: 'blue', // Selected tab text color
                    },
                    '&:hover': {
                      color: 'blue', // Hover text color
                    },
                    padding: '10px 20px',
                  }}
                />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default HotelBookingTab;
