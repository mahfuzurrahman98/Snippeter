'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import SnippetCard from './components/SnippetCard';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', limit.toString());
        const response = await axios.get(`/api/snippets/?${params.toString()}`);
        const { snippets, totalPages } = response.data;
        setSnippets(snippets);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, [searchParams, limit]);

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

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    searchParams.replace(`?${params.toString()}`);
  };

  const handleLimitChange = (e: { target: { value: string } }) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', e.target.value);
    params.set('page', '1');
    searchParams.replace(`?${params.toString()}`);
  };

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (languageFilter === '' || snippet.language === languageFilter)
  );

  const renderSnippets = () => {
    if (filteredSnippets.length === 0) {
      return <p className="text-gray-500">No snippets found.</p>;
    }

    return filteredSnippets.map((snippet) => (
      <SnippetCard key={snippet.uuid} snippet={snippet} />
    ));
  };

  const renderPagination = () => {
    if (totalPages === 1) {
      return null;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 px-2 py-1 rounded ${
            i === currentPage
              ? 'bg-gray-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex mt-4">
        <button
          className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        {pages}
        <button
          className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
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

        <select
          value={limit}
          onChange={handleLimitChange}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div>{renderSnippets()}</div>

      {renderPagination()}
    </div>
  );
};

export default SnippetsPage;
