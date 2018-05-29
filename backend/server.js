var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
        return res.sendStatus(401).send({message: 'Email or Password invalid'})
    }

    if(userData.pws != user.pwd) {
        return res.sendStatus(401).send({message: 'Email or Password invalid'})
    }

})

mongoose.connect('mongodb://127.0.0.1:27017/myApp', {
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
app.listen(3000);