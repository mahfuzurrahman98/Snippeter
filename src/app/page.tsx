import { getAllSnippets } from '@/lib/data/snippets';
import { SnippetType, searchParamsType } from '@utils/types';
import Link from 'next/link';
import Search from './components/Search';
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
    <div className="p-5 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Snippets</h1>
        <Link
          className="px-3 py-1 text-white rounded bg-black hover:bg-gray-600"
          href="/create"
        >
          Create
        </Link>
      </div>

      <Search />

      {snippets.map((snippet: SnippetType) => (
        <SnippetCard key={snippet.uuid} snippet={snippet} />
      ))}
    </div>
  );
};

export default Snippets;
