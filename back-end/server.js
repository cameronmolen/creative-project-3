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
  user: String
});

const Request = mongoose.model('Request', requestSchema);

// Create a scheme for comment responses to feature requests
const commentSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.ObjectId,
    ref: 'Request'
  }
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

app.listen(3000, () => console.log('Server listening on port 3000!'));
