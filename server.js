const express = require("express");
const app = express();
const cors = require('cors')
const personRoutes = require('./routes/person')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");


// setting up middleWare

app.use(bodyParser.json());
app.use(cors())

// MongoDB connection
mongoose
  .connect("mongodb+srv://ashwajittayade30:4BahF8C8pxp4xBgT@cluster0.6plgfng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  app.use('/api/person',personRoutes)

  //creating server

  app.listen(3000,() =>{
    console.log('Connected to server 3000');
  })


  