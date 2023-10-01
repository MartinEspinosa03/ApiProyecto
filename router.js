const bcrypt = require('bcrypt');
const router = require("express").Router();
const User = require('./models/registerModels');

const {
    getUsers,
    createUser,
    updateUser,
} = require("./controllers/registerControllers");

router.get("/users", getUsers);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password'});
        }

        res.status(200).json({ message: 'Successful login'});
    }catch (error) {
        console.error('Error when logging in', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

const {
    getData,
    createData,
    updateData,
} = require("./controllers/dataControllers");

router.get("/data", getData);

router.post("/data", createData);

router.put("/data/:id", updateData);

module.exports = router;