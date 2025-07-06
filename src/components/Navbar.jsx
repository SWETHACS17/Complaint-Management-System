'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-pink-500 shadow-lg py-2' : 'bg-pink-500 py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-all duration-300 ${scrolled ? 'text-coral-600' : 'text-white'}`}
          >
            Complaint<span className="font-light">System</span>
          </Link>
          
          <div className="flex space-x-4 sm:space-x-6 md:space-x-8">
            {status === 'authenticated' ? (
              <> 
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`mr-4 sm:mr-8 md:mr-12 relative group text-base sm:text-lg font-medium ${scrolled ? 'text-white' : 'text-white'}`}
                >
                  Logout
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </button>
              </>
            ) : status === 'unauthenticated' ? (
              <>
                <Link 
                  href="/login" 
                  className={`mr-4 sm:mr-8 md:mr-12 relative group text-base sm:text-lg font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Login
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${pathname === '/login' ? 'w-full' : ''} group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </Link>
                <Link 
                  href="/register" 
                  className={`mr-4 sm:mr-8 md:mr-12 relative group text-base sm:text-lg font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Register
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${pathname === '/register' ? 'w-full' : ''} group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;