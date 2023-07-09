import SnippetCard from './components/SnippetCard';
import { getAllSnippets } from './lib/data';

type SnippetType = {
  uuid: string;
  title: string;
  language: string;
  sourceCode: string;
  owner: string;
  tags: string[];
};

type Response = {
  success: boolean;
  message: string;
  data?: {
    snippets: SnippetType[];
  };
};

type searchParamsType = {
  q?: string;
  language?: string;
  page?: number;
  limit?: number;
};

const Snippets = async ({
  searchParams,
}: {
  searchParams?: searchParamsType;
}) => {
  const { q = '', language = '', page = 1, limit = 10 } = searchParams || {};

  const response = await getAllSnippets(q, language, page, limit);

  if (!response.success) {
    console.log(response.message);
    return null;
  }

  const snippets = response.data?.snippets || [];

  return (
    <div className=" p-5">
      <h1 className="text-3xl font-bold mb-5">Snippets</h1>

      {snippets.map((snippet) => (
        <SnippetCard key={snippet.uuid} snippet={snippet} />
      ))}
    </div>
  );
};

export default Snippets;
