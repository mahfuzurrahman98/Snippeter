'use client';

import { useRouter } from 'next/navigation';

// import { useState } from 'react';

type Props = {};

const Search = (props: Props) => {
  // const [searchData, setSearchData] = useState('');
  const router = useRouter();
  const handleInput = (e: any) => {
    // setSearchData(e.target.value);
    const encoded = encodeURIComponent(e.target.value);
    console.log(encoded);
    router.push(`/?q=${encoded}`);
  };
  return (
    <div>
      <input
        type="text"
        className="border-green-600 border-2"
        onChange={handleInput}
      />
    </div>
  );
};

export default Search;
