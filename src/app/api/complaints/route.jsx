import { NextResponse } from 'next/server';
import Complaint from '@/models/Complaint';
import connectDB from '@/config/db';
import { getSession } from '@/lib/utils';
import { deleteImage } from '@/lib/cloudinary';

// ... (GET method remains the same)

// POST a new complaint
export async function POST(request) {
  try {
    await connectDB();
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, description, photo, publicId } = body;
    
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }
    
    const newComplaint = new Complaint({
      title,
      description,
      photo: photo || '',
      publicId: publicId || '',
      user: session.user.id,
    });
    
    await newComplaint.save();
    return NextResponse.json(newComplaint, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a complaint
export async function DELETE(request) {
  try {
    await connectDB();
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await request.json();
    const complaint = await Complaint.findById(id);
    
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }
    
    if (complaint.user.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Delete image from Cloudinary if exists
    if (complaint.publicId) {
      await deleteImage(complaint.publicId);
    }
    
    await Complaint.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}