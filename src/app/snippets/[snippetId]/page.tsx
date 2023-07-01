type Params = {
  params: {
    snippetId: number;
  };
};

const Post = ({ params }: Params) => {
  return <div>Snippet no: {params.snippetId}</div>;
};

export default Post;
