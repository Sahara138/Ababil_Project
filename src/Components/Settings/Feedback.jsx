import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, Grid, Rating } from '@mui/material';
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
  submitButton: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    marginBottom: theme.spacing(2),
  },
}));

const Feedback = () => {
  const classes = useStyles();
  const [rating, setRating] = useState(3);
  const [serviceRating, setServiceRating] = useState('excellent');
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // Handle feedback form submission
    console.log('Feedback submitted:', { name, rating, serviceRating, comments });
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
                  className={classes.title}>We Value Your Feedback</Typography>

      <Typography className={classes.sectionTitle}>Rate your experience</Typography>
      <Box display="flex" alignItems="center" className={classes.gridItem}>
        <Typography variant="body1" className={classes.sectionText}>How would you rate the overall experience?</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
          name="rating"
        />
      </Box>

      <Typography className={classes.sectionTitle}>How was our service?</Typography>
      <FormControl className={classes.formControl} component="fieldset">
        <RadioGroup
          name="serviceRating"
          value={serviceRating}
          onChange={(e) => setServiceRating(e.target.value)}
        >
          <FormControlLabel value="excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="good" control={<Radio />} label="Good" />
          <FormControlLabel value="average" control={<Radio />} label="Average" />
          <FormControlLabel value="poor" control={<Radio />} label="Poor" />
        </RadioGroup>
      </FormControl>

      <Typography className={classes.sectionTitle} style={{marginTop:"20px"}} >Your Comments</Typography>
      <TextField
        fullWidth
        label="Please share your feedback"
        multiline
        rows={4}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className={classes.formControl}
        style={{marginBottom:"20px", marginTop:"10px"}} 
        
      />

      <Typography className={classes.sectionTitle}>Your Name (Optional)</Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        className={classes.formControl}
        style={{ marginTop:"10px"}} 
        
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        onClick={handleSubmit}
        style={{margin:"20px 0"}}     >
        Submit Feedback
      </Button>
    </Box>
  );
};

export default Feedback;
