var User = require('./models/User.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jwt-simple");
var express = require('express');
var router = express.Router();


router.post('/register', (req, res) => {
    var userData = req.body;
    var user = new User(userData);
    user.save((err, result) => {
        if(err) {
            console.log('saving user error');
        }
        console.log("result");
        res.sendStatus(200);
    })
});

router.post('/login', async (req, res) => {
    var loginData = req.body;
    var user = await User.findOne({email: loginData.email})
    if(!user) {
        return res.status(401).send({message: 'Email or Password invalid'})
    }

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) =>{
        if(!isMatch) {
            return res.status(401).send({message: 'Email or Password invalid'})
        }
        var payload = { sub: user._id};
        var token = jwt.encode(payload, '123');//Hash function
        res.status(200).send({token});        
    })
})

var auth = {
    router,
    checkAuthentication: (req, res, next) => {
        if(!req.header('authorization')) {
            return res.status(401).send({message: "Unautorized. Missing Auth Header"});
        }
        var token = req.header('authorization').split(' ')[1];
        var payload = jwt.decode(token, "123");
    
        if(!payload) {
            return res.status(401).send({message: "Unauthorized, Auth Header Invalid"})
        }
        req.userId = payload.sub;
        console.log(token);
        next()
    }
}
module.exports = auth;
