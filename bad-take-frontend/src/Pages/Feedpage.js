import TweetForm from '../Components/TweetForm';
import Tweets from '../Components/Tweets';
import { useTweetsContext } from '../Hooks/useTweetsContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useInterestsContext } from '../Hooks/useInterestsContext'
import { useState,useEffect } from 'react'
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Interests from '../Components/Interests';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Feedpage() {
    const [showInterests, setShowInterests] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const {tweets, dispatch: tweetsDispatch} = useTweetsContext();
    const {interests,dispatch: interestsDispatch} = useInterestsContext();
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const onShowInterests = () => {
        setShowInterests(!showInterests)
    }
    const onRefreshComponents = () => {
        setRefreshCounter(refreshCounter + 1);
    }
    const getInterests = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interests`, {
            headers:{
                'Authorization':`Bearer ${user.token}`
              }
        })
        const json = await response.json()
        console.log(json);

        if (response.ok){
            console.log(json);
            interestsDispatch({type:'SET_INTERESTS', payload:json})
        }
    }

    const getTweets = async() => {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets`,{
            headers:{
              'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            setIsLoading(false);
            tweetsDispatch({type:'SET_TWEETS', payload:json})
        }
    }

    useEffect(() => {
        if(user){
            getInterests();
            getTweets();
        }
    },[interestsDispatch, tweetsDispatch, user, refreshCounter])
  return (
    <div>
        <Typography variant='h5' component='div' textAlign='left' m={1} marginTop={7}>
            Interest Filters <IconButton onClick={onShowInterests}>{showInterests ? <KeyboardArrowUpIcon/> :<KeyboardArrowDownIcon/>}</IconButton>
        </Typography>
        {showInterests && (
            <>
            {interests.length === 0 && <Typography variant='h5' component='div' textAlign='center' m={5}>It looks like you have no interests. You need to touch some grass.</Typography>}
            <Interests interests = {interests}/>
            </>
        )}
        <Stack spacing={3} marginTop={4} marginBottom={5}>
            <TweetForm/>
            {isLoading && <Typography variant='h5' component='div' textAlign='center' m={5}>Loading...</Typography>}
             {tweets.length > 0 && 
                <>
                    <Button onClick={onRefreshComponents} variant='outlined'> Refresh </Button>
                    <Tweets tweets={tweets}/>
                </>
            }
        </Stack>
    </div>
  )
}
