import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'common', 'output.wav');

    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'inline; filename="output.wav"',
      },
    });
  } catch (error) {
    console.error('Error fetching the audio file:', error);
    return new NextResponse('File not found or cannot be read', {
      status: 500,
    });
  }
}
