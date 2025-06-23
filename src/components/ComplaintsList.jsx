'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';

const ComplaintsList = () => {
  const { data: session } = useSession(); 
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaints');
        
        if (!res.ok) {
          throw new Error('Failed to fetch complaints');
        }
        
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (session) {
      fetchComplaints();
    }
  }, [session]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You haven't submitted any complaints yet.
        <Link href="/complaints/new" className="ml-2 text-pink-600 hover:text-pink-800 font-medium">
          Submit your first complaint
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      <AnimatePresence>
        {complaints.map((complaint) => (
          <motion.li 
            key={complaint._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hover:bg-gray-50 transition-colors"
          >
            <div className="px-6 py-4">
              <button
                onClick={() => toggleExpand(complaint._id)}
                className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer" // Added cursor-pointer here
                aria-expanded={expandedId === complaint._id}
                aria-controls={`complaint-${complaint._id}`}
              >
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {complaint.title}
                  </h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedId === complaint._id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer" // Added cursor-pointer here
                  >
                    <svg
                      className="h-5 w-5 text-pink-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {expandedId === complaint._id && (
                  <motion.div
                    id={`complaint-${complaint._id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pl-1">
                      <div className="border border-pink-200 bg-pink-50 text-black p-4 rounded-lg transition-all duration-300 hover:bg-pink-700 hover:text-white cursor-pointer"> {/* Added cursor-pointer here */}
                        <p className="mb-4">{complaint.description}</p>
                      </div>
                      
                      {complaint.photo && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="mt-4"
                        >
                          <Image
                            src={complaint.photo}
                            alt="Complaint photo"
                            width={600}
                            height={400}
                            className="rounded-lg border border-gray-200 object-cover max-h-64 w-auto"
                            priority={false}
                          />
                        </motion.div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                        <button
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this complaint?')) {
                              try {
                                const response = await fetch('/api/complaints', {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({ id: complaint._id }),
                                });
                                
                                if (!response.ok) throw new Error('Failed to delete');
                                
                                setComplaints(complaints.filter(c => c._id !== complaint._id));
                              } catch (err) {
                                alert(err.message);
                              }
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer" // Added cursor-pointer here
                        >
                          Delete this Complaint
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default ComplaintsList;