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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(complaint?.photo || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const method = complaint ? 'PUT' : 'POST';
      const url = complaint ? `/api/complaints/${complaint._id}` : '/api/complaints';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, photo, publicId }),
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
    
    // Check file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      
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
        setError('');
      }
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const deleteImage = async (publicId) => {
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const removeImage = async () => {
    if (publicId) {
      await deleteImage(publicId);
    }
    setPhoto('');
    setPublicId('');
    setPreviewImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-pink-100">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        {complaint ? 'Update Complaint' : 'Submit New Complaint'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-pink-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-black"
          placeholder="Enter complaint title"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-pink-600">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-black"
          placeholder="Describe your complaint in detail"
          required
        />
      </div>
      
      <div className="mb-6">
        
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
              Upload Photo
            </span>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
           <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1 mt-3 px-1">
              Photo (Optional)
           </label>
          </label>
          {previewImage && (
            <button
              type="button"
              onClick={removeImage}
              className="px-3 py-1 text-sm text-pink-600 hover:text-pink-800"
            >
              Remove
            </button>
          )}
        </div>
        {previewImage && (
          <div className="mt-4">
            <Image
              src={previewImage}
              alt="Preview"
              width={300}
              height={200}
              className="rounded-lg object-cover border border-gray-200"
              priority={false}
            />
          </div>
        )}
      </div>
      
      {complaint && (
        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
         
        </div>
      )}
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/complaints')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {complaint ? 'Updating...' : 'Submitting...'}
            </span>
          ) : (
            complaint ? 'Update Complaint' : 'Submit Complaint'
          )}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;