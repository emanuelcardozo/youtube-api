require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./app/routes')
const config = require('./app/config/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express()
const port = config.port

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

app.use(routes);

// mongoose.connect( config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true },  ()=> {
//   console.log("mongo db connected!");
// })

app.listen( port, () => {
  console.log("Listening on port", port);
})
