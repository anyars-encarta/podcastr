'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { trendingPodcasts } from '@/constants/index'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import LoaderSpinner from '@/components/LoaderSpinner'

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
    const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })

    const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId })

    if (!similarPodcasts || !podcast) {
        return <LoaderSpinner />
    }

    return (
        <section className='flex w-full flex-col'>
            <header className='mt-9 flex items-center justify-between'>
                <h1 className='text-20 font-bold text-white-1'>
                    Currently playing
                </h1>

                <figure className='flex gap-3'>
                    <Image src='/icons/headphone.svg' width={24} height={24} alt='headphone' />

                    {/* <h2 className='text-16 font-bold text-white-1'>{trendingPodcasts[0].views}</h2> */}
                    <h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
                </figure>
            </header>

            <PodcastDetailPlayer />

            <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>
                {podcast?.podcastDescription}
            </p>

            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
                    <p className='text-16 font-medium text-white-2'>{podcast?.voicePrompt}</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
                    <p className='text-16 font-medium text-white-2'>{podcast?.imgPrompt}</p>
                </div>
            </div>

            <section className='mt-8 flex flex-col gap-5'>
                <h1 className='text-20 font-bold text-white-1'>Similar Podcasts</h1>


            </section>
        </section>
    )
}

export default PodcastDetails