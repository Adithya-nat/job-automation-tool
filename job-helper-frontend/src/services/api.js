import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const postRequest = async (url, payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, payload, {
      headers: { 'Content-Type': 'application/json' },
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
