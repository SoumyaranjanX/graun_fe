import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';

import { Dots } from "react-activity";
import "react-activity/dist/library.css";

export default function RejectOrderModal({ orderReject, rejectOrder, orderDetails, openPop, closePopup, setBackendCallLoading, backendCallLoading }) {
    const [rejectReason, setRejectReason] = useState('');
    const [rejectNote, setRejectNote] = useState('');

  return (
    <Dialog
      open={openPop}
      onClose={closePopup}
      style={{
        borderRadius: '20px',
        height: 'auto',
      }}
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } } }}
    >
      <DialogTitle>Are you sure you want to reject this order?</DialogTitle>
      <DialogContent>
        {orderDetails.order_source.order_source != "graun foods"?
        <>
          <TextField
            id="outlined-select-time"
            select
            placeholder="Select Prep Time"
            style={{
              width: '100%',
              height: '40px',
              marginTop: '10px',
            }}
            value={rejectReason}
            onChange={(e) => {
              console.log('changed');
              setRejectReason(e.target.value);
            }}
          >
            {orderReject.map((option: { value: any; label: any }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            placeholder="Rejection Note"
            style={{
              width: '100%',
              height: '40px',
              marginTop: '30px',
            }}
            // value={rejectNote}

            onClick={(e) => {
              console.log('clicked');
            }}
            onChange={(e) => {
              console.log('changed');
              setRejectNote(e.target.value);
            }}
          ></TextField>
        </>
        :<></>}
      </DialogContent>
      <DialogActions>
        <button
          onClick={closePopup}
          style={{
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '20px',
            padding: '10px',
            fontSize: '0.7rem',
          }}
        >
          No Keep it
        </button>
        <button
          onClick={() => {
            if (!backendCallLoading) {
              setBackendCallLoading(true);
              rejectOrder(orderDetails.temp_order_id || null, rejectNote, rejectReason);
            }
          }}
          style={{
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '20px',
            fontSize: '0.7rem',
            padding: '10px',
          }}
        >
          {!backendCallLoading ? 'Yes Reject it' : <Dots />}
        </button>
      </DialogActions>
    </Dialog>
  );
}
