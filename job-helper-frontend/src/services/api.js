import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_URL;
const API_KEY = process.env.BACKEND_API_KEY

const postRequest = async (url, payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, payload, {
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': `${API_KEY}`
    },
    });
    return response;
  } catch (error) {
    console.error(`Error in API request to ${url}:`, error);
    throw error;
  }
};

export const searchJobs = async (filters) => postRequest('/slack/jobs', { filters });

export const enhanceResume = async (resume, jobDescriptions) =>
  postRequest('/api/enhance-resume', { resume, jobDescriptions });

export const draftEnhancedResume = async (payload) =>{

  postRequest('/api/draft-enhanced-resume', payload);

  try {
    const response = await axios.post(`${API_BASE_URL}/api/draft-enhanced-resume`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${API_KEY}`,
      },
      responseType: 'arraybuffer', // Ensure Axios handles binary data correctly
    });
    return response;
  } catch (error) {
    console.error(`Error in API request to ${url}:`, error);
    throw error;
  }
}

