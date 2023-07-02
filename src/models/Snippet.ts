import Database from '@configs/db';

const db = Database.getInstance();

const snippetSchema = new db.Schema(
  {
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
    theme: {
      type: String,
      required: [true, 'Theme is required'],
    },
    owner: {
      type: String,
      required: [true, 'Owner is required'],
    },
    expiry: {
      type: Number,
      required: [true, 'Expiry is required'],
    },
  },
  { timestamps: true }
);

const Snippet = db.model('Snippet', snippetSchema);
export default Snippet;
