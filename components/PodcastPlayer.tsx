'use client'

import { cn } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'
import React from 'react'

const PodcastPlayer = () => {
    const { audio } = useAudio();

    console.log(audio);
  return (
    <div className={cn('sticky bottom-0 left-0 flex size-full flex-col', {
        hidden: !audio?.audioURL
    })}>
        <h1 className='text-white-1 text-xl'>{audio?.title}</h1>
    </div>
  )
}

export default PodcastPlayer