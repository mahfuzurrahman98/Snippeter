import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    delete reqBody._tags;
    console.log(reqBody);
    // return;
    reqBody.uuid = v4();
    const snippet = new Snippet(reqBody);
    await snippet.save();

    return NextResponse.json(
      {
        message: 'Snippet created successfully',
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to create snippet',
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const page: number = Number(req.nextUrl.searchParams.get('page')) || 1;
    const limit: number = Number(req.nextUrl.searchParams.get('limit')) || 10;
    console.log(page, limit);
    const snippets = await Snippet.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        message: 'Snippets fetched successfully',
        success: true,
        snippets,
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
