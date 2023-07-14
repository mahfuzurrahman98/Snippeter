import { SnippetType } from '@utils/types';
import SnippetCard from './SnippetCard';

const Snippets = ({ snippets }: { snippets: SnippetType[] }) => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 md:gap-x-3">
      {snippets.map((snippet: SnippetType) => (
        <SnippetCard key={snippet.uuid} snippet={snippet} />
      ))}
    </div>
  );
};

export default Snippets;
