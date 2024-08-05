const express = require('express');
const { signupUser, loginUser, registerAdmin } = require('../controller/userController');

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/register-admin', registerAdmin);

module.exports = router;
