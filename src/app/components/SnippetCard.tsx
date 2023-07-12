import languages from '@lib/data/languages';
import { SnippetType } from '@utils/types';
import Link from 'next/link';

const SnippetCard = ({ snippet }: { snippet: SnippetType }) => {
  return (
    <div className="border-gray-300 border-2 p-4 rounded-md mb-4">
      <Link href={'/' + snippet.uuid} className="text-xl font-bold">
        {snippet.title}
      </Link>
      <p className="text-gray-500">
        Language:{' '}
        {languages.find((lang) => lang.ext === snippet.language)?.name}
      </p>
      <div className="flex mt-2">
        {snippet.tags &&
          snippet.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SnippetCard;
