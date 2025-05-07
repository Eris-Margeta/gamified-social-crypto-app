// components/AlertComponent.tsx
export const AlertComponent = ({ message, onClose }: { message: string; onClose: () => void }) => {
    if (!message) return null;
  
    return (
      <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-500 text-white">
        {message}
        <button onClick={onClose} className="ml-4">
          Close
        </button>
      </div>
    );
  };
  