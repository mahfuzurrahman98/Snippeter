'use client';

import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  useEffect(() => {
    // Fetch snippets from the backend API and update the snippets state
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('/api/snippets'); // Replace with your backend API endpoint
        setSnippets(response.data.snippets);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, []);

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (languageFilter === '' || snippet.language === languageFilter)
  );

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  const handleLanguageFilterChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setLanguageFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Code Snippets</h1>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />

        <select
          value={languageFilter}
          onChange={handleLanguageFilterChange}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* Add more options for other languages */}
        </select>
      </div>

      <div>
        {filteredSnippets.length === 0 ? (
          <p className="text-gray-500">No snippets found.</p>
        ) : (
          filteredSnippets.map((snippet) => (
            <div
              key={snippet.uuid}
              className="border border-gray-300 p-4 rounded-md mb-4"
            >
              <h2 className="text-xl font-bold">{snippet.title}</h2>
              <p className="text-gray-500">Language: {snippet.language}</p>
              {/* Display other snippet details */}
            </div>
          ))
        )}
      </div>

      {/* Pagination component */}
      {/* Add pagination component here */}
    </div>
  );
};

export default SnippetsPage;
