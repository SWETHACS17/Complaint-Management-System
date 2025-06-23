import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { redirect } from 'next/navigation';
import ComplaintsList from '@/components/ComplaintsList';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default async function ComplaintsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login?callbackUrl=/complaints');
  }
  
  return (
    <>
      <Navbar />
      {/* Floating Action Button for New Complaint */}
    
      
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mt-27">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Complaints</h1>
            <p className="text-gray-600">View and manage all your submitted complaints</p>
              <Link 
              href="/complaints/new"
              className=" pb-1 fixed top-33 right-10 z-50 bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-pink-700 transition-all duration-300 hover:shadow-xl hover:scale-110"
              title="Create New Complaint"
            >
              +
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <ComplaintsList />
          </div>
        </div>
      </div>
    </>
  );
}