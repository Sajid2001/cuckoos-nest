import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAuthContext } from '../Hooks/useAuthContext';
import TweetCard from './TweetCard';
import Tweets from './Tweets';

export default function SearchForm() {
    const {user} = useAuthContext();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const handleSubmit = async(e) => {
        if(!user){
          setError('You must be logged in');
          return
        }
        e.preventDefault();
        setSearchResults([]);
        setError(null);
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets/search?query=${encodeURIComponent(search)}`,{
            headers:{
              'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false);
          }
        if (response.ok){
            setIsLoading(false);
            console.log(searchResults);
            setSearchResults(json)
        }
    }

  return (
    <div>
        <Box onSubmit={handleSubmit} component="form" noValidate sx={{ my: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={search}
                  onChange={e => {setSearch(e.target.value)}}
                  required
                  fullWidth
                  name="search"
                  label="Search"
                  type="text"
                  id="search"
                  autoComplete="search"
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
              Search
            </Button>
            {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
            {error && <Typography color={'red'}>{error}</Typography>}
          </Box>

          {searchResults &&(
            <Stack spacing={3} marginTop={4} marginBottom={5}>
            <Tweets tweets={searchResults}/>
            </Stack>
          )}
    </div>
  )
}
