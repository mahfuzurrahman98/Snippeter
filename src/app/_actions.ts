'use server';

import Snippet from '@models/Snippet';

export const addSnippetAction = async (snippetData: any) => {
  try {
    const snippet = new Snippet(snippetData);
    await snippet.save();
    console.log('added: ', snippet);
    console.log('type: ', typeof snippet);

    return {
      message: 'Snippet added successfully',
      success: true,
      data: {
        snippet: {
          id: snippet._id.toString(),
          uuid: snippet.uuid,
        },
      },
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
