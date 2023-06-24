import React from 'react'
import Tweets from '../Components/Tweets';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useState,useEffect } from 'react'
import { Stack, Typography, Link } from '@mui/material';
import { useOwnTweetsContext } from '../Hooks/useOwnTweetsContext';

export default function ProfilePage() {
  const {user} = useAuthContext();
  const {ownTweets, dispatch} = useOwnTweetsContext();
  const [isLoading, setIsLoading] = useState(false);

  const getUserTweets = async() => {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets/user`,{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }}
    )
    const json = await response.json()
    console.log(json);

    if (response.ok){
        setIsLoading(false);
        dispatch({type:'SET_OWN_TWEETS', payload:json})
    }
  }
  
  useEffect(() => {
    if(user){
        getUserTweets();
    }
  },[dispatch, user])

  return (
    <div>
      <Typography variant='h3' component='div' textAlign='center' m={5}>Your Posts</Typography>
        <Stack spacing={3} marginY={4}>
          {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
          {ownTweets.length === 0 &&
            <>
              <Typography variant='h5' component='div' textAlign='center' m={2}>Looks like you have no posts</Typography>
              <Typography variant='body1' component='div' textAlign='center' m={2}>
                Make a new post <Link fontWeight={'bold'} underline='none' href='/feed'> here</Link>
              </Typography>
            </>
           }
          <Tweets tweets={ownTweets}/>
        </Stack>
    </div>
  )
}
