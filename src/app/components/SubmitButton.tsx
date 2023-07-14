'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${
        pending ? 'bg-gray-700' : 'bg-black '
      }`}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center">
          <img src="/loading.gif" alt="Loading" className="w-5 h-5 mr-2" />
          Creating...
        </div>
      ) : (
        'Create'
      )}
    </button>
  );
};

export default SubmitButton;
