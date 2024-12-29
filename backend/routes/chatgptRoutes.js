const express = require('express');
const { getChatGPTResponse, testChatGPT, analyzeJobDescriptions, enhanceResume, draftEnhancedResume } = require('../controllers/chatgptController');
const { validateApiKey } = require('../utils/auth');
const router = express.Router();

router.post('/chatgpt', validateApiKey, getChatGPTResponse);
router.get('/test', validateApiKey, testChatGPT);
router.post('/analyze-job-descriptions', validateApiKey, analyzeJobDescriptions);
router.post('/enhance-resume', validateApiKey, enhanceResume);
router.post('/draft-enhanced-resume', validateApiKey, draftEnhancedResume);

module.exports = router;
