const express = require('express');
const { sendSlackNotification, searchJobs } = require('../controllers/notificationController');
const { validateApiKey } = require('../utils/auth');
const router = express.Router();

router.post('/test', validateApiKey, sendSlackNotification);
router.post('/jobs', validateApiKey, searchJobs);

module.exports = router;
