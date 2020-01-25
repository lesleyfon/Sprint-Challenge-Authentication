const router = require('express').Router();
const userModels = require('./../models/userModels')

router.post('/register', async (req, res) => {
  // implement registration
  const {username, password } = req.body;
  try {
    if(!username || !password){
      return res.status(404).json({
        message: 'Username and/Or password is undefined'
      })
    } else{
      const user = await userModels.addUser({username, password});
      res.status(201).json({
        message: 'Successfully registered new user',
        user
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Server Error',
      error
    })
  }
 
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
