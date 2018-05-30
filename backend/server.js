var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require("jwt-simple");

var User = require('./models/User.js');

var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v');//Mongoose method
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

app.post('/register', (req, res) => {
    var userData = req.body;
    var user = new User(userData);
    user.save((err, result) => {
        if(err) {
            console.log('saving user error');
        }
        console.log("result");
        res.sendStatus(200);
    })  
})


app.post('/login', async (req, res) => {
    var userData = req.body;
    var user = await User.findOne({email: userData.email})
    if(!user) {
        return res.status(401).send({message: 'Email or Password invalid'})
    }

    if(userData.pws != user.pwd) {
        return res.status(401).send({message: 'Email or Password invalid'})
    }

    var payload = {};
    var token = jwt.encode(payload, '123');//Hash function

    console.log(token);

    res.status(200).send({token});
})

mongoose.connect('mongodb://127.0.0.1:27017/myApp', {
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
app.listen(3000);