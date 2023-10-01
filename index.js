const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require("cors");
const router = require("./router")

//https://www.izertis.com         -    Encriptar password

const app = express();
app.use(cors());

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

app.use(express.json());

app.use(router);

