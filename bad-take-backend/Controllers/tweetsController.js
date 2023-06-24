const db = require('../db')
const {classifyTweetsByText, classifyTweetsByImage} = require('../huggingface')
const { uploadFileToCloudStorage,deleteFileFromCloudStorage } = require('../googleCloud');

const getTweets = async (req, res) => {
  const user_id = req.user.user_id;
  const harmfulTags = ['Sexual','Violent','Racist','Homophobic','Violent','Hate']
  try {
    const tweetQuery = `
    SELECT Users.email AS author, Tweets.message, Tweets.created_at, Tweets.image_url
    FROM Tweets
    INNER JOIN UserTweets ON Tweets.message = UserTweets.message
    INNER JOIN Users ON UserTweets.user_id = Users.user_id
    `;
    const [tweetRows] = await db.query(tweetQuery);
    const tweets = tweetRows.map(tweet => {
      return {
        author: tweet.author,
        message: tweet.message,
        created_at: tweet.created_at,
        image_url: tweet.image_url
      };
    });

    const interestQuery = `
    Select i.*
    From UserInterests ui
    Inner Join Interests i on ui.interest_name = i.interest_name
    WHERE ui.user_id = ?;
    `

    const [interestRows] = await db.query(interestQuery, user_id)
    //cleaning the data for parsing
    const messages = tweetRows.map(tweet => tweet.message);
    const interests = interestRows.map(interest => interest.interest_name);
    
    //filtering the tweets
    if (messages.length === 0 || interests.length === 0) {
      res.send(tweets);
    } else {
      const filter = await classifyTweetsByText(messages, interests);

      const filteredTweets = tweets.filter((tweet, index) => {
        const maxScore = Math.max(...filter[index].scores);
        return maxScore >= 0.75;
      });
      
      res.send(filteredTweets);
    }
  } catch (err) {
    console.log(err);
  }
}

const searchTweets = async(req,res) => {
  const searchTerm = req.query.query;
  const search_decoded = decodeURIComponent(searchTerm);
  try{
    const tweetQuery = `
      SELECT Users.email AS author, Tweets.message, Tweets.created_at, Tweets.image_url
      FROM Tweets
      INNER JOIN UserTweets ON Tweets.message = UserTweets.message
      INNER JOIN Users ON UserTweets.user_id = Users.user_id
      `;
      const [tweetRows] = await db.query(tweetQuery);
      const tweets = tweetRows.map(tweet => {
        return {
          author: tweet.author,
          message: tweet.message,
          created_at: tweet.created_at,
          image_url: tweet.image_url
        };
      });
      const messages = tweetRows.map(tweet => tweet.message);
      if (messages.length === 0) {
        res.send(tweets);
      } else {
        const textFilter = await classifyTweetsByText(messages, search_decoded);

        const textFilteredTweets = tweets.filter((tweet, index) => {
          const maxScore = Math.max(...textFilter[index].scores);
          return maxScore >= 0.75;
        });
        res.send(textFilteredTweets);
    }
  }catch(err){
    console.log(err);
  }
}


const getUserTweets = async(req,res) => {
  const user_id = req.user.user_id;
  try{
    const userTweetsQuery = `
    SELECT Users.email AS author, Tweets.message, Tweets.created_at, Tweets.image_url
    FROM Tweets
    INNER JOIN UserTweets ON Tweets.message = UserTweets.message
    INNER JOIN Users ON UserTweets.user_id = Users.user_id
    WHERE Users.user_id = ?;
    `
    const [userTweetRows] = await db.query(userTweetsQuery,[user_id]);
      const userTweets = userTweetRows.map(tweet => {
        return {
          author: tweet.author,
          message: tweet.message,
          created_at: tweet.created_at,
          image_url: tweet.image_url
        };
      });
    res.send(userTweets)
  }catch(err){
    console.log(err);
  }
}

const createTweet = async(req,res) => {
    const user_id = req.user.user_id;
    const {message} = req.body;
    const imageFile = req.file;
    let url = '';
    try {
      if (imageFile) {
        url = await uploadFileToCloudStorage(imageFile);
      } else {
        console.log('No file uploaded');
      }
      
      const result = await db.query("Insert Into Tweets(message, image_url)values(?, ?);", [message, url])
      const tweetId = result.insertId;
      const userTweetResult = await db.query("INSERT INTO UserTweets (user_id, message) VALUES (?, ?)", [user_id, message]);

      const userResult = await db.query("SELECT email From Users Where user_id = ?",[user_id])

      const tweet = {
        author:userResult[0][0].email,
        id: tweetId,
        message: message,
        created_at: new Date().toISOString(),
        image_url: url
      };

      res.send(tweet)
    } catch (error) {
      console.log(error);
    }
}

const deleteTweet = async(req,res) => {

  const user_id = req.user.user_id;
  const {message} = req.params;
  const message_decoded = decodeURIComponent(message);
  try{

    const [grabTweetURLResult] = await db.query('SELECT * FROM Tweets WHERE message = ?', [message_decoded]);

    if (grabTweetURLResult.length === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    
    const {image_url} = grabTweetURLResult[0]

    const [deleteUserTweetResult] = await db.query('DELETE FROM UserTweets WHERE user_id = ? AND message = ?', [user_id, message_decoded]);
    if (deleteUserTweetResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const [tweetResult] = await db.query('DELETE FROM Tweets WHERE message = ?', [message_decoded]);

    if (tweetResult.affectedRows === 0) {
      console.log('Tweet not found in Tweets table');
    }

    if (image_url) {
      await deleteFileFromCloudStorage(image_url);
    }

    res.json({ message: 'Tweet deleted successfully' });
  }catch(err){
    console.log(err);
  }
}

module.exports = {
    getTweets, createTweet, getUserTweets, deleteTweet, searchTweets
}