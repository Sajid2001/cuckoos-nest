const jwt = require('jsonwebtoken')
const db = require('../db')

const requireAuth = async(req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error:'Authorization Token Required'})
    }

    const token = authorization.split(' ')[1]
    const {user_id} = jwt.verify(token, process.env.JWT_SECRET_KEY)

    try{
        const [rows] = await db.query('SELECT * FROM Users WHERE user_id = ?', [user_id]);
        req.user = rows[0]
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({error: 'Request Not Authorized'})
    }

}

module.exports = requireAuth