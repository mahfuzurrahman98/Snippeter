'use client';

import { addSnippetAction } from '@app/_actions';
import SubmitButton from '@app/components/SubmitButton';
import languages from '@lib/data/languages';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { v4 } from 'uuid';

const CreateSnippet = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    if (!formData.get('title')) {
      toast.error('Title is required!');
      return;
    }
    if (!formData.get('language')) {
      toast.error('Language is required!');
      return;
    }
    if (!formData.get('owner')) {
      toast.error('Owner name is required!');
      return;
    }
    if (!formData.get('sourceCode')) {
      toast.error('Source code is required!');
      return;
    }

    const snippetData = {
      uuid: v4() as string,
      title: formData.get('title') as string,
      language: formData.get('language') as string,
      sourceCode: formData.get('sourceCode') as string,
      owner: formData.get('owner') as string,
      tags: [] as string[],
    };

    const _tags = formData.get('_tags') as string;
    let tagsArray = _tags.split(',').map((tag: string) => tag.trim());
    tagsArray = tagsArray.filter((tag: string) => tag !== '');
    snippetData.tags = tagsArray;

    const response = await addSnippetAction(snippetData);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    const snippet = response.data?.snippet;

    toast.success('Snippet created successfully!');
    formRef.current?.reset();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push(`/${snippet?.uuid}`);
  };

  return (
    <div className="mx-auto py-7 px-5 max-w-3xl">
      <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Create a Snippet
        </h1>
        <Link
          className="px-3 py-1 text-white rounded bg-black hover:bg-gray-600"
          href="/"
        >
          Back
        </Link>
      </div>
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

      <form ref={formRef} action={action}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            name="language"
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
            defaultValue={''}
          >
            <option value="">Select a language</option>
            {languages.map((lang, index) => (
              <option key={index} value={lang.ext}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="owner" className="block mb-1 font-semibold">
            Owner Name
          </label>
          <input
            type="text"
            name="owner"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sourceCode" className="block mb-1 font-semibold">
            Source Code
          </label>
          <textarea
            name="sourceCode"
            placeholder="Enter source code"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
            rows={8}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="_tags" className="block mb-1 font-semibold">
            Tags (comma-separated)
            <span className="ml-1 font-normal text-gray-500">optional</span>
          </label>
          <input
            type="text"
            name="_tags"
            placeholder="ex: javascript, react, nodejs"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
};

export default CreateSnippet;
