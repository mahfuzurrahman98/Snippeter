'use client';
import languages from '@configs/languages';
import axios from 'axios';
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

const CreateSnippet = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    language: '',
    sourceCode: '',
    owner: '',
    _tags: '',
    tags: [],
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

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

    let tagsArray = formData._tags.split(',').map((tag) => tag.trim());
    tagsArray = tagsArray.filter((tag) => tag !== '');

    setFormData((prevData) => ({
      ...prevData,
      tags: tagsArray,
    }));

    try {
      const response = await axios.post('/api/snippets', formData);
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="mx-auto py-7 px-5 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create a Snippet</h1>
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
            required
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
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
            required
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
            required
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
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block mb-1 font-semibold">
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
          className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
          disabled={buttonDisabled}
        >
          Create Snippet
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
