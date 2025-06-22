import { NextResponse } from 'next/server';
import Complaint from '@/models/Complaint';
import connectDB from '@/config/db';
import { getSession } from '@/lib/utils';
import { deleteImage } from '@/lib/cloudinary';

// GET all complaints for the current user
export async function GET() {
  try {
    await connectDB();
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const complaints = await Complaint.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert to plain objects and serialize dates
    const serializedComplaints = complaints.map(complaint => ({
      ...complaint,
      _id: complaint._id.toString(),
      createdAt: complaint.createdAt.toISOString(),
      user: complaint.user.toString()
    }));
    
    return NextResponse.json(serializedComplaints);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
    
    return NextResponse.json({
      ...newComplaint.toObject(),
      _id: newComplaint._id.toString(),
      createdAt: newComplaint.createdAt.toISOString(),
      user: newComplaint.user.toString()
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
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