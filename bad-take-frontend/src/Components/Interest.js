import React from 'react'
import { Typography, Box, IconButton} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useInterestsContext } from '../Hooks/useInterestsContext';

export default function Interest({interest}) {
  const {user} = useAuthContext();
  const {dispatch} = useInterestsContext();

  const handleDelete = async() => {
    if(!user){
      return
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interests/${encodeURIComponent(interest)}`,{
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log(json);
    if (response.ok) {
      console.log(interest);
      dispatch({type: 'DELETE_INTEREST', payload: interest})
    }
  }
  return (
    <Box overflow={'hidden'} bgcolor={'black'} padding={1} color={'white'} borderRadius={2} display={'flex'} justifyContent={'space-between'}>
        <Typography padding={1}  textAlign={'center'}>{interest}</Typography>
        <IconButton onClick={handleDelete} color='inherit'><RemoveIcon/></IconButton> 
    </Box>
  )
}
