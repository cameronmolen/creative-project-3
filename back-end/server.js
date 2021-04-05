const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

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

// Create a scheme for feature requests
const requestSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: String,
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}]
});

const Request = mongoose.model('Request', requestSchema);

// Create a scheme for comment responses to feature requests
const commentSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.ObjectId,
    ref: 'Request'
  },
  user: String,
  content: String
});

const Comment = mongoose.model('Comment', commentSchema);

// Get a list of all feature requests
app.get('/api/requests', async (req, res) => {
  try {
    let requests = await Request.find();
    res.send(requests);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds a feature request
app.post('/api/requests', async (req, res) => {
  const request = new Request({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user
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
app.delete("/api/requests/:id", async (req, res) => {
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
app.put("/api/requests/:id", async (req, res) => {
  try {
    let request = await Request.findOne({
      _id: req.params.id,
    });
    request.content = req.body.content;
    await request.save();
    res.send(request);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds a comment to a given request
app.post('/api/requests/:requestId/comments', async (req, res) => {
  try {
    console.log("Looking for request...");
    let request = await Request.findOne({_id: req.params.requestId});
    console.log("Finds request");
    if(!request) {
      res.send(404);
      return;
    }
    let comment = new Comment({
      request: request,
      user: req.body.user,
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
app.get('/api/requests/:requestId/comments', async (req, res) => {
  try {
    let request = await Request.findOne({_id: req.params.requestId});
    if(!request) {
      res.send(404);
      return;
    }
    let comments = await Comment.find({request:request});
    res.send(comments);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
