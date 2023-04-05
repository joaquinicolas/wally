// PriceEditor.tsx
import React, { useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

interface PriceEditorProps {
  priceAmount: string;
  setPriceAmount: (priceAmount: string) => void;
}

const PriceEditor: React.FC<PriceEditorProps> = ({
  priceAmount,
  setPriceAmount,
}) => {
  const [priceAmountEditable, setPriceAmountEditable] = useState(false);

  const handleEditClick = () => {
    setPriceAmountEditable(true);
  };

  const handleSaveClick = () => {
    setPriceAmountEditable(false);
  };

  const handleCancelClick = () => {
    setPriceAmountEditable(false);
    // Optionally, reset the input value here
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceAmount(event.target.value);
  };

  return (
    <Paper style={{ padding: '16px',  minHeight: '100%' }} >
      <TextField
        fullWidth
        variant="outlined"
        label="ETH Balance"
        value={priceAmount}
        onChange={handleAmountChange}
        InputProps={{
          readOnly: !priceAmountEditable,
          endAdornment: (
            <InputAdornment position="end">
              {!priceAmountEditable ? (
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={handleSaveClick}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelClick}>
                    <CancelIcon />
                  </IconButton>
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default PriceEditor;
