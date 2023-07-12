'use client';

import toast, { Toaster } from 'react-hot-toast';

const ShareButton = ({ shareLink }: { shareLink: string }) => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />

      <button
        className="rounded-md py-1 bg-white flex gap-x-1 items-center px-1"
        onClick={() => {
          navigator.clipboard.writeText(
            'https://snippeter.vercel.app/' + shareLink
          );
          toast.success('Share link copied to clipboard!');
        }}
      >
        <img src="/share.svg" alt="copy" width={20} className="text-white" />
      </button>
    </>
  );
};

export default ShareButton;
