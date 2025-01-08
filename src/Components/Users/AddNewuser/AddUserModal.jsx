import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
// import './AddUserModal.css';

  

const AddUserModal = (props) => {

  const handleClose = () =>{
     setOpen(false);
    
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
         //add new item
        //  axios.post(`/api/${slug}s`, {})
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        animation: props.open ? 'slideDown 0.3s ease-out forwards' : 'none',
      };


  return (
    <div className='addUser'>
        <Modal
        open={props.open}
        onClose={handleClose}
        className=''
        tabindex="-1"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="fade">
            <div className="add-modal-title">
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    Add New User
                </Typography>
                <span className='close' onClick={()=>props.setOpen(false)}>X</span>
            </div>
           
          <form action="" method="get" onSubmit={handleSubmit}>
          {props.columns
              .filter((item) => item.field !== 'id' && item.field !== 'avatar')
              .map((column, index) => {
                return(
                <div className="item" key={index}>
                  <label htmlFor={column.field}>{column.headerName}</label>
                  <input
                    id={column.field}
                    type={column.type || 'text'}
                    placeholder={`Enter ${column.headerName}`}
                  />
                </div>
              )})}
              <Button variant="contained">Save</Button>
          </form>
        </Box>
      </Modal>
      
    </div>
  )
}

export default AddUserModal
