const express = require('express');
const { sendSlackNotification, sendFilteredJobsToSlack } = require('../controllers/notificationController');
const router = express.Router();

router.post('/test', sendSlackNotification);
router.post('/jobs', sendFilteredJobsToSlack);

module.exports = router;
