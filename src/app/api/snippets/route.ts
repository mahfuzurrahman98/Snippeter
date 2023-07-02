import Database from '@configs/db';
import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

const db = Database.getInstance();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    delete reqBody._tags;
    console.log(reqBody);
    // return;
    reqBody.uuid = v4();
    const snippet = new Snippet(reqBody);
    await snippet.save();

    return NextResponse.json({
      message: 'Snippet created successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to create snippet',
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

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
