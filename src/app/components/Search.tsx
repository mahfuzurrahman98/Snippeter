'use client';

import languages from '@lib/data/languages';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

type SearchDataProps = {
  q: string;
  lang: string;
};

const params = new URLSearchParams(location.search);

const initialSearchData: SearchDataProps = {
  q: params.get('q') || '',
  lang: params.get('lang') || '',
};

const Search = () => {
  const [searchData, setSearchData] =
    useState<SearchDataProps>(initialSearchData);
  const router = useRouter();
  console.log(router.prefetch);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let encoded = '';
    if (searchData.q?.trim() !== '') {
      encoded += `q=${encodeURIComponent(searchData.q.trim())}`;
    }
    if (searchData.lang?.trim() !== '') {
      searchData.q.trim() !== '' ? (encoded += '&') : '';
      encoded += `lang=${encodeURIComponent(searchData.lang.trim())}`;
    }
    router.push(`/?${encoded}`);
  }, [searchData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="q" className="block mb-1 font-semibold">
            Title or tags
          </label>
          <input
            type="text"
            placeholder="Enter a title or tags"
            id="q"
            name="q"
            value={searchData.q}
            onChange={handleChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label htmlFor="lang" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            placeholder=""
            id="lang"
            name="lang"
            onChange={handleChange}
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
          >
            <option value="" selected>
              Select a language
            </option>
            {languages.map((lang, index) => (
              <option
                key={index}
                value={lang.ext}
                selected={initialSearchData.lang === lang.ext}
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Search;
