const express = require("express");
const puppeteer = require('puppeteer');
const User = require("../models/userModel");
const session = require("express-session");
const bcypt = require('bcrypt');
const cors = require("cors");
const app = express.Router();
const saltRounds = 10;
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const captchaLength = 6;
  let captcha = '';
  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }
  return captcha;
}

const secretKey = "ResumeProject"
app.use(cors());
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/captcha", (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha;
  res.send(captcha);
});
// login form
app.post("/login", async (req, res) => {
  const userInput = req.body.captchaInput;
  const storedCaptcha = req.session.captcha;

  if (userInput === storedCaptcha) {
    try {
      const result = await User.findOne({
        username: req.body.username
      });

      if (result) {
        const passwordDecode = await bcypt.compare(req.body.password, result.password);
        if (passwordDecode) {
          res.send(result);
        } else {
          res.status(400).json("Login failed");
        }
      } else {
        res.status(400).json("Login failed");
      }
    } catch (error) {
      response.status(400).json(error);
    }
  } else {
    res.status(400).json("Invalid CAPTCHA");
  }
});
//register form
app.post("/register", async (req, res) => {
  const userInput = req.body.captchaInput;
  const storedCaptcha = req.session.captcha;

  if (userInput === storedCaptcha) {
    try {
      const result = await User.findOne({
        username: req.body.username,
      });

      if (result) {
        res.status(400).json("Registration failed");
      } else {
        if (req.body.password === req.body.confirmPassword) {
          const genSalt = await bcypt.genSalt(saltRounds);
          const hashPassword = await bcypt.hash(req.body.password, genSalt);
          req.body.password = hashPassword;
          const newUser = new User(req.body);
          await newUser.save();

          res.send("Registration Successful");
        } else {
          res.status(400).json("Passwords do not match");
        }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("Invalid CAPTCHA");
  }
});


app.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/users", async (req,res)=>{
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }
  catch(err)
  {
    res.status(404).json(err);
  }
})



module.exports = app;
