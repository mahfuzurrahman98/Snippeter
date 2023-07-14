import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const noOfSnippets = await Snippet.countDocuments({});

    return NextResponse.json(
      {
        message: 'Snippets count fetched successfully',
        success: true,
        data: { noOfSnippets },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to fetch snippets',
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};
