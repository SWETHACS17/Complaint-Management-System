'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = ({ session }) => {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Complaint System</Link>
        
        <div className="flex space-x-4">
          {session ? (
            <>
              <Link 
                href="/complaints" 
                className={`hover:underline ${pathname === '/complaints' ? 'font-bold' : ''}`}
              >
                My Complaints
              </Link>
              <Link 
                href="/complaints/new" 
                className={`hover:underline ${pathname === '/complaints/new' ? 'font-bold' : ''}`}
              >
                New Complaint
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className={`hover:underline ${pathname === '/auth/login' ? 'font-bold' : ''}`}
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className={`hover:underline ${pathname === '/auth/register' ? 'font-bold' : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;