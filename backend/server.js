var express = require('express');
var app = express();
var cors = require('cors');

var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

app.use(cors());
app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/register', (req, res) => {
    res.send(req.body);
})


app.listen(3000);