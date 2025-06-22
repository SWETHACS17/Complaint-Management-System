import { NextResponse } from 'next/server';
import { getSession } from '@/lib/utils';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('photo');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const result = await uploadImage(buffer);
    
    return NextResponse.json({ 
      url: result.secure_url,
      publicId: result.public_id 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}