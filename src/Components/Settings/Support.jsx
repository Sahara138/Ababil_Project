import React from 'react';
import { Box, Button, Typography } from '@mui/material';
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
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Support = () => {
  const classes = useStyles();

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
                  className={classes.title}>Support Details</Typography>
      <Typography variant="body1">If you have any questions or need assistance, feel free to reach out to our support team.</Typography>
      <Button variant="contained" color="primary" className={classes.button}  style={{margin:"20px 0"}}>
        Contact Support
      </Button>
    </Box>
  );
};

export default Support;
