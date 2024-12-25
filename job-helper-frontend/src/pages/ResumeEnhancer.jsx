import { useState } from 'react';
import { enhanceResume } from '../services/api';

const ResumeEnhancer = () => {
  const [resume, setResume] = useState('');
  const [jobDescriptions, setJobDescriptions] = useState(['']);
  const [enhancedResume, setEnhancedResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnhanceResume = async () => {
    setLoading(true);
    try {
      const response = await enhanceResume(resume, jobDescriptions);
      setEnhancedResume(response.data.enhancedResume);
    } catch (error) {
      console.error('Error enhancing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Resume Enhancer</h1>
      <textarea
        rows="5"
        placeholder="Paste your resume here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Paste job descriptions here (one per line)"
        value={jobDescriptions.join('\n')}
        onChange={(e) => setJobDescriptions(e.target.value.split('\n'))}
      />
      <button onClick={handleEnhanceResume} disabled={loading}>
        Enhance Resume
      </button>
      {loading && <p>Loading...</p>}
      {enhancedResume && (
        <div>
          <h2>Enhanced Resume</h2>
          <pre>{enhancedResume}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeEnhancer;
