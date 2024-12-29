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

const getEnhancedResume = async (resume, enhancements) => {
    const messages = [
        {
            role: "system",
            content: "You are a professional resume builder who creates structured and professional resumes based on the user's input and enhancements."
        },
        {
            role: "user",
            content: `
                Based on the following original resume and enhancements, generate a structured JSON object with these exact fields as arrays of objects where applicable:
                
                - contactInformation: { name, phone, email, LinkedIn } ( Not an array)
                - summary: { text } ( Not an array)
                - education: [{ institution, degree, GPA, graduationYear }]
                - professionalExperience: [{ company, position, timePeriod, responsibilities ( Array of strings ) }]
                - skills: [{ skill }]
                - portfolio: { url }( Not an array)
                - certifications: [{ certification }]
                - professionalReferences: [{ reference }]

                Original Resume:
                ${resume}

                Enhancements:
                ${enhancements}

                DOs:
                - Return education, professionalExperience, skills,certifications and professionalReferences as array always
                - Return the response as a json string with fields as specified which should be parsable to a json object in node js
                
                DONTs:
                - Do not change the field names
                - Do not include extra characters that might throw error while parsing the json response from you.

            `
        }
    ];

    return await makeChatGPTRequest(process.env.CHATGPT_MODEL, messages, 1500);
};


module.exports = { makeChatGPTRequest, getEnhancedResume };