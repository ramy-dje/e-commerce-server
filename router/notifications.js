const {createNotifications,getNotifcations} = require('../controllers/notificationController');
const {authorizedRoles,isAuthentificated} = require('../middlewares/auth')
const express = require('express');
const router = express.Router();

router.get('/',isAuthentificated,getNotifcations);
router.post('/create',createNotifications);

module.exports = router