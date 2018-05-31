var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var User = require('./models/User.js');
var Post = require('./models/Post.js');
var auth = require('./auth.js');

mongoose.Promise = Promise;


app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id',async (req, res) => {
    var author = req.params.id;
    var posts = await Post.find({author})
    res.send(posts);
})

app.post('/post', (req, res) => {
    var postData = req.body;
    postData.author = '5b0edb9b9d720240bc7aa15f';
    var post = new Post(postData);
    post.save((err, result) => {
        if(err) {
            console.log('saving user error');
            return res.status(500).send({message: 'saving post error'})
        }
        console.log("msg saved");
        res.sendStatus(200);
    })
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

app.get('/profile/:id', async (req, res) => {
    try {
        var users = await User.findById(req.params.id, '-pwd -__v');//Mongoose method
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

mongoose.connect('mongodb://127.0.0.1:27017/myApp', {
})
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

app.use('/auth', auth);
app.listen(3000);