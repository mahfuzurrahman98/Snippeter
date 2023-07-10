import CopyButton from '@app/components/CopyButton';
import languages from '@configs/languages';
import { getSnippet } from '@lib/data';
import { SnippetType } from '@utils/types';

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
    <div className="max-w-3xl mx-auto py-7 px-5">
      <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>
      <p className="text-gray-500 mb-2">Created at: {formattedDate}</p>
      <p className="text-gray-500 mb-4">Tags: {snippet.tags?.join(', ')}</p>
      <p className="text-gray-500 mb-4">Owner: {snippet.owner}</p>

      <div className="flex justify-between items-center bg-gray-700 py-1 px-3 rounded-t-md">
        <span className="text-white">
          {languages.find((lang) => lang.ext === snippet.language)?.name}
        </span>
        <CopyButton sourceCode={snippet.sourceCode} />
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
