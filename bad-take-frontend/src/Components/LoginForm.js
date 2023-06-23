
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link';

import { useState } from 'react';
import { useLogin } from '../Hooks/useLogin';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(email,password);
      };
    
      return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  value={email}
                  onChange={e => {setEmail(e.target.value)}}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  value={password}
                  onChange={e => {setPassword(e.target.value)}}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            Don't have an account? Register!
                        </Link>
                    </Grid>
                </Grid>
              </Box>
            </Box>
            {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
            {error && <Typography margin={2} textAlign={'center'} variant='body2' color={'red'}>{error}</Typography>}
          </Container>
      );
}
