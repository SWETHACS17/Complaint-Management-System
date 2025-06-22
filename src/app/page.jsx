import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-peach-50 to-peach-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold mb-17 mt-39 text-peach-700 animate-fadeIn">
          Welcome to <span className="text-pink-600">Complaint Management </span>
        
        </h1>
        
        {session ? (
          <div className="animate-slideUp">
            <p className="text-2xl mb-8 text-gray-700">Hello, <span className="font-semibold text-coral-600">{session.user.name}</span>!</p>
            <Link 
              href="../complaints" 
              className="  inline-block bg-coral-500 hover:bg-coral-600 text-black font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1  bg-pink-500"
            >
              View Your Complaints
              <span className="ml-2"></span>
            </Link>
             <Link 
              href="../complaints/new" 
              className="  inline-block bg-coral-500 hover:bg-coral-600 text-black font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1  bg-pink-500 ml-16 mt-13"
            >
             Make a New Complaint
              <span className="ml-2"></span>
            </Link>
          </div>
        ) : (
          <div className="animate-slideUp">
            <p className="text-2xl mb-8 text-gray-700">Please login or register to submit complaints</p>
            <div className="flex justify-center space-x-6">
              <Link 
                href="/login" 
                className="bg-pink-200 hover:bg-pink-600 text-black font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-pink-200 hover:bg-pink-500 text-black font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}