import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link  from '@mui/material/Link';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogout } from '../Hooks/useLogout';


export default function Navbar() {
    const {user} = useAuthContext();
    const {logout} = useLogout();
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
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
                    <Link href='/' color={'inherit'} underline='none'>
                    Cuckoo's Nest
                    </Link>
                </Typography>
                {!user && 
                    <>
                        <Link paddingX={2} href="/login" color={'white'} underline="none">Login</Link>
                        <Link href="/register" color={'white'}  underline="none">Register</Link>
                    </>
                }
                {user &&
                    <>
                        <Typography variant="body1" paddingX={2}>
                            <Link href='/search' color={'inherit'} underline='none'>
                                Search
                            </Link>
                        </Typography>
                        <Typography variant="body1" paddingX={2}>
                            <Link href='/profile' color={'inherit'} underline='none'>
                                {user.email}
                            </Link>
                        </Typography>
                        <Button color="inherit" onClick={logout}>Log Out</Button>
                    </>
                }
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}
