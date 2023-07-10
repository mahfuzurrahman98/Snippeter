'use client';

import toast, { Toaster } from 'react-hot-toast';

const CopyButton = ({ sourceCode }: { sourceCode: string }) => {
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
        className="font-semibold rounded-md px-2 py-1 bg-white flex gap-x-1 items-center"
        onClick={() => {
          navigator.clipboard.writeText(sourceCode);
          toast.success('Copied to clipboard!');
        }}
      >
        <img
          src="/clipboard.svg"
          alt="copy"
          width={12}
          className="text-white"
        />
        <span className="text-black text-xs">Copy</span>
      </button>
    </>
  );
};

export default CopyButton;
