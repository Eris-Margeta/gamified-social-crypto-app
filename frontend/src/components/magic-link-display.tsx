import { useState, useEffect } from 'react';
import { useFetchUserData } from '@/hooks/use-fetch-user-data';

export const MagicLinkDisplay = () => {
  const { userData, isLoading, error } = useFetchUserData();
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleCopyClick = () => {
    if (userData?.magicLink) {
      navigator.clipboard.writeText(userData.magicLink).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Reset copy success message after 2 seconds
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow space-x-4 bg-white/30 backdrop-blur-lg rgb-glow">
      <div className="flex-1 min-w-0">
        <p className="text-blue-500  font-semibold truncate">Your Magic Link:</p>
        <p className="text-blue-400 truncate">{userData.magicLink}</p>
        <p className="text-blue-500 text-sm font-semibold pt-6">Airdrop to ALL magic link users 3 weeks after mint! Share it and earn $MIDNIGHT</p>
      </div>
      <button
        onClick={handleCopyClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Copy
      </button>
      {copySuccess && <span className="text-green-500">{copySuccess}</span>}
    </div>
  );
};


