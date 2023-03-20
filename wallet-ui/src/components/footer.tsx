// Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {currentYear} Cryptocurrency Wallet. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
