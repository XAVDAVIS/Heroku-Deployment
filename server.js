const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override');

require('dotenv').config();

const app = express(); 

const db = mongoose.connection; 


const PORT = process.env.PORT 


const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {UseNewUrlParser: true, useUnifiedTopology: true }
    );

// error / success 
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));