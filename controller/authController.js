const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const {setUser} = require('../service/authService')

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.send("User registered Succefully");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });
    if (!user) return res.send({ message: "User Not Found" });
    
    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie("token", token);
  return res.redirect("/profile");
}

module.exports = { handleUserSignup, handleUserLogin };
