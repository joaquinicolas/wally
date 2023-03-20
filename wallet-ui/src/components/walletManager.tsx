// WalletAddressManager.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface WalletAddressManagerProps {
  onFavoriteChanged: (address: string) => void;
}

interface WalletAddress {
  address: string;
  isFavorite: boolean;
}

const WalletAddressManager: React.FC<WalletAddressManagerProps> = ({
  onFavoriteChanged,
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletAddresses, setWalletAddresses] = useState<WalletAddress[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleAddWalletAddress = () => {
    if (walletAddress.trim()) {
      setWalletAddresses([
        ...walletAddresses,
        { address: walletAddress, isFavorite: false },
      ]);
      setWalletAddress("");
    }
  };

  const handleToggleFavorite = (index: number) => {
    const updateWalletAddress = walletAddresses.map((wallet, idx) => {
      const isFavorite = idx === index ? !wallet.isFavorite : false;
      if (isFavorite) {
        onFavoriteChanged(wallet.address);
      }
      return {
        ...wallet,
        isFavorite,
      };
    });

    setWalletAddresses(updateWalletAddress);
  };

  const visibleWalletAddresses = showFavoritesOnly
    ? walletAddresses.filter((wallet) => wallet.isFavorite)
    : walletAddresses;

  return (
    <Box>
      <TextField
        label="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleAddWalletAddress}
        variant="contained"
        color="primary"
      >
        Add Wallet Address
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6">Wallet Addresses</Typography>
        <FormControlLabel
          control={
            <Switch onChange={(e) => setShowFavoritesOnly(e.target.checked)} />
          }
          label="Show favorites only"
        />
      </Box>
      <List>
        {visibleWalletAddresses.map((wallet, index) => (
          <ListItem key={wallet.address}>
            <ListItemText primary={wallet.address} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="favorite"
                onClick={() => handleToggleFavorite(index)}
              >
                {wallet.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WalletAddressManager;
