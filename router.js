const router = require("express").Router();
const verifyToken = require("./function.js");

const {
    getUsers,
    createUser,
    updateUser,
    validacionUser,
} = require("./controllers/registerControllers");

router.get("/users", verifyToken, getUsers);

router.post("/users", verifyToken, createUser);

router.put("/users/:id", updateUser);

router.get('/login/:userUsername/:userPassword', validacionUser);

const {
    getData,
    createData,
    updateData,
} = require("./controllers/dataControllers");

router.get("/data", getData);

router.post("/data", createData);

router.put("/data/:id", updateData);

module.exports = router;