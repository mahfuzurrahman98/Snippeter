import Database from '@configs/db';

const db = Database.getInstance();

const snippetSchema = new db.Schema(
  {
    uuid: {
      type: String,
      required: [true, 'UUID is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
    },
    sourceCode: {
      type: String,
      required: [true, 'Source code is required'],
    },
    owner: {
      type: String,
      required: [true, 'Owner is required'],
    },
    tags: {
      type: [String],
      required: [false],
    },
  },
  { timestamps: true }
);

const Snippet = db.models.snippets || db.model('snippets', snippetSchema);

export default Snippet;
