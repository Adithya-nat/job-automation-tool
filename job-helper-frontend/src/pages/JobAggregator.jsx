import { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const JobAggregator = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/slack/jobs`, {
          filters: { keywords: ['architect'], locations: ['California'], category: 'construction', results: 5 },
        });
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Job Aggregator</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobAggregator;
