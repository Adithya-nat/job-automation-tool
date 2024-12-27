const express = require('express');
const { sendSlackNotification, sendFilteredJobsToSlack } = require('../controllers/notificationController');
const { validateApiKey } = require('../utils/auth');
const router = express.Router();

router.post('/test', validateApiKey, sendSlackNotification);
router.post('/jobs', validateApiKey, sendFilteredJobsToSlack);

module.exports = router;
