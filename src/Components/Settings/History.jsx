import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from '@mui/material';
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
  tableContainer: {
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  tableCell: {
    color: theme.palette.text.primary,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  viewButton: {
    marginTop: theme.spacing(3),
  },
}));

const History = () => {
  const classes = useStyles();

  // Sample data for the history table
  const historyData = [
    { id: 1, action: 'Logged In', date: '2025-01-01', status: 'Success' },
    { id: 2, action: 'Password Changed', date: '2025-01-02', status: 'Success' },
    { id: 3, action: 'Updated Profile', date: '2025-01-03', status: 'Pending' },
    { id: 4, action: 'Order Placed', date: '2025-01-04', status: 'Success' },
    { id: 5, action: 'Refund Requested', date: '2025-01-05', status: 'Failed' },
  ];

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
                  className={classes.title}>Your Activity History</Typography>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="history table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell className={classes.tableCell}>Action</TableCell>
              <TableCell className={classes.tableCell}>Date</TableCell>
              <TableCell className={classes.tableCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.id} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{row.action}</TableCell>
                <TableCell className={classes.tableCell}>{row.date}</TableCell>
                <TableCell className={classes.tableCell}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.viewButton}
      >
        View More Activity
      </Button>
    </Box>
  );
};

export default History;
