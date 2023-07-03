import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: { params: any }) => {
  const uuid = context.params.snippetId;
  console.log(uuid);
  try {
    const snippet = await Snippet.findOne({ uuid });
    console.log(snippet);
    if (snippet) {
      return NextResponse.json(
        {
          message: 'Snippet fetched successfully',
          success: true,
          snippet,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: 'Snippet not found',
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to fetch snippet',
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
