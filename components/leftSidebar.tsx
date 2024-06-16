'use client';

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useClerk();

    return (
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6'>
                <Link href='/' className='flex cursor-pointer items-center gap-1 pb-10 max-lg: justify-center'>
                    <Image src='/icons/logo.svg' alt='logo' width={23} height={27} />
                    <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podcastr</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                    return <Link href={item.route} key={item.label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start', {
                        'bg-nav-focus border-r-4 border-orange-1': isActive
                    })}>
                        <Image src={item.imgURL} alt={item.label} width={24} height={24} />
                        <p>{item.label}</p>
                    </Link>
                })}
            </nav>

            <SignedOut>
                <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                    <Button asChild className='text-16 w-full bg-orange-1 font-extrabold'>
                        <Link href='/sign-in'>Sign In</Link>
                    </Button>
                </div>
            </SignedOut>

            <SignedIn>
                <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                    <Button
                        className='text-16 w-full bg-orange-1 font-extrabold'
                        onClick={() => signOut(() => router.push('/'))}
                    >
                        Sign Out
                    </Button>
                </div>
            </SignedIn>
        </section>
    )
}

export default LeftSidebar