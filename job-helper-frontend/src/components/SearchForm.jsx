/* eslint-disable react/prop-types */
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    keywords: '',
    location: '',
    category: '',
    results: 5,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'results' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSearch(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {['keywords', 'location', 'category'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ))}
      <input
        type="number"
        name="results"
        placeholder="Number of Results"
        value={formData.results}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-stone-950 text-white w-full p-2 rounded hover:bg-stone-800 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-5 h-5 inline-block"></span> : 'Search Jobs'}
      </button>
    </form>
  );
};

export default SearchForm;
