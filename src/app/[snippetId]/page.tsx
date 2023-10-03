import CopyButton from '@app/components/CopyButton';
import ShareButton from '@app/components/ShareButton';
import languages from '@lib/data/languages';
import { getSnippet } from '@lib/data/snippets';
import { SnippetType } from '@utils/types';
import { Metadata } from 'next';
import Link from 'next/link';

import AceComponent from '../components/AceEditor';

type Params = {
  params: {
    snippetId: string;
  };
};

type Response = {
  success: boolean;
  message: string;
  data?: { snippet: SnippetType } | undefined;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const response: Response = await getSnippet(params.snippetId);
  const snippet = response.data?.snippet;

  return {
    title: snippet ? `${snippet.title} | Snippeter` : 'Snippet',
  };
}

const Snippet = async ({ params }: Params) => {
  const response: Response = await getSnippet(params.snippetId);
  const snippet = response.data?.snippet;

  if (!snippet) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-400 text-2xl">
        {'</> Snippet not found'}
      </div>
    );
  }

  // set snippet mode
  snippet.mode = languages.find((lang) => lang.ext === snippet.language)?.mode as string;

  const formattedDate = snippet.createdAt
    ? new Date(snippet.createdAt).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : 'Unknown Date';

  return (
    <div className="max-w-4xl mx-auto py-7 px-5">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-x-2 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{snippet.title}</h1>
            <ShareButton shareLink={snippet.uuid} />
          </div>
          <p className="text-gray-700 mb-2">Created at: {formattedDate}</p>
          <p className="text-gray-700 mb-4">
            Tags:
            {snippet.tags &&
              snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md ml-2"
                >
                  {tag}
                </span>
              ))}
          </p>
          <p className="text-gray-700 mb-4">Owner: {snippet.owner}</p>
        </div>
        <Link
          className="px-3 py-1 text-white rounded bg-black hover:bg-gray-600"
          href="/"
        >
          Home
        </Link>
      </div>

      <div className="flex justify-between items-center bg-gray-700 py-1 px-3 rounded-t-md">
        <span className="text-white">
          {languages.find((lang) => lang.ext === snippet.language)?.name}
        </span>
        <CopyButton sourceCode={snippet.sourceCode} />
      </div>
      <AceComponent
        sourceCode={snippet.sourceCode}
        mode={snippet.mode}
        theme={'github_dark'}
        readOnly={true}
      />
    </div>
  );
};

export default Snippet;
