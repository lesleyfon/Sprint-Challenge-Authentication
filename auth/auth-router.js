const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const userModels = require('./../models/userModels');


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

router.post('/login', async (req, res) => {
  const {username, password } = req.body;
  try {
    if(!username || !password){
      return res.status(404).json({
        message: 'Username and/Or password is undefined'
      })
    } else{
      const user = await userModels.fetchUserBy(username);
      if(user && bcrypt.compareSync(password, user.password)){
         const token = signToken({
            userId: user.id,
           username
         });

          res.status(200).json({
            message: 'Login successful',
            token
          })
        }else{
          res.status(200).json({
            message: 'Invalid credentials'
          })
      }

    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'Server Error',
      error: error
    })
  }

});


function signToken(user){
  const secret = process.env.JWT_SECRETE;
  const options = {
    expiresIn: '60s'
  }

  return jwt.sign(user, secret, options);
}

module.exports = router;
