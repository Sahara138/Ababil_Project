import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UmrahTabs from "../../../Tabs/UmrahTabs";
import { useTheme } from "@emotion/react";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';


const CreatePayment = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  // State to store form values
  const [paymentId, setPaymentId] = useState("");
  const [pilgrimName, setPilgrimName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [remarks, setRemarks] = useState("");

  // State to handle errors
  const [errors, setErrors] = useState({
    paymentId: "",
    pilgrimName: "",
    amountPaid: "",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  });

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!paymentId.trim()) {
      newErrors.paymentId = "* Payment ID is required.";
    }
    if (!pilgrimName.trim()) {
      newErrors.pilgrimName = "* Pilgrim Name is required.";
    }
    if (!amountPaid || isNaN(amountPaid) || Number(amountPaid) <= 0) {
      newErrors.amountPaid = "* Amount Paid must be a positive number.";
    }
    if (!paymentDate.trim()) {
      newErrors.paymentDate = "* Payment Date is required.";
    }
    if (!paymentMethod.trim()) {
      newErrors.paymentMethod = "* Payment Method is required.";
    }
    if (!transactionId.trim()) {
      newErrors.transactionId = "* Transaction ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      paymentId,
      pilgrimName,
      amountPaid,
      paymentDate,
      paymentMethod,
      transactionId,
      remarks,
    };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:8000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Payment Created Successfully");
          navigate("/umrah/payments"); // Redirect after successful creation
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setPaymentId("");
    setPilgrimName("");
    setAmountPaid("");
    setPaymentDate("");
    setPaymentMethod("");
    setTransactionId("");
    setRemarks("");
  };

  return (
    <div style={{ width: '100%' }}>
      <UmrahTabs />
      <Box
        sx={{
          marginTop: 5,
          border: 1,
          borderRadius: 1,
          padding: '30px',
          borderColor: 'transparent',
          backgroundColor: isDarkMode ? 'grey.900' : 'white',
          boxShadow: 3,
          marginBottom: '50px',
          color: isDarkMode ? 'grey.300' : 'grey.900',
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? 'grey.300' : 'inherit',
          }}
        >
          Payment Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : 'grey.300',
          }}
        />
        
        <div className="payment-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
            <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Create Payment
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="paymentId">Payment ID</label>
                <input
                  id="paymentId"
                  name="paymentId"
                  type="text"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                />
                {errors.paymentId && <span className="error">{errors.paymentId}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="pilgrimName">Pilgrim Name</label>
                <input
                  id="pilgrimName"
                  name="pilgrimName"
                  type="text"
                  value={pilgrimName}
                  onChange={(e) => setPilgrimName(e.target.value)}
                />
                {errors.pilgrimName && <span className="error">{errors.pilgrimName}</span>}
              </div>
              
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="amountPaid">Amount Paid</label>
                <input
                  id="amountPaid"
                  name="amountPaid"
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
                {errors.amountPaid && <span className="error">{errors.amountPaid}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="paymentDate">Payment Date</label>
                <input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
                {errors.paymentDate && <span className="error">{errors.paymentDate}</span>}
              </div>
            </div>
            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="paymentMethod">Payment Method</label>
                <input
                  id="paymentMethod"
                  name="paymentMethod"
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="transactionId">Transaction ID</label>
                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {errors.transactionId && <span className="error">{errors.transactionId}</span>}
              </div>
            </div>

            <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "grey.300" : "inherit" }}htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows="4"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create Payment
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreatePayment;
