const express = require('express');
const router = express.Router();
const {login, register} = require('../Controllers/userController')


  router.post('/register', register);

  router.post('/login', login)
  
  module.exports = router;