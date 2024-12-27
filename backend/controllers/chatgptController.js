const axios = require('axios');
const logger = require('../utils/logger'); 
const chatGptUtil = require('../utils/chatGptUtil');

// Controllers
const getChatGPTResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            logger.warn("Prompt is missing in the request.");
            return res.status(400).json({ error: "Prompt is required." });
        }

        logger.info("Received request for getChatGPTResponse.");
        const messages = [{ role: "user", content: prompt }];

        const result = await chatGptUtil.makeChatGPTRequest(process.env.CHATGPT_MODEL, messages, 100);
        logger.info("Generated response from ChatGPT.");
        res.json({ response: result });
    } catch (error) {
        logger.error(`Error in getChatGPTResponse: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const testChatGPT = async (req, res) => {
    try {
        logger.info("Testing ChatGPT integration.");
        const messages = [
            { role: "system", content: "You are testing ChatGPT integration." },
            { role: "user", content: "Can you confirm this works?" },
        ];

        const result = await chatGptUtil.makeChatGPTRequest(process.env.CHATGPT_MODEL, messages, 100);
        logger.info("Test ChatGPT response received.");
        res.json({ response: result });
    } catch (error) {
        logger.error(`Error in testChatGPT: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const analyzeJobDescriptions = async (req, res) => {
    try {
        const { jobDescriptions } = req.body;

        if (!Array.isArray(jobDescriptions) || jobDescriptions.length === 0) {
            logger.warn("Invalid job descriptions input.");
            return res.status(400).json({ error: "Invalid job descriptions input." });
        }

        logger.info(`Analyzing job descriptions: Received ${jobDescriptions.length} descriptions.`);
        const messages = [
            {
                role: "system",
                content: "You are a professional AI assistant that extracts key skills, qualifications, and responsibilities from job descriptions."
            },
            {
                role: "user",
                content: `
                Extract key skills, qualifications, and responsibilities from the following job descriptions:
                ${jobDescriptions.join("\n---\n")}

                Respond with a summary containing:
                1. Key Skills
                2. Qualifications
                3. Responsibilities
                `
            }
        ];

        const result = await chatGptUtil.makeChatGPTRequest(process.env.CHATGPT_MODEL, messages, 500);
        logger.info("Job descriptions analysis completed.");
        res.json({ analysis: result });
    } catch (error) {
        logger.error(`Error in analyzeJobDescriptions: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const enhanceResume = async (req, res) => {
    try {
        const { resume, jobDescriptions } = req.body;

        if (!resume || !Array.isArray(jobDescriptions) || jobDescriptions.length === 0) {
            logger.warn("Invalid inputs for resume enhancement.");
            return res.status(400).json({ error: "Invalid inputs for resume enhancement." });
        }

        logger.info("Starting resume enhancement process.");
        logger.info(`Analyzing ${jobDescriptions.length} job descriptions for resume enhancement.`);
        
        // Step 1: Analyze job descriptions with API key header
        const analysisResponse = await axios.post(
            'http://localhost:8090/api/analyze-job-descriptions',
            { jobDescriptions },
            {
                headers: {
                    'x-api-key': process.env.API_KEY, // Include API key header
                    'Content-Type': 'application/json',
                },
            }
        );

        const analysis = analysisResponse.data.analysis;
        logger.info("Job descriptions analysis completed for resume enhancement.");

        const messages = [
            {
                role: "system",
                content: "You are a professional resume consultant specializing in aligning resumes with job descriptions."
            },
            {
                role: "user",
                content: `
                Based on the following analysis:
                ${analysis}

                1. Enhance the user's resume below by aligning it with the job requirements. Highlight missing skills, qualifications, and responsibilities:
                ${resume}

                2. Generate a professional cover letter for the user, explaining why they are the best fit for the job, using the analysis and enhanced resume content.

                Format your response with:
                ===ENHANCEMENTS===
                <Enhancements Summary>
                ===COVER LETTER===
                <Generated Cover Letter>
                `
            }
        ];

        // Step 2: Call ChatGPT for resume enhancement and cover letter generation
        const result = await chatGptUtil.makeChatGPTRequest(process.env.CHATGPT_MODEL, messages, 1200);
        logger.info("Resume enhancement and cover letter generation completed successfully.");
        res.json({ enhancedResume: result });
    } catch (error) {
        logger.error(`Error in enhanceResume: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getChatGPTResponse, testChatGPT, analyzeJobDescriptions, enhanceResume };
