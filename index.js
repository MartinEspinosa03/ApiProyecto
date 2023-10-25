const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
var https = express();
var fs = require('fs');
const dotenv = require("dotenv");
const app = express();


dotenv.config();

https.createServer({
  cert: fs.readFileSync(),
  key: fs.readFileSync() 
}, app).listen(port, function(){
  console.log('Server https run in the port 2003');
})


function startServer(config) {
    const { port, mongoURI } = config.server;
  
    mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connected to MongoDB");
        app.listen(port, () => {
          console.log(`API running on port: ${port}`);
        });
      })
      .catch((err) => {
        console.error("Conection error to MongoDB:", err);
      });
  }

import("./config.mjs")
.then((module) => {
    const { config } = module;
    startServer(config);
})
.catch((err) => {
    console.error('Error when importing the module config: ', err);
});

app.use(cors());

app.use(express.json());

app.use(router);

