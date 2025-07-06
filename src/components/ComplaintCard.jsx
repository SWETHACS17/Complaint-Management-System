import Link from 'next/link';
import Image from 'next/image';

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-pink-100 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{complaint.title}</h3>
        <span className={'px-2 sm:px-3 py-1 rounded-full text-xs font-medium self-start sm:self-auto'}>
          {complaint.status}
        </span>
      </div>
      
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
        {complaint.description}
      </p>
      
      {complaint.photo && (
        <div className="mt-3 sm:mt-4 mb-3 sm:mb-4">
          <Image 
            src={complaint.photo} 
            alt="Complaint photo" 
            width={400} 
            height={300}
            className="rounded-lg object-cover border border-gray-200 w-full h-auto"
            priority={false}
          />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm text-gray-500">
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