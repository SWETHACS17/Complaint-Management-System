import Link from 'next/link';
import Image from 'next/image';

const ComplaintCard = ({ complaint }) => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-pink-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{complaint.title}</h3>
        <span className={'px-3 py-1 rounded-full text-xs font-medium'}>
          {complaint.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{complaint.description}</p>
      
      {complaint.photo && (
        <div className="mt-4 mb-4">
          <Image 
            src={complaint.photo} 
            alt="Complaint photo" 
            width={400} 
            height={300}
            className="rounded-lg object-cover border border-gray-200"
            priority={false}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
        </span>
        <Link 
          href={`/complaints/${complaint._id}`}
          className="text-pink-600 hover:text-pink-800 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;