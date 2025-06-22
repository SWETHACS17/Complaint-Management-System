import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Complaint Management System</h1>
      
      {session ? (
        <div>
          <p className="text-xl mb-6">Hello, {session.user.name}!</p>
          <Link 
            href="/complaints" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Your Complaints
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-xl mb-6">Please login or register to submit complaints</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/auth/login" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}