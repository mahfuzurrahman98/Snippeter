'use client';

import SnippetCard from '@/app/components/SnippetCard';
import { useState } from 'react';

const Home = () => {
  const [snippets, setSnippets] = useState([
    { id: 1, title: 'Snippet 1', language: 'JavaScript' },
    { id: 2, title: 'Snippet 2', language: 'Python' },
    { id: 3, title: 'Snippet 3', language: 'Java' },
    // Additional snippets...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastSnippet = currentPage * itemsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - itemsPerPage;
  const currentSnippets = snippets.slice(
    indexOfFirstSnippet,
    indexOfLastSnippet
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Code Snippets</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center">
            <li className="mx-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
              >
                Previous
              </button>
            </li>
            <li className="mx-1">
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastSnippet >= snippets.length}
                className="px-3 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
