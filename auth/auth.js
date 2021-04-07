const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

function isLoggedIn (req, res, next) {
  // check if token exists in header
  if ('token' in req.headers) {
    // check if token is valid
    jwt.verify(req.headers['token'], 'TOP_SECRET', (err, result) => {
      if (err) return res.send('Token not valid');
      else {
        const user_id = result.user._id;
        UserModel.findOne({"_id": user_id}, (err, user) => { 
          if (err) res.send(err);
          
          res.locals.user = user;
          next();
        });
      }
    })
  }
  else next();
  // else res.redirect('/login');
};

module.exports = {"isLoggedIn": isLoggedIn};