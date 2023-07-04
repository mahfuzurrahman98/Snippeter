import axios from 'axios';
import SnippetCard from './components/SnippetCard';

type SnippetType = {
  uuid: string;
  title: string;
  language: string;
  sourceCode: string;
  owner: string;
  tags: string[];
};

export const getSnippets = async () => {
  const response = await axios.get('http://localhost:3000/api/snippets');
  // console.log(response.data);
  return response.data.snippets;
};
const Snippets = async () => {
  const snippets = await getSnippets();

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
