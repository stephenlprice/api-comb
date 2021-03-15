const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

// Setting up port and app
const PORT = process.env.PORT || 3000;
const app = express();

// Requires models listed on index.js file
const db = require("./models");

// Uses Morgan for automated logging of requests, responses and related data.
app.use(logger("dev"));

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static content
app.use(express.static(path.join(__dirname, '/public')));

// Mongoose used to connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lintdb", 
{ 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Routes
// require('./routes/html-routes.js')(app);
// require('./routes/exercise-routes.js')(app);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});