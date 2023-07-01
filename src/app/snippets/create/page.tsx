'use client';

import languages from '@configs/languages';
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Code Snippets',
//   description: 'Code Snippets',
//   openGraph: {
//     title: 'Code Snippets',
//     description: 'Code Snippets',
//   },
// };

const CreateSnippet = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [expiry, setExpiry] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [code, setCode] = useState('');

  const expirationOptions = [
    { value: '1', label: '1 day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '4', label: '4 days' },
    { value: '5', label: '5 days' },
    { value: '6', label: '6 days' },
    { value: '7', label: '7 days' },
    { value: '8', label: '8 days' },
    { value: '9', label: '9 days' },
    { value: '10', label: '10 days' },
    { value: '11', label: '11 days' },
    { value: '12', label: '12 days' },
    { value: '13', label: '13 days' },
    { value: '14', label: '14 days' },
    { value: '15', label: '15 days' },
    { value: '16', label: '16 days' },
    { value: '17', label: '17 days' },
    { value: '18', label: '18 days' },
  ];

  const handleCreateSnippet = () => {
    // Handle snippet creation...
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create a Snippet</h1>
      <form onSubmit={handleCreateSnippet}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="language" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang.alias} value={lang.alias}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="expiry" className="block mb-1 font-semibold">
            Expiry
          </label>
          <select
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select an expiry</option>
            {expirationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="ownerName" className="block mb-1 font-semibold">
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="code" className="block mb-1 font-semibold">
            Code
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            rows={8}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Create Snippet
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
