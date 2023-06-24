
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useTweetsContext } from '../Hooks/useTweetsContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import { MuiFileInput } from 'mui-file-input'


export default function TweetForm() {

    const {user} = useAuthContext();
    const {dispatch} = useTweetsContext();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file,setFile] = useState('');

    const handleSubmit = async (event) => {
        if(!user){
          setError('You must be logged in');
          return
        }
        event.preventDefault();
        setError(null)
        setIsLoading(true);
        const formData = new FormData();
        formData.append('message', message);
        if (file) {
          formData.append('file', file);
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets`, {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization':`Bearer ${user.token}`,
          }
        })
          const json = await response.json()

          const newTweet = {
            author:user.email,
            id: json.tweetId,
            message: message,
            created_at: new Date().toISOString(),
            image_url: file ? URL.createObjectURL(file) : null,
          };
    
          if (!response.ok) {
            setError(json.error)
            setIsLoading(false);
          }
          if (response.ok) {
            setMessage('')
            setError(null)
            setIsLoading(false);
            console.log('new tweet added', json)
            dispatch({type: 'CREATE_TWEET', payload: newTweet})
          }
        }
    const handleFileChange = (newFile) => {
      setFile(newFile)
    }

  return (
    <div>
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              
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
              <Grid item xs={12}>
                <MuiFileInput fullWidth value={file} onChange={handleFileChange} />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Post
            </Button>
            {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
            {error && <Typography color={'red'}>{error}</Typography>}
          </Box>
    </div>
  )
}
