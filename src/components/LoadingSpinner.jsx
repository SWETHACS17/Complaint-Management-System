const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-600 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );
};

export default LoadingSpinner;