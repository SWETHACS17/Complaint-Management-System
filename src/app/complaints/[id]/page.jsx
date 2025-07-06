'use client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { redirect } from 'next/navigation';
import ComplaintDetail from '@/components/ComplaintDetail';
import connectDB from '@/config/db';
import Complaint from '@/models/Complaint';

export default async function ComplaintDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login?callbackUrl=/complaints');
  }
  
  await connectDB();
  const complaint = await Complaint.findById(params.id).lean();
  
  if (!complaint) {
    redirect('/complaints');
  }
  
  if (complaint.user.toString() !== session.user.id) {
    redirect('/complaints');
  }
  
  // Convert to plain object and serialize date
  const complaintData = {
    ...complaint,
    _id: complaint._id.toString(),
    createdAt: complaint.createdAt.toISOString(),
    user: complaint.user.toString()
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Complaint Details</h1>
          <p className="text-sm md:text-base text-gray-600">View the details of your submitted complaint</p>
        </div>
        
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <ComplaintDetail complaint={complaintData} />
        </div>
      </div>
    </div>
  );
}