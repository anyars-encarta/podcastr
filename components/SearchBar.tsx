'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(search) {
            router.push(`/discover?search=${search}`)
        } else if (!search && pathName === '/discover') {
            router.push('/discover')
        }
    }, [router, pathName, search]);

    return (
        <div className='relative mt-8 block'>
            <Input
                className='input-class py-6 pl-12 focus-visible:ring-offset-orange-1'
                placeholder='Search for podcasts...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onLoad={() => setSearch('')}
            />
            <Image
                src='/icons/search.svg' alt='search' width={20} height={20}
                className='absolute left-4 top-3.5'
            />
        </div>
    )
}

export default SearchBar