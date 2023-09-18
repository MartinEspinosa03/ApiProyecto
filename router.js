const router = require("express").Router();

const {
    getUsers,
    createUser,
} = require("./controllers/registerControllers");

router.get("/users", getUsers);

router.post("/users", createUser);

const {
    getData,
    createData,
} = require("./controllers/dataControllers");

router.get("/data", getData);

router.post("/data", createData);

module.exports = router;