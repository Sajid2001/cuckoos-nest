const express = require('express');
const router = express.Router();
const {getTweets, createTweet, getUserTweets, deleteTweet, searchTweets} = require('../Controllers/tweetsController')
const {getInterests, addInterest, deleteInterest} = require('../Controllers/interestsController')
const requireAuth = require('../Middleware/requireAuth')

router.use(requireAuth)

router.get('/interests', getInterests)
router.post('/interests', addInterest)
router.delete('/interests/:interest', deleteInterest)

router.get('/tweets', getTweets);
router.get('/tweets/search', searchTweets)
router.get('/tweets/user', getUserTweets)
router.delete('/tweets/:message', deleteTweet)
router.post('/tweets', createTweet);

module.exports = router;