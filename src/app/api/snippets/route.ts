import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    delete reqBody._tags;

    reqBody.uuid = v4();
    const snippet = new Snippet(reqBody);
    await snippet.save();

    return NextResponse.json(
      {
        message: 'Snippet created successfully',
        success: true,
        data: { snippet },
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
