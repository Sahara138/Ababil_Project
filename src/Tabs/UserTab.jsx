import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Typography, useTheme } from '@mui/material';

const UserTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // Access the current theme

  const userTab = [
    { label: 'Create User', value: '/users/create' },
    { label: 'All User', value: '/users/list' },
  ];

  // Get current route to set the active tab
  const currentPath = location.pathname;
  const value =
    userTab.find((tab) => currentPath.startsWith(tab.value))?.value || '/users/list';

  // Get the label for the current tab or default to a fallback
  const currentTab = userTab.find((tab) => tab.value === value);

  const handleChange = (event, newValue) => {
    navigate(newValue);
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
        {currentTab?.label || 'User'} Details
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
              aria-label="User tab"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: isDarkMode ? 'blue' : 'blue', // Tab indicator color
                },
              }}
            >
              {userTab.map((tab) => (
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

export default UserTab;

