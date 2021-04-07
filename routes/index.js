var express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const auth = require('../auth/auth');
// const passport = require('passport');

const User = require('../models/userModel');

var router = express.Router();

/* GET home page. */
router.get('/', auth.isLoggedIn, function(req, res, next) {
  res.render('index');
});

router.get('/users', auth.isLoggedIn, (req, res) => {
  // if (res.locals.user) {
  User.find({}, (e, users) => {
    if (e) res.send(e);
    res.render('users', {
      users: users
    })
    // return res.status(200).send(users)
  })
  // }
  // else {
  //   res.send('not logged in');
  // }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  var inp = req.body;
  User.create({
    username: inp.username,
    password: inp.password,
    fname: inp.fname,
    lname: inp.lname
  }, (e) => {
    res.redirect('/users');
  });
});

router.get('/login', (req,res) => {
  res.render('login');
});

// tutorial: 
// https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport
router.post('/login', async (req,res) => {
  // check if user exists
  let user = await UserModel.findOne({'username': req.body.username});
  if (!user) return res.send('User not found');

  // check if password is correct
  let valid = await user.isValidPassword(req.body.password);
  if (!valid) return res.send('Incorrect password') ;

  // create jwt for user
  const body = {_id: user._id};
  const token = jwt.sign({user: body}, 'TOP_SECRET');

  // send jwt to client
  return res.json({token});

  // messing around to figure out how to add token to header
  // res.cookie('token', token);
  // req.headers.push({key: 'token', value: token});
  // console.log(req.headers);
  // return res.redirect('/');

});

module.exports = router;