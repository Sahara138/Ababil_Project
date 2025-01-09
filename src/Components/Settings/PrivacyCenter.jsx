import React from 'react';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[5],
    borderRadius: 8,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  sectionText: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const PrivacyCenter = () => {
  const classes = useStyles();
  const [acceptCookies, setAcceptCookies] = React.useState(false);
  const [shareData, setShareData] = React.useState(false);

  const handleCookieChange = (event) => {
    setAcceptCookies(event.target.checked);
  };

  const handleDataSharingChange = (event) => {
    setShareData(event.target.checked);
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
                  className={classes.title}>Privacy Center</Typography>

      {/* Cookie Preferences */}
      <Box>
        <Typography className={classes.sectionTitle}>Cookie Preferences</Typography>
        <Typography className={classes.sectionText}>
          We use cookies to enhance your experience on our site. Please let us know your cookie preferences.
        </Typography>
        <FormControl className={classes.formControl} component="fieldset">
          <FormControlLabel
            control={<Checkbox checked={acceptCookies} onChange={handleCookieChange} />}
            label="I accept the use of cookies."
          />
        </FormControl>
      </Box>

      <Divider className={classes.divider} />

      {/* Data Sharing Preferences */}
      <Box>
        <Typography className={classes.sectionTitle}>Data Sharing Preferences</Typography>
        <Typography className={classes.sectionText}>
          We value your privacy and want to be transparent about how your data is shared.
        </Typography>
        <FormControl className={classes.formControl} component="fieldset">
          <FormControlLabel
            control={<Checkbox checked={shareData} onChange={handleDataSharingChange} />}
            label="I agree to share my data with third-party partners."
          />
        </FormControl>
      </Box>

      <Divider className={classes.divider} />

      {/* Legal Information */}
      <Box>
        <Typography className={classes.sectionTitle}>Legal Information</Typography>
        <Typography className={classes.sectionText}>
          By using this site, you agree to our <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
        </Typography>
      </Box>

      <Button variant="contained" color="primary" className={classes.button}>
        Save Preferences
      </Button>
    </Box>
  );
};

export default PrivacyCenter;
