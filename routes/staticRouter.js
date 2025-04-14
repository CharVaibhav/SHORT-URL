const express = require('express');
const router = express.Router();
const url = require('../models/url.js');
const User = require('../models/user.js'); 
const { restrictTo } = require('../middleware/auth.js');

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const allurls = await url.find({});
    res.render("home", { urls: allurls });
});

router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
const allurls = await url.find({ createdBy: req.user._id });
res.render("home", { urls: allurls });
});

router.get('/signup', async (req, res) => {
    res.render("signup");
});

router.get('/login', async (req, res) => {
    res.render("login");
});

module.exports = router;
