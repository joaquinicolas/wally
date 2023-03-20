// CurrencySelector.tsx
import React, { ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CurrIcon from './currency-icon';

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (currency: string) => void;
  priceAmount: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  setCurrency,
  priceAmount,
}) => {
  const handleCurrencyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCurrency(event.target.value as string);
  };

  return (
    <Paper style={{ padding: '16px',  minHeight: '100%' }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="currency">Currency</InputLabel>
        <Select
          label="Currency"
          id="currency"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="h6"
        style={{ marginTop: '16px', fontWeight: 'bold' }}
      >
        {priceAmount}<CurrIcon curr={currency} />
      </Typography>
    </Paper>
  );
};

export default CurrencySelector;
