import { getAllSnippets } from '@/lib/data/snippets';
import { SnippetType, searchParamsType } from '@utils/types';
import Link from 'next/link';
import Pagination from './components/Pagination';
import Search from './components/Search';
import SnippetCard from './components/SnippetCard';

const Snippets = async ({
  searchParams,
}: {
  searchParams?: searchParamsType;
}) => {
  const { q = '', lang = '', page = 1, limit = 10 } = searchParams || {};

  const response = await getAllSnippets(q, lang, page, limit);

  if (!response.success) {
    return null;
  }

  const snippets = response.data?.snippets || [];

  return (
    <div className="flex flex-col mx-auto min-h-screen max-w-screen-xl p-5">
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

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 md:gap-x-3">
        {snippets.map((snippet: SnippetType) => (
          <SnippetCard key={snippet.uuid} snippet={snippet} />
        ))}
      </div>

      <div className="mt-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default Snippets;
