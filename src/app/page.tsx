import { getAllSnippets } from '@/lib/data';
import { SnippetType, searchParamsType } from '@utils/types';
import SnippetCard from './components/SnippetCard';

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

      {snippets.map((snippet: SnippetType) => (
        <SnippetCard key={snippet.uuid} snippet={snippet} />
      ))}
    </div>
  );
};

export default Snippets;
