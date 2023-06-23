import {  Grid, TextField, Button,Typography } from "@mui/material";
import { useState } from 'react';
import { useAuthContext } from "../Hooks/useAuthContext";
import { useInterestsContext } from "../Hooks/useInterestsContext";

export default function InterestForm() {
    const [interestName, setInterestName] = useState('');
    const {dispatch} = useInterestsContext();
    const [error, setError] = useState('');
    const {user} = useAuthContext();
    
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        if(!user){
            setError('You must be logged in');
            return
          }
        e.preventDefault();
        const interest = {interestName}
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interests`, {
            method: 'POST',
            body: JSON.stringify(interest),
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
            setError(null)
            setIsLoading(false);
            dispatch({type:'CREATE_INTEREST', payload:interestName})
            setInterestName('')
          }
    }
  return (
    <>
        <Grid item xs={12}>
            <TextField
                value={interestName}
                onChange={e => {setInterestName(e.target.value)}}
                required
                fullWidth
                id="interest"
                label="Add Interest"
                name="interest"
                autoComplete="interest"
                autoFocus
                />
        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleSubmit} disabled={isLoading} variant="contained" color="secondary" fullWidth sx={{height:'100%'}}> Add </Button>
        </Grid>
        {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
        {error && <Typography color={'red'}>{error}</Typography>}
    </>
  )
}
