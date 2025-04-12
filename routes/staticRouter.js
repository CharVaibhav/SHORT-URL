const express = require('express');
const router = express.Router();
const url = require('../models/url.js');
const User = require('../models/user.js'); 

router.get('/', async (req, res) => {
    const allurls = await url.find({});
  res.render("home", { urls: allurls });
});

router.get('/signup', async (req, res) => {
    res.render("signup");
});

router.get('/login', async (req, res) => {
    res.render("login");
});

module.exports = router;
