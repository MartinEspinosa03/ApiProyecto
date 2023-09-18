const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require("cors");
const router = require("./router")

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
        console.log("Conectado a MongoDB");
        app.listen(port, () => {
          console.log(`API corriendo en el puerto ${port}`);
        });
      })
      .catch((err) => {
        console.error("Error de conexión a MongoDB:", err);
      });
  }

import("./config.mjs")
.then((module) => {
    const { config } = module;
    startServer(config);
})
.catch((err) => {
    console.error('Error al importar el modulo config: ', err);
});

app.use(express.json());

app.use(router);

