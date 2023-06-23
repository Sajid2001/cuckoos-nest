import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useSignup } from '../Hooks/useSignup';

export default function RegisterForm() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [interests,setInterests] = useState('');
  const {signup, error, isLoading} = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(email, password, interests);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={e => {setEmail(e.target.value)}}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={e => {setPassword(e.target.value)}}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={interests}
                  onChange={e => {setInterests(e.target.value)}}
                  required
                  fullWidth
                  name="interests"
                  label="Interests (separate, by, commas, like, this)"
                  type="text"
                  id="interests"
                  autoComplete="new-interests"
                />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
        {error && <Typography margin={2} textAlign={'center'} variant='body2' color={'red'}>{error}</Typography>}
      </Container>
  )
}
