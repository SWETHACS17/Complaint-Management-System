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
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{complaint.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
          </p>
        </div>
      
      </div>
      
      <div className="prose max-w-none text-gray-700 mb-8">
        <p>{complaint.description}</p>
      </div>
      
      {complaint.photo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Image
            src={complaint.photo}
            alt="Complaint photo"
            width={800}
            height={600}
            className="rounded-lg border border-gray-200 object-contain max-h-96 w-full"
            priority={false}
          />
        </motion.div>
      )}
      
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          onClick={() => router.push('/complaints')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to List
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete Complaint'}
        </button>
      </div>
    </div>
  );
}