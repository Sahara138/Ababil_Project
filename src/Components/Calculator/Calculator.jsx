import React, { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Container,
  Paper,
  Divider,
} from '@mui/material';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [conversionRate, setConversionRate] = useState({ real: 22.5, dollar: 110 });
  const [calculationType, setCalculationType] = useState('basic');
  const [fare, setFare] = useState(0);

  const handleBasicCalculation = (operator) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult('Invalid input');
      return;
    }
    switch (operator) {
      case '+':
        setResult(a + b);
        break;
      case '-':
        setResult(a - b);
        break;
      case '*':
        setResult(a * b);
        break;
      case '/':
        setResult(b !== 0 ? a / b : 'Cannot divide by zero');
        break;
      default:
        setResult('Invalid operation');
    }
  };

  const handleConversion = (currency) => {
    const amount = parseFloat(num1);
    if (isNaN(amount)) {
      setResult('Invalid input');
      return;
    }
    if (currency === 'real') {
      setResult(amount * conversionRate.real);
    } else if (currency === 'dollar') {
      setResult(amount * conversionRate.dollar);
    }
  };

  const handleFareCalculation = () => {
    const distance = parseFloat(num1);
    const rate = parseFloat(num2);
    if (isNaN(distance) || isNaN(rate)) {
      setResult('Invalid input');
      return;
    }
    setFare(distance * rate);
    setResult(`Fare: ${distance * rate} BDT`);
  };

  return (
    <div style={{width:"100%"}}>

    <Container maxWidth="sm" sx={{margin:"100px auto"}}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
          Multi-Functional Calculator
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <label>Calculation Type</label>
          <Select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="basic">Basic Calculation</MenuItem>
            <MenuItem value="fare">Fare Calculation</MenuItem>
            <MenuItem value="real">Real to BDT Conversion</MenuItem>
            <MenuItem value="dollar">Dollar to BDT Conversion</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="text"
              placeholder="Input 1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </Grid>
          {(calculationType === 'basic' || calculationType === 'fare') && (
            <Grid item xs={12}>
              <input
                type="text"
                placeholder="Input 2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </Grid>
          )}
        </Grid>

        <Box sx={{ marginBottom: 3 }}>
          {calculationType === 'basic' && (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBasicCalculation('+')}
                  sx={{ height: '100%' }}
                >
                  +
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBasicCalculation('-')}
                  sx={{ height: '100%' }}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBasicCalculation('*')}
                  sx={{ height: '100%' }}
                >
                  *
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBasicCalculation('/')}
                  sx={{ height: '100%' }}
                >
                  /
                </Button>
              </Grid>
            </Grid>
          )}

          {calculationType === 'fare' && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleFareCalculation}
              sx={{ height: '100%' }}
            >
              Calculate Fare
            </Button>
          )}

          {calculationType === 'real' && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleConversion('real')}
              sx={{ height: '100%' }}
            >
              Convert Real to BDT
            </Button>
          )}

          {calculationType === 'dollar' && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleConversion('dollar')}
              sx={{ height: '100%' }}
            >
              Convert Dollar to BDT
            </Button>
          )}
        </Box>

        {result && (
          <Typography variant="h6" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            Result: {result} Taka/BDT
          </Typography>
        )}

        <Divider sx={{ marginY: 3 }} /> 
        <Typography variant="body2" align="center" color="textSecondary">
          Designed by APCORN INNOVATION
        </Typography>
      </Paper>
    </Container>
    </div>
  );
};

export default Calculator;

