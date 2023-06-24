import { AppBar, Button, IconButton, Link, Toolbar, Typography, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { Twitter as TwitterIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogout } from '../Hooks/useLogout';


const Navbar = () => {
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const isMobile = useMediaQuery('(max-width:600px)'); // Define a breakpoint for mobile devices
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <TwitterIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link href="/" color="inherit" underline="none">
          Cuckoo's Nest
        </Link>
      </Typography>
      {!user && (
        <>
          <Link paddingX={2} href="/login" color="white" underline="none">
            Login
          </Link>
          <Link href="/register" color="white" underline="none">
            Register
          </Link>
        </>
      )}
      {user && (
        <>
          {!isMobile && ( // Render the following items only on non-mobile devices
            <>
              <Typography variant="body1" paddingX={2}>
                <Link href="/search" color="inherit" underline="none">
                  Search
                </Link>
              </Typography>
              <Typography variant="body1" paddingX={2}>
                <Link href="/profile" color="inherit" underline="none">
                  {user && user.email}
                </Link>
              </Typography>
              <Button color="inherit" onClick={logout}>
                Log Out
              </Button>
            </>
          )}
          {isMobile && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen} 
            >
            <MenuIcon />
        </IconButton>}
        </>
      )}
    </Toolbar>
    {/* Render the menu only on mobile devices */}
    {isMobile && (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Render the menu items */}
        <MenuItem onClick={handleMenuClose}>
          <Link href="/search" color="inherit" underline="none">
            Search
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link href="/profile" color="inherit" underline="none">
            {user && user.email}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </MenuItem>
      </Menu>
    )}
  </AppBar>
  );
};

export default Navbar;