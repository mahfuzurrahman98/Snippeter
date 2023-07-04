type SnippetType = {
  uuid: string;
  title: string;
  language: string;
  sourceCode: string;
  owner: string;
  tags: string[];
};

const SnippetCard = ({ snippet }: SnippetType) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold">{snippet.title}</h2>
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
