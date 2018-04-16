var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/my_application_form");
console.log("Hello MongoDB is running");


var nameSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  gender: String,
  dob: Date,
  mobileno: Number,
  emailid: String,
  presentaddress: String,
  city: String,
  postal: Number,
  state: String,
  feet: Number,
  inch: Number,
  weight: Number,
  education: String,
  lang: String,
  regType: String,
  knowus: String,
  service: String,
  location: String
 });
 
 var User = mongoose.model("User", nameSchema);

 app.post("/submit", (req, res) => {
  var myData = new User(req.body);
  myData.save()
  .then(item => {
  console.log("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/src/app.html");
 });

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type: '*/*' }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// kick off the server */
app.listen(4000);
console.log('App is listening at http://localhost:4000' );
