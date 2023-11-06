const router = require("express").Router();
const verifyToken = require("./function.js");
const rateLimit = require("express-rate-limit")

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Come back in a hour"
});

const {
    getUsers,
    createUser,
    updateUser,
    validacionUser,
} = require("./controllers/registerControllers");

router.get("/users", verifyToken, accountLimiter, getUsers);

router.post("/users", verifyToken, createUser);

router.put("/users/:id", updateUser);

router.get('/login/:userUsername/:userPassword', accountLimiter, validacionUser);

const {
    getData,
    createData,
    updateData,
} = require("./controllers/dataControllers");

router.get("/data", getData);

router.post("/data", createData);

router.put("/data/:id", updateData);

module.exports = router;