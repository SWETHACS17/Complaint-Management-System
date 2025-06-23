import ComplaintForm from '@/components/ComplaintForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default async function NewComplaintPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login?callbackUrl=/complaints/new');
  }
  
  return (
    <>
    <Navbar />
    <div className="py-8 px-4 max-w-7xl mx-auto mb-30">
      <div className="mb-8 mt-20 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-2">Submit a New Complaint</h1>
        <p className="text-gray-600">Fill out the form below to report your issue</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
        <ComplaintForm />
      </div>
    </div>
    </>
  );
}