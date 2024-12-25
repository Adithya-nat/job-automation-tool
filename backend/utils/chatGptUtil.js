const logger = require('./logger');
const axios = require('axios');

// Utility for making ChatGPT API calls
const makeChatGPTRequest = async (model, messages, maxTokens) => {
    try {
        logger.info(`Making ChatGPT API call with model: ${model}, maxTokens: ${maxTokens}`);
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model,
                messages,
                max_tokens: maxTokens,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
                },
            }
        );
        logger.info("ChatGPT API call successful.");
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.log(error);
        logger.error(`Error connecting to ChatGPT: ${error.response?.data || error.message}`);
        throw new Error("ChatGPT API request failed.");
    }
};

module.exports = { makeChatGPTRequest };