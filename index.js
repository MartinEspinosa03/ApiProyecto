const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
// var https = require('https');
// var fs = require('fs');
const dotenv = require("dotenv");
const app = express();
 

dotenv.config();
const PORT = process.env.PORT || 2003;

// https.createServer({
//   cert: fs.readFileSync("fullchain.pem"),
//   key: fs.readFileSync("privkey.pem") 
// }, app).listen(PORT, function(){
//   console.log('Server https run in the port: ', PORT);
// })

    mongoose
      .connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Server run in the port: ", PORT);
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.error("Conection error to MongoDB:", err);
      });

app.use(cors());

app.use(express.json());

app.use(router);

