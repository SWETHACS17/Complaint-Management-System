'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Navbar = ({ session }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? ' bg-pink-500 shadow-lg py-2' : ' bg-pink-500 py-4'}`}>
      <div className="container mx-auto px-0">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className={`text-5xl font-bold transition-all duration-300 ${scrolled ? 'text-coral-600' : 'text-white'}`}
          >
            Complaint<span className="font-light">System</span>
          </Link>
          
          <div className="flex space-x-8">
            {session ? (
              <> 
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`relative group text-lg font-medium ${scrolled ? 'text-white' : 'text-white'}`}
                >
                  Logout
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`relative group text-lg font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Login
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${pathname === '/login' ? 'w-full' : ''} group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </Link>
                <Link 
                  href="/register" 
                  className={`relative group text-lg font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Register
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${pathname === '/register' ? 'w-full' : ''} group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-coral-500' : 'bg-white'}`}></span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;