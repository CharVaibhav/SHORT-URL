const express = require('express');
const router = express.Router();
const url = require('../models/url.js');

router.get('/', async (req, res) => {
    const allurls = await url.find({});
  res.render("home", { urls: allurls });
});
module.exports = router;
