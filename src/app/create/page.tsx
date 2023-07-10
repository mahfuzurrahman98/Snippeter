'use client';
import languages from '@lib/data/languages';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  title: string;
  language: string;
  sourceCode: string;
  owner: string;
  _tags: string;
  tags: string[];
}

const initialFormData: FormData = {
  title: '',
  language: '',
  sourceCode: '',
  owner: '',
  _tags: '',
  tags: [],
};

const CreateSnippet = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonDisabled(true);

    if (formData.title === '') {
      toast.error('Please enter a title!');
      setButtonDisabled(false);
      return;
    }
    if (formData.language === '') {
      toast.error('Please select a language!');
      setButtonDisabled(false);
      return;
    }
    if (formData.sourceCode === '') {
      toast.error('Please enter source code!');
      setButtonDisabled(false);
      return;
    }
    if (formData.owner === '') {
      toast.error('Please enter your name!');
      setButtonDisabled(false);
      return;
    }

    let tagsArray = formData._tags.split(',').map((tag) => tag.trim());
    tagsArray = tagsArray.filter((tag) => tag !== '');

    setFormData((prevData) => ({
      ...prevData,
      tags: tagsArray,
    }));

    try {
      const response = await axios.post('/api/snippets', formData);
      toast.success(response.data.message);
      const snippet = response.data.data.snippet;

      router.push(`/${snippet.uuid}`);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="mx-auto py-7 px-5 max-w-3xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Create a Snippet</h1>
        <Link
          className="px-3 py-1 text-white rounded bg-black hover:bg-gray-600"
          href="/"
        >
          {'Back'}
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

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="language" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
          >
            <option value="" selected>
              Select a language
            </option>
            {languages.map((lang, index) => (
              <option key={index} value={lang.ext}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="owner" className="block mb-1 font-semibold">
            Owner Name
          </label>
          <input
            type="text"
            name="owner"
            id="owner"
            placeholder="Enter your name"
            value={formData.owner}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="sourceCode" className="block mb-1 font-semibold">
            Source Code
          </label>
          <textarea
            name="sourceCode"
            id="sourceCode"
            placeholder="Enter source code"
            value={formData.sourceCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
            rows={8}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="_tags" className="block mb-1 font-semibold">
            Tags (comma-separated)
            <span className="ml-1 font-normal text-gray-500">optional</span>
          </label>
          <input
            type="text"
            name="_tags"
            id="_tags"
            placeholder="ex: javascript, react, nodejs"
            value={formData._tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${
            buttonDisabled ? 'bg-gray-700' : 'bg-black '
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? (
            <div className="flex items-center">
              <img src="/loading.gif" alt="Loading" className="w-5 h-5 mr-2" />
              Creating...
            </div>
          ) : (
            'Create'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
