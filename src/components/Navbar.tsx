import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react';
import SearchBar from './SearchBar';


const Navbar = () => {
    return (
        <header className='py-8 w-full max-w-[80%] mx-auto'>
            <nav className='flex justify-between items-center px-4'>
                {/* logo  */}
                <Link href={"/"}>
                    <span className='font-orbiton bg-foreground p-4 rounded-sm'>
                        <span className='text-white font-bold text-xl'>Task Tracker</span>
                    </span>
                </Link>

                {/* right  */}
                <div className='flex items-center gap-10'>
                    <SearchBar />

                    <Link href={"/admin"} className="rounded-md bg-foreground p-1">
                        <Plus size={32} className='text-white' />
                    </Link>
                </div>

            </nav>
        </header>
    )
}

export default Navbar