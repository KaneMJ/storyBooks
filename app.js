const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load User Model
require('./models/Users');
//Passport Config
require ('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

//Map Global Promises
mongoose.Promise = global.Promise;

// mongoose Connect
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

const port = process.env.PORT || 5000;

//use Routes
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('You are on the index');
});




