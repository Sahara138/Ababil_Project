import { useState } from "react";
import { Box, Button, Divider, Typography} from "@mui/material";
import { useNavigate } from "react-router";
import HajjTabs from "../../../Tabs/HajjTabs";
import { useTheme } from "@emotion/react";
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import Select from 'react-select';

const CreateVoucher = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  // State to store form values
  const [agent, setAgent] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  
  

  // State to handle errors
  const [errors, setErrors] = useState({
    agent: "",
    category: "",
    quantity: "",
    totalAmount: "",
  });

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!agent.trim()) {
      newErrors.agent = "* Agent is required.";
    }
    if (!category.trim()) {
      newErrors.category = "* Category is required.";
    }
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      newErrors.quantity = "* Quantity must be a positive number.";
    }
    if (!totalAmount || isNaN(totalAmount) || Number(totalAmount) <= 0) {
      newErrors.totalAmount = "* Total Amount must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      agent,
      category,
      quantity,
      totalAmount,
      remarks,
    };
    if (validate()) {
      console.log("Form Submitted:", formData);
      fetch("http://localhost:8000/vouchers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          alert("Voucher Created Successfully");
          navigate("/hajj/vouchers"); // Redirect after successful creation
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("Validation Failed");
    }
  };

  // Handle cancel action (reset form fields)
  const handleCancel = () => {
    setAgent("");
    setCategory("");
    setQuantity("");
    setTotalAmount("");
    setRemarks("");
  };

  return (
    <div style={{ width: '100%' }}>
      <HajjTabs />
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
          color: isDarkMode ? '#99a1b7' : 'grey.900',
        }}
      >
        <Typography
          component="h4"
          variant="h6"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: 25,
            color: isDarkMode ? '#99a1b7' : 'inherit',
          }}
        >
          Voucher Management
        </Typography>
        <Divider
          sx={{
            backgroundColor: isDarkMode ? 'grey.700' : '#99a1b7',
          }}
        />
        
        <div className="voucher-create" style={{ width: "100%" }}>
          <div style={{ height: "auto", width: "100%" }}>
            <div className="info">
              <ContactsRoundedIcon className="title-icon"/>
              <Typography component="h2" variant="h5" sx={{ mb: 3, mt: 3 }}>
                Create Voucher
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="infoRow">
            <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="agent">Agent</label>
                <Select
                  id="agent"
                  name="agent"
                  value={agent}
                  placeholder="Select Agent Type"
                  options={options}
                  onChange={(selectedOption) => setAgent(selectedOption.value)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                >
                </Select>
                {errors.agent && <span className="error">{errors.agent}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="category">Category</label>
                <Select
                  id="category"
                  name="category"
                  value={category}
                  placeholder="Select category Type"
                  options={options}
                  onChange={(selectedOption) => setCategory(selectedOption.value)}
                  className="custom-select"
                  style={{
                    color: isDarkMode ? "black" : "inherit",
                  }}
                
                >
                  
                </Select>
                {errors.category && <span className="error">{errors.category}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
              </div>
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="totalAmount">Total Amount</label>
                <input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
                {errors.totalAmount && <span className="error">{errors.totalAmount}</span>}
              </div>
            </div>

            {/* <div className="infoRow">
              <div className="inputField">
                <label style={{ color: isDarkMode ? "#99a1b7" : "inherit" }} htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows="4"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div> */}

            <div className="formActions">
              <Button type="button" onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create Voucher
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateVoucher;



