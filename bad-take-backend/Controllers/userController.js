const db = require('../db')
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require('jsonwebtoken');

function createToken(user_id) {
    return jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
  }

const register = async (req, res) => {
    const { email, password, interests } = req.body;
  
    if (interests) {
      interestsArray = interests.split(', ');
    }
    else{
        interestsArray = [];
    }
  
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email not valid' });
    }
  
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password not strong enough' });
    }
  
    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  
        if (rows.length > 0) {
          return res.status(400).json({ error: 'Email already in ure' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const [userResult] = await db.query('INSERT INTO Users (email, password) VALUES (?, ?)', [email, hash]);
        const userId = userResult.insertId;
        const token = createToken(userId);

        if (interestsArray.length > 0) {
            const interestInsertQuery = 'INSERT IGNORE INTO Interests (interest_name) VALUES ?';
            const interestInsertValues = interestsArray.map((interest) => [interest]);
            await db.query(interestInsertQuery, [interestInsertValues]);

            const userInterestValues = interestsArray.map((interest) => [userId, interest]);
            await db.query('INSERT INTO UserInterests (user_id, interest_name) VALUES ?', [userInterestValues]);

        }

        return res.status(200).json({ email, token });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).json({ error: 'Failed to register' });
    }
 
  }

const login = async(req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Fields should not be empty' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        const user = rows[0]

        if (!user) {
          return res.status(400).json({ error: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(400).json({ error: 'Invalid Password' });
          }
        
        const token = createToken(user.user_id);
        
        return res.status(200).json({ email, token });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).json({ error: 'Failed to log in' });
    }

  }

  module.exports = {
    login, register
  }