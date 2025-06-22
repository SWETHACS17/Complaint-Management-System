import ComplaintForm from '@/components/ComplaintForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { redirect } from 'next/navigation';

async function getComplaint(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/complaints/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch complaint');
  }
  
  return res.json();
}

export default async function ComplaintDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login');
  }
  
  const complaint = await getComplaint(params.id);
  
  // Verify the complaint belongs to the logged-in user
  if (complaint.user.toString() !== session.user.id) {
    redirect('/complaints');
  }
  
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Update Complaint</h2>
      <ComplaintForm complaint={complaint} />
    </div>
  );
}