const express = require('express');
const userRouter = require('./user');
const router = express.Router();

application.use('/user',userRouter);
module.exports = router;