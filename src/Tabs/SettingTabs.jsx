import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Typography, useTheme } from '@mui/material';
import { Support } from '@mui/icons-material';

const SettingsTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // Access the current theme

  const tabs = [
    { label: 'Theme Customization', value: '/settings/theme' },
    { label: 'Support', value: '/settings/support' },
    { label: 'Account Settings', value: '/settings/account' },
    { label: 'Privacy Center', value: '/settings/privacy' },
    { label: 'Feedback', value: '/settings/feedback' },
    { label: 'History', value: '/settings/history' },
  ];

  // Get current route to set the active tab
  const currentPath = location.pathname;
  const value = tabs.find((tab) => currentPath.startsWith(tab.value))?.value || '/settings/theme';

  // Get the label for the current tab
//   const currentTab = tabs.find((tab) => tab.value === value);

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  // Check if dark mode is enabled
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <div style={{ width: '100%' }}>

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
              aria-label="Settings tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: isDarkMode ? 'blue' : 'blue', // Tab indicator color
                },
              }}
            >
              {tabs.map((tab) => (
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
            <Outlet />
        </TabContext>
      </Box>
    </div>
  );
};

export default SettingsTab;

