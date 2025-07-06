'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComplaintDetail({ complaint }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/complaints`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: complaint._id }),
      });
      
      if (!response.ok) throw new Error('Failed to delete complaint');
      
      router.push('/complaints');
      router.refresh();
    } catch (error) {
      alert(error.message);
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{complaint.title}</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="prose max-w-none text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
        <p>{complaint.description}</p>
      </div>
      
      {complaint.photo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <Image
            src={complaint.photo}
            alt="Complaint photo"
            width={800}
            height={600}
            className="rounded-lg border border-gray-200 object-contain max-h-64 sm:max-h-96 w-full"
            priority={false}
          />
        </motion.div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
        <button
          onClick={() => router.push('/complaints')}
          className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          Back to List
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isDeleting ? 'Deleting...' : 'Delete Complaint'}
        </button>
      </div>
    </div>
  );
}