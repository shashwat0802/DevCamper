const express = require('express');
const router = express.Router();
const { register } = require('../controller/auth');

router.post('/register', register);

module.exports = router;
