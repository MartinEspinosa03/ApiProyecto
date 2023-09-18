const Users = require("../models/registerModels");

async function getUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (error) {
      console.error('Error searching of users:', error);
      res.status(500).json({ error: 'Error searching of users' });
    }
  }

  
const createUser = async (req, res) => {
    try {
      const user = new Users({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        sex: req.body.sex,
        weight: req.body.weight,
        height: req.body.height,
      });
  
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
};
  
module.exports = {
    getUsers,
    createUser,
};