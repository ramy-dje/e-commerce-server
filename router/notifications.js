const {createNotifications,getNotifcations} = require('../controllers/notificationController')
const express = require('express');
const router = express.Router();

router.get('/:id',getNotifcations);
router.post('/create',createNotifications);

module.exports = router