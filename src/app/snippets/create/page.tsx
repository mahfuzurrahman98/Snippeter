'use client';

import languages from '@configs/languages';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

const CreateSnippet = () => {
  const expirationOptions = Array.from({ length: 18 }, (_, index) => ({
    value: `${index + 1}`,
    label: `${index + 1} day${index !== 0 ? 's' : ''}`,
  }));

  const themes = [
    { name: 'Default', alias: 'default' },
    { name: 'Dark', alias: 'dark' },
    { name: 'Cobalt', alias: 'cobalt' },
  ];

  const [formData, setFormData] = useState({
    title: '',
    language: '',
    expiry: '',
    theme: '',
    sourceCode: '',
    owner: '',
  });

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

    console.log(formData);

    const response = await axios.post('/api/snippets', formData);
  };

  return (
    <div className="container mx-auto py-10 px-3">
      <h1 className="text-3xl font-bold mb-6">Create a Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="language" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select a language</option>
            {languages.map((lang, index) => (
              <option key={index} value={lang.ext}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="theme" className="block mb-1 font-semibold">
            Theme
          </label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select a theme</option>
            {themes.map((theme, index) => (
              <option key={index} value={theme.alias}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="expiry" className="block mb-1 font-semibold">
            Expiry
          </label>
          <select
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select an expiry</option>
            {expirationOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
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
            value={formData.owner}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="sourceCode" className="block mb-1 font-semibold">
            Source Code
          </label>
          <textarea
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            rows={8}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Create Snippet
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
