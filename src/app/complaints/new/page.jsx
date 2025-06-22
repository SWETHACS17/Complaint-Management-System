import ComplaintForm from '@/components/ComplaintForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { redirect } from 'next/navigation';

export default async function NewComplaintPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Submit New Complaint</h2>
      <ComplaintForm />
    </div>
  );
}