import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';

export default function CancelOrderModal({ cancelOrder, orderDetails, openPop, closePopup  }) {
    const [cancelReason, setcancelReason] = useState('');
    const [cancelNote, setcancelNote] = useState('');

    let orderCancelReasons: any[] = [];

    if(orderDetails.order_source.order_source == 'uber eats'){
      orderCancelReasons = [
        {
            value: 'ITEM_ISSUE',
            label: 'Item Issue'
        },
        {
            value: 'KITCHENCLOSED',
            label: 'Kitchen Closed'
        },
        {
            value: 'CUSTOMER_CALLED_TO_CANCEL',
            label: 'Customer Called to Cancel'
        },
        {
            value: 'RESTAURANT_TOO_BUSY',
            label: 'Restaurant Too Busy'
        },
        {
            value: 'ORDER_VALIDATION',
            label: 'Order Validation'
        },
        {
            value: 'STORE_CLOSED',
            label: 'Store Closed'
        },
        {
            value: 'TECHNICAL_FAILURE',
            label: 'Technical Failure'
        },
        {
            value: 'POS_NOT_READY',
            label: 'POS Not Ready'
        },
        {
            value: 'POS_OFFLINE',
            label: 'POS Offline'
        },
        {
            value: 'CAPACITY',
            label: 'Capacity'
        },
        {
            value: 'ADDRESS',
            label: 'Address Issue'
        },
        {
            value: 'SPECIAL_INSTRUCTIONS',
            label: 'Special Instructions'
        },
        {
            value: 'PRICING',
            label: 'Pricing Issue'
        },
        {
            value: 'UNKNOWN',
            label: 'Unknown'
        },
        {
            value: 'OTHER',
            label: 'Other'
        }
    ];
    }


    else if(orderDetails.order_source.order_source == 'graun foods'){
      orderCancelReasons = [
        {
            value: 'out-of-stock',
            label: 'Out Of Stock'
        },
        {
            value: 'incorrect-address',
            label: 'Incorrect Address'
        },
        {
            value: 'customer-requested',
            label: 'Customer Requested'
        },
        {
            value: 'payment-issues',
            label: 'Payment Issues'
        },
        {
            value: 'unforeseen-circumstances',
            label: 'Unforeseen Circumstances'
        },
        {
            value: 'technical-issues',
            label: 'Technical Issues'
        },
        {
            value: 'OTHER',
            label: 'Other'
        }
    ];
  }
  

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
    <DialogTitle>Are you sure you want to cancel this order?</DialogTitle>
    <DialogContent>
      <TextField
        id="outlined-select-time"
        select
        placeholder="Select"
        style={{
          width: '100%',
          height: '40px',
          marginTop: '10px',
        }}
        value={cancelReason}
        onChange={(e) => {
          console.log('changed')
          setcancelReason(e.target.value);
        }}
      >
        {orderCancelReasons.map((option: { value: any; label: any; }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="Cancel Note"
        style={{
          width: '100%',
          height: '40px',
          marginTop: '30px',
        }}
        
        onClick={(e) => {console.log('clicked')}}
        onChange={(e) => {
          console.log('changed')
          setcancelNote(e.target.value);
        }}
      >
      </TextField>
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
          cancelOrder(orderDetails.order_id || null, cancelNote, cancelReason);
        }}
        style={{
          color: 'white',
          backgroundColor: 'red',
          borderRadius: '20px',
          fontSize: '0.7rem',
          padding: '10px',
        }}
      >
        Yes Cancel it
      </button>
    </DialogActions>
  </Dialog>
  )
}
