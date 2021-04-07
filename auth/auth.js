const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

function isLoggedIn (req, res, next) {
  if (!req.headers.authorization) {
    next();
  }
  else {
    const token = req.headers.authorization.replace('Bearer ','');
    jwt.verify(token, 'TOP_SECRET', (err, result) => {
      // if (err) return res.send('Token not valid');
      if (err) next();
      
      UserModel.findOne({"_id": result.user._id}, (err, user) => { 
        if (err) res.send(err);
        
        res.locals.user = user;
        next();
      });
    });
  };
};

module.exports = {"isLoggedIn": isLoggedIn};