import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useTweetsContext } from '../Hooks/useTweetsContext';
import { useOwnTweetsContext } from '../Hooks/useOwnTweetsContext';

export default function TweetCard({tweet}) {
  const {user} = useAuthContext();
  const {dispatch} = useTweetsContext();
  const {dispatch:ownTweetsDispatch} = useOwnTweetsContext();

  const handleDelete = async() => {
    if(!user){
      return
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tweets/${encodeURIComponent(tweet.message)}`,{
      method: 'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log(json);
    if (response.ok) {
      dispatch({type: 'DELETE_TWEET', payload: tweet})
      ownTweetsDispatch({type:'DELETE_OWN_TWEET', payload:tweet})
    }
  }
  return (
    <div>
         <Card sx={{ minWidth: 275, borderRadius:5 }}>
            <CardContent>
                <Box sx={{flexGrow: 1, display:'flex',justifyContent:'space-between', padding:1 }}>
                  <Box display={'inline-flex'}>
                  <Avatar alt="User Email"/>
                  <Typography sx={{ fontSize: 14, padding:1 }} color="text.secondary" gutterBottom>
                  {tweet.author === user.email ? 'You' : tweet.author}
                  </Typography>
                  </Box>
                  <>
                  {user && user.email === tweet.author && <Button onClick={handleDelete}color='error' margin={2} size="small">Delete</Button>}
                  </>
                </Box>
                <Typography variant="h5" component="div" padding={2}>
                {tweet.message}
                </Typography>
                {tweet.image_url && 
                     <CardMedia
                     component="img"
                     sx={{borderRadius:5, marginBottom:2}}
                     image={tweet.image_url}
                     alt="Nothing loaded"
                     loading="eager"
                   />
                  }
                <Typography textAlign={'right'} variant="body2" component="div" padding={1}>
                {tweet.created_at.substring(0, 10)}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
