const express = require('express');
const { shorturl, geturl, totalclicks } = require('../controllers/url');

const router = express.Router();

router.post('/shorten', shorturl); // Route for shortening URLs
router.get('/:shortId', geturl); // Route for redirecting based on shortId
router.get('/:shortId/analytics', totalclicks); // Route for getting analytics


module.exports = router;