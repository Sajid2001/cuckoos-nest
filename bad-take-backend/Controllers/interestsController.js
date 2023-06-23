const db = require('../db')

const getInterests = async(req,res) => {
    const user_id = req.user.user_id;
    const interestQuery = `
    Select i.*
    From UserInterests ui
    Inner Join Interests i on ui.interest_name = i.interest_name
    WHERE ui.user_id = ?;
    `
    try {
        const [interestRows] = await db.query(interestQuery, user_id);
        const interests = interestRows.map((interest) => interest.interest_name);
        res.send(interests);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user interests' });
      }

}

const addInterest = async (req, res) => {
    const user_id = req.user.user_id;
    const { interestName } = req.body;
    
    try {
      await db.query(
        'INSERT IGNORE INTO Interests (interest_name) VALUES (?)',
        [interestName]
      );
      
      await db.query(
        'INSERT IGNORE INTO UserInterests (user_id, interest_name) VALUES (?, ?)',
        [user_id, interestName]
      );

  
      res.json({ message: 'Tweet deleted successfully' });
    } catch (err) {
      console.log(err);
    }
  };
  
  const deleteInterest = async(req,res) => {
    const user_id = req.user.user_id;
    const {interest} = req.params;
    const interest_decoded = decodeURIComponent(interest);
    try{
        const [userInterestResult] = await db.query('DELETE FROM UserInterests WHERE user_id = ? AND interest_name = ?',[user_id, interest_decoded]);
        if (userInterestResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Interest not found' });
        }

        res.json({ message: 'Interest deleted successfully' });
    }catch(err){
        console.log(err);
    }
  }
  
  
  
  
  
  
  

module.exports = {getInterests, addInterest, deleteInterest}