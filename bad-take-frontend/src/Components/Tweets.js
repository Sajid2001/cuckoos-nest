import TweetCard from '../Components/TweetCard';

export default function Tweets({tweets}) {
  return (
    <>
        {tweets && tweets.map(tweet => (
            <div  key = {tweet.created_at}>
            <TweetCard tweet = {tweet}/>
            </div>
        ))}
    </>
  )
}
