const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/tenacity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


// Create a scheme for feature requests
const requestSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
  created: {
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('Request', requestSchema);

// Create a scheme for comment responses to feature requests
const commentSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.ObjectId,
    ref: 'Request'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

// Get a list of all feature requests
app.get('/api/requests', async (req, res) => {
  try {
    let requests = await Request.find().populate('user');
    res.send(requests);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds a feature request
app.post('/api/requests', validUser, async (req, res) => {
  const request = new Request({
    title: req.body.title,
    content: req.body.content,
    user: req.user
  });
  try {
    await request.save();
    res.send(request);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deletes a feature request
app.delete("/api/requests/:id", validUser, async (req, res) => {
  try {
    await Request.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
});

// Updates a feature request
app.put("/api/requests/:id", validUser, async (req, res) => {
  try {
    let request = await Request.findOne({
      _id: req.params.id,
    }).populate('user');
    request.content = req.body.content;
    await request.save();
    res.send(request);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds a comment to a given request
app.post('/api/requests/:id/comments', validUser, async (req, res) => {
  try {
    let request = await Request.findOne({_id: req.params.id}).populate('user');
    if(!request) {
      res.sendStatus(404);
      return;
    }
    let comment = new Comment({
      request: request,
      user: req.user,
      content: req.body.content,
    });
    await comment.save();
    res.send(comment);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Gets all comments for a given request
app.get('/api/requests/:id/comments', async (req, res) => {
  try {
    let request = await Request.findOne({_id: req.params.id}).populate('user');
    if(!request) {
      res.sendStatus(404);
      return;
    }
    let comments = await Comment.find({request:request}).populate('user');
    res.send(comments);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Updates a comment
app.put("/api/requests/:requestId/comments/:commentId", validUser, async (req, res) => {
  try {
    let comment = await Comment.findOne({_id: req.params.commentId, request: req.params.requestId}).populate('user');
    if(!comment) {
      res.sendStatus(404);
      return;
    }
    comment.content = req.body.content;
    await comment.save();
    res.send(comment);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deletes a comment
app.delete("/api/requests/:requestId/comments/:commentId", validUser, async (req, res) => {
  try {
    let comment = await Comment.findOne({_id: req.params.commentId, request: req.params.requestId}).populate('user');
    if(!comment) {
      res.sendStatus(404);
      return;
    }
    await comment.delete();
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.use("/api/users", users.routes);

app.listen(3000, () => console.log('Server listening on port 3000!'));
