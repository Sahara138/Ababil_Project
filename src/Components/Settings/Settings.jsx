import { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SettingsTab from '../../Tabs/SettingTabs';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleTabChange = (event, newTab) => {

    navigate(`/settings/${newTab}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <SettingsTab />
    
    </Box>
  );
};

export default SettingsPage;
