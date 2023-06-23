
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useTweetsContext } from '../Hooks/useTweetsContext';
import { useAuthContext } from '../Hooks/useAuthContext';


export default function TweetForm() {

    const {user} = useAuthContext();
    const {dispatch} = useTweetsContext();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        if(!user){
          setError('You must be logged in');
          return
        }
        event.preventDefault();
        setError(null)
        setIsLoading(true);
        const tweet = {message}
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets`, {
            method: 'POST',
            body: JSON.stringify(tweet),
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${user.token}`,
          }
        })
          const json = await response.json()
      
          if (!response.ok) {
            setError(json.error)
            setIsLoading(false);
          }
          if (response.ok) {
            setMessage('')
            setError(null)
            setIsLoading(false);
            console.log('new tweet added', json)
            dispatch({type: 'CREATE_TWEET', payload: json})
          }
        }

  return (
    <div>
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={message}
                onChange={e => {setMessage(e.target.value)}}
                  required
                  fullWidth
                  name="tweet"
                  label="Tweet"
                  type="text"
                  id="tweet"
                  autoComplete="new-tweet"
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
              Post
            </Button>
            {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
            {error && <Typography color={'red'}>{error}</Typography>}
          </Box>
    </div>
  )
}
