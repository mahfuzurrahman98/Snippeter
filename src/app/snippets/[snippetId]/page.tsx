'use client';

import languages from '@configs/languages';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Snippet = {
  title: string;
  sourceCode: string;
  language: string;
  tags: string[];
  uuid: string;
  owner: string;
  createdAt: string;
};

type Params = {
  params: {
    snippetId: number;
  };
};

const Snippet = ({ params }: Params) => {
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await axios.get(`/api/snippets/${params.snippetId}`);
        setSnippet(response.data.snippet);
      } catch (error) {
        console.error('Error fetching snippet:', error);
      }
    };
    fetchSnippet();
  }, [params.snippetId]);

  if (!snippet) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(snippet.createdAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto py-7 px-5">
      <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>
      <p className="text-gray-500 mb-2">Created at: {formattedDate}</p>
      <p className="text-gray-500 mb-4">Tags: {snippet.tags.join(', ')}</p>
      <p className="text-gray-500 mb-4">Owner: {snippet.owner}</p>

      <div className="flex justify-between items-center bg-gray-700 py-1 px-3 rounded-t-md">
        <span className="text-white">
          {languages.find((lang) => lang.ext === snippet.language)?.name}
        </span>
        <button
          className="font-semibold px-2 py-1"
          onClick={() => {
            navigator.clipboard.writeText(snippet.sourceCode);
          }}
        >
          <img src="/copy.svg" alt="copy" width={10} className="text-white" />
        </button>
      </div>
      <pre className="bg-black rounded-b-md p-4 max-w-full overflow-x-auto">
        <code
          className="text-sm font-fira-code text-white"
          dangerouslySetInnerHTML={{ __html: snippet.sourceCode }}
        ></code>
      </pre>
    </div>
  );
};

export default Snippet;
