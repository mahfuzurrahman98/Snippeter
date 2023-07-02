import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const snippets = await Snippet.find();

    return NextResponse.json({
      message: 'Snippets fetched successfully',
      success: true,
      snippets,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to fetch snippets',
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
