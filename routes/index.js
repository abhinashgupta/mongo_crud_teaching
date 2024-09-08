var express = require('express');
var router = express.Router();
const { restrictLoggedInUserOnly } = require("../middleware/authMiddle");
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controller/authController");

const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', (req, res) => {
  res.send("this is about route")
})

router.get('/profile',restrictLoggedInUserOnly ,  (req,res) => {
  res.render('profile')
})

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.get("/login", (req, res) => {
  res.render("login");
});

router.get('/crud', (req, res) => {
  res.render('crud');
})

router.post("/create", async (req, res) => {
  const {name , email , password } = req.body;
  const user = await User.create({
    name , email , password
  })
  res.send(user);
});


router.get('/read', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.get('/readOne', async (req, res) => {
  const user = await User.findOne({ name: "Ayush" });
  res.send(user);
});

router.get('/update', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: "66dd2b5e34fd5765156e9444" },
    { name: "Ayushi" , email : "ayushi@gmail.com" }
  );
  res.send(user);
})

router.get('/delete', async (req, res) => {
  const user = await User.findByIdAndDelete({
    _id: "66dd2b6b34fd5765156e9446",
  });
  res.send("user deleted successfully");
})

router.get("/deleteAll", async (req, res) => {
  const user = await User.deleteMany();
  res.send("all user deleted successfully");
});

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
