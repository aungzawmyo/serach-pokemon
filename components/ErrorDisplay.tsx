interface ErrorDisplayProps {
  message: string;
  onGoBack: () => void;
  onGoHome: () => void;
}

export default function ErrorDisplay({ message, onGoBack, onGoHome }: ErrorDisplayProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="text-xl text-red-600 mb-4">Error: {message}</div>
        <div className="flex gap-4">
          <button
            onClick={onGoBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             Go Back
          </button>
          <button
            onClick={onGoHome}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             Home
          </button>
        </div>
      </div>
    </div>
  );
}