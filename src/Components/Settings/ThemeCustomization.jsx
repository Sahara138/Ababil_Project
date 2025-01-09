import React from 'react';
import { Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[5],
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ThemeCustomization = () => {
  const classes = useStyles();
  const [theme, setTheme] = React.useState('light');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <Box className={classes.container} sx={{mt:6}}>
        <Typography
            component="h2"
            variant="h6"
            sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            }}
            className={classes.header}>Theme Customization Details

            </Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Theme</FormLabel>
        <RadioGroup
          aria-label="theme"
          name="theme"
          value={theme}
          onChange={handleThemeChange}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        </RadioGroup>
        <Button variant="contained" color="primary" className={classes.button}>
            Save Changes
        </Button>
      </FormControl>
    </Box>
  );
};

export default ThemeCustomization;
