const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-indigo-500`}
        />
        <div 
          className={`${sizeClasses[size]} absolute top-0 left-0 animate-spin rounded-full border-2 border-gray-200 border-t-transparent`}
          style={{ animationDirection: 'reverse' }}
        />
      </div>
      {text && (
        <p className={`${textSizes[size]} text-gray-600 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
