"use client"

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore';
import { debounce } from 'lodash';

const SearchBar = () => {

    const [search, setSearch] = useState("");
    const setSearchTerm = useTaskStore((state) => state.setSearchTerm);

    const debouncedSearch = debounce((term: string) => {
        setSearchTerm(term);
    }, 500);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    return (
        <div className="flex justify-center">
            <div className="relative flex items-center w-full max-w-[200px]">
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    className="w-full pl-10 py-1 pr-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Search" />
                <button className="absolute left-2 rounded-full hover:bg-gray-200 transition">
                    <Search size={24} className='text-gray-700' />
                </button>
            </div>
        </div>
    )
}

export default SearchBar