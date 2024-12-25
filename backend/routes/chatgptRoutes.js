const express = require('express');
const { getChatGPTResponse, testChatGPT, analyzeJobDescriptions, enhanceResume } = require('../controllers/chatgptController');
const router = express.Router();

router.post('/chatgpt', getChatGPTResponse);
router.get('/test', testChatGPT)
router.post('/analyze-job-descriptions', analyzeJobDescriptions);
router.post('/enhance-resume', enhanceResume);

module.exports = router;
