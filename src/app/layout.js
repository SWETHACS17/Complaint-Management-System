import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Complaint Management System',
  description: 'A simple complaint management system',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}