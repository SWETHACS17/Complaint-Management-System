'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ComplaintForm = ({ complaint = null }) => {
  const router = useRouter();
  const [title, setTitle] = useState(complaint?.title || '');
  const [description, setDescription] = useState(complaint?.description || '');
  const [photo, setPhoto] = useState(complaint?.photo || '');
  const [publicId, setPublicId] = useState(complaint?.publicId || '');
  const [status, setStatus] = useState(complaint?.status || 'Pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const method = complaint ? 'PUT' : 'POST';
      const url = complaint ? `/api/complaints/${complaint._id}` : '/api/complaints';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, photo, publicId, status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }
      
      router.push('/complaints');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Remove previous image if exists
      if (publicId) {
        await deleteImage(publicId);
      }
      
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.url) {
        setPhoto(data.url);
        setPublicId(data.publicId);
      }
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* ... (rest of the form remains the same) */}
    </form>
  );
};

export default ComplaintForm;