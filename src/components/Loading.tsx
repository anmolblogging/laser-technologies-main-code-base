const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

function Loading({ text = '' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '80px' }}
      >
        <div className="text-center">
          <div className="relative">
            <div
              className="animate-spin h-16 w-16 mx-auto mb-4"
              style={{
                border: '4px solid rgba(107,15,15,0.1)',
                borderTopColor: BRAND.primary,
                borderRadius: '50%',
              }}
            ></div>
            <div
              className="absolute inset-0 animate-ping h-16 w-16 mx-auto"
              style={{
                border: '4px solid rgba(107,15,15,0.2)',
                borderRadius: '50%',
                animationDuration: '1.5s',
              }}
            ></div>
          </div>
          <p className="text-gray-700 font-medium text-lg">Loading {text}...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
