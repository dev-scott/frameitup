import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicId, transformations } = body;

    if (!publicId) {
      return NextResponse.json(
        { error: 'No publicId provided' },
        { status: 400 }
      );
    }

    // Build transformation URL
    const url = cloudinary.url(publicId, {
      transformation: transformations,
    });

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (error) {
    console.error('Transform error:', error);
    return NextResponse.json(
      { error: 'Transformation failed' },
      { status: 500 }
    );
  }
}