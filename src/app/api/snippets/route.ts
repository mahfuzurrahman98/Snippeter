import Database from '@configs/db';
import Snippet from '@models/Snippet';
import { NextRequest, NextResponse } from 'next/server';
const db = Database.getInstance();

export async function POST(req: NextRequest) {
  // console.log(process.env.MONGO_URI);
  const reqBody = await req.json();
  const snippet = new Snippet(reqBody);
  await snippet.save();
  return NextResponse.json({
    message: 'Snippet created successfully',
    success: true,
  });
}
