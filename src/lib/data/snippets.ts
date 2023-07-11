import Snippet from '@models/Snippet';

export const getAllSnippets = async (
  q: string,
  language: string,
  page: number,
  limit: number
) => {
  try {
    console.log(page, limit);

    // find snippets by all search criteria with pagination, q is the search query that can match the snippet title or tags[]
    const snippets = await Snippet.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
      ],
      language: { $regex: language, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      message: 'Snippets fetched successfully',
      success: true,
      data: { snippets },
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getSnippet = async (uuid: string) => {
  try {
    const snippet = await Snippet.findOne({ uuid });
    if (snippet) {
      return {
        message: 'Snippet fetched successfully',
        success: true,
        data: { snippet },
      };
    } else {
      return {
        message: 'Snippet not found',
        success: true,
        data: { snippet: null },
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
