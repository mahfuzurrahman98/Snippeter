'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

type SearchDataProps = {
  page: number;
  limit: number;
};

const params = new URLSearchParams(location.search);

const initialSearchData: SearchDataProps = {
  page: parseInt(params.get('page') || '1', 10),
  limit: parseInt(params.get('limit') || '10', 10),
};

const Pagination = () => {
  const [searchData, setSearchData] =
    useState<SearchDataProps>(initialSearchData);
  const [totalSnippets, setTotalSnippets] = useState<number>(0);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchData((prevData) => ({
      ...prevData,
      page,
    }));
  };

  useEffect(() => {
    const fetchTotalSnippets = async () => {
      try {
        const { data } = await axios.get('/api/snippets/count');
        setTotalSnippets(data.data.noOfSnippets);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchTotalSnippets();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    params.set('page', searchData.page.toString());
    params.set('limit', searchData.limit.toString());

    router.push(`?${params.toString()}`);
  }, [searchData]);

  const totalPages = Math.ceil(totalSnippets / searchData.limit);
  const renderPagination = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <button
          key={i}
          className={`pagination-item ${
            i === searchData.page
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          } px-4 py-2 rounded-md`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return paginationItems;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-2">
      <div className="md:col-span-4">
        <div className="flex items-center gap-x-2">{renderPagination()}</div>
      </div>
      <div className="">
        <select
          name="limit"
          id="limit"
          onChange={handleChange}
          value={searchData.limit}
          className="w-full px-3 py-1 border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
