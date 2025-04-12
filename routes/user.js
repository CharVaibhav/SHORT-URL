const express = require('express');
const router = express.Router();
const {signup, login} = require('../controllers/user');

router.post('/', signup); // Route for user signup
router.post('/login', login);
module.exports = router;