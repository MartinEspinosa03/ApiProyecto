const bcrypt = require('bcrypt');
const User = require("../models/registerModels");
const jwt = require("jsonwebtoken");


async function getUsers(req, res) {
  jwt.verify(req.token, 'skysoft', async (error, authData) =>{
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error searching of users:', error);
      res.status(500).json({ error: 'Error searching of users' });
    }
  })
  }

  
const createUser = async (req, res) => {
  try {
    const { name, lastname, username, email, password, age, sex, weight, height } = req.body;
  
    const existingUser = await User.findOne({ username });

    if(existingUser) {
      return res.status(400).json({ error: 'User existing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      lastname,
      username,
      email,
      password: hashedPassword,
      age,
      sex,
      weight,
      height,
    });

    const savedUser = await user.save();
     res.json(savedUser);
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const updateUser = async (req, res) => {
  const newUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    sex: req.body.sex,
    weight: req.body.weight,
    height: req.body.height,
  };

  try {
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {new: true});

    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error editing user', error);
    res.status(500).json({ error: 'Error editing user' });
  }
};
  
module.exports = {
    getUsers,
    createUser,
    updateUser,
};