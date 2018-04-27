const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//use Routes
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('You are on the index');
});




