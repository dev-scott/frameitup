// src/app/api/cloudinary/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  console.log('🚀 Cloudinary upload route hit!');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('📁 File received:', file?.name, file?.size);

    if (!file) {
      console.error('❌ No file in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Vérifier la configuration Cloudinary
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error('❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not set');
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      );
    }

    console.log('☁️ Cloudinary config:', {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('📤 Uploading to Cloudinary...');

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'custom_frames',
            resource_type: 'image',
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) {
              console.error('❌ Cloudinary upload error:', error);
              reject(error);
            } else {
              console.log('✅ Cloudinary upload success:', result?.public_id);
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    });
  } catch (error: any) {
    console.error('💥 Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Ajouter une route GET pour tester
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Cloudinary upload route is working',
    config: {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
    }
  });
}