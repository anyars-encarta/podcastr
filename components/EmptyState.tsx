import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { EmptyStateProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const EmptyState = ({
    title, search, buttonLink, buttonText
}: EmptyStateProps) => {
    const router = useRouter();

    return (
        <section className='flex-center size-full flex-col gap-3'>
            <Image src='/icons/emptyState.svg' width={250} height={250} alt='empty state' />

            <div className='flex-center w-full max-w-[254px] flex-col gap-3'>
                <h1 className='text-16 text-center font-medium text-white-1'>
                    {title}
                </h1>
            </div>

            {search && (
                <p className='text-16 text-center font-medium text-white-2'>
                    Try adjusting your search to find what you are looking for
                </p>
            )}

            {buttonLink && (
                <Button className='bg-orange-1 '>
                    <Link href={buttonLink} className='gap-1'>
                        <Image src='/icons/discover.svg' width={20} height={20} alt='discover' />
                    </Link>

                    <h1 className='text-16 font-extrabold text-white-1'>{buttonText}</h1>
                </Button>
            )}
        </section>
    )
}

export default EmptyState