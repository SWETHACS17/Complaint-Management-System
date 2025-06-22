import Link from 'next/link';
import Image from 'next/image';

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {/* ... (other parts remain the same) */}
      
      {complaint.photo && (
        <div className="mt-4">
          <Image 
            src={complaint.photo} 
            alt="Complaint photo" 
            width={300} 
            height={200}
            className="rounded-lg object-cover"
            priority={false}
          />
        </div>
      )}
      
      {/* ... (rest remains the same) */}
    </div>
  );
};

export default ComplaintCard;