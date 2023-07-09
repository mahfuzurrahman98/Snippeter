import { SnippetType } from '@utils/types';

const SnippetCard = ({ snippet }: SnippetType) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md mb-4">
      <a href={'/snippet/' + snippet.uuid} className="text-xl font-bold">
        {snippet.title}
      </a>
      <p className="text-gray-500">Language: {snippet.language}</p>
      <div className="flex mt-2">
        {snippet.tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SnippetCard;
