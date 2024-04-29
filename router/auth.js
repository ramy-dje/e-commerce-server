const auth = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.post("/login",auth.login);

module.exports=router;