/* eslint-disable react/prop-types */
import { useState } from 'react';
import { enhanceResume } from '../services/api';
import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const JobDetailsModal = ({ job, onClose }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [enhancements, setEnhancements] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract text from PDF
  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(' ');
        }
        resolve(text);
      };

      fileReader.onerror = () => reject(new Error('Error reading PDF file'));
      fileReader.readAsArrayBuffer(file);
    });
  };

  // Handle resume upload
  const handleUpload = async () => {
    if (!resumeFile) return;

    setLoading(true);
    try {
      const resumeText = await extractTextFromPDF(resumeFile);
      const jobDescriptions = [job.description];
      const response = await enhanceResume(resumeText, jobDescriptions);
      const [enhancementsSummary, coverLetterResponse] =
        response.data.enhancedResume.split('===COVER LETTER===');

      setEnhancements(enhancementsSummary.replace('===ENHANCEMENTS===', '').trim());
      setCoverLetter(coverLetterResponse.trim());
    } catch (error) {
      console.error('Error enhancing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-screen-md shadow-lg animate-fadeIn overflow-hidden">
        <button className="text-gray-500 float-right" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-700">{job.company}</p>
        <p className="text-gray-500">{job.location}</p>
        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="text-bg-lime-600 hover:underline mt-2 inline-block"
        >
          Apply Here
        </a>
        <input
          type="file"
          className="block w-full mt-4 text-sm text-gray-600"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        {!enhancements && !coverLetter && (
          <p className="text-gray-600 text-center mt-4 mb-6">
            Upload your resume to get some suggestions from our <span className="font-bold decoration-stone-950">Job Search Assistant</span>.
          </p>
        )}
        <button
          className={`bg-teal-950 text-white px-4 py-2 rounded mt-4 hover:bg-teal-600 flex items-center justify-center ${loading ? 'opacity-50' : ''}`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            'Upload Resume'
          )}
        </button>
        {(enhancements || coverLetter) && (
          <div
            className="mt-6 overflow-y-auto max-h-[60vh] divide-y divide-gray-300"
            style={{ scrollBehavior: 'smooth' }}
          >
            {enhancements && (
              <div className="p-4 animate-slideIn">
                <h3 className="font-semibold mb-2">Hi Job Seeker! I am a Job Search assistant who decided to help you out today.:</h3>
                <p className="text-gray-700 mb-2">
                  Here’s how I’ve refined your resume to make it shine!
                </p>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-100 p-4 rounded">
                  {enhancements}
                </pre>
              </div>
            )}
            {coverLetter && (
              <div className="p-4 animate-slideIn">
                <h3 className="font-semibold mb-2">Also, I can be of more help too.</h3>
                <p className="text-gray-700 mb-2">
                  I’ve prepared this cover letter for you to make a great first impression!
                </p>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-100 p-4 rounded mb-4">
                  {coverLetter}
                </pre>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => copyToClipboard(coverLetter)}
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsModal;
