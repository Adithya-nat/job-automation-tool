import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailsModal';
import { searchJobs } from '../services/api';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = async (filters) => {
    try {
      const response = await searchJobs(filters);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 hover:font-mono">Job Search</h1>
      <SearchForm onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} onClick={setSelectedJob} />
        ))}
      </div>
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Home;
