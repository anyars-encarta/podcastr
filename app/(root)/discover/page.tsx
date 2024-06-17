'use client'

import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Discover = () => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: '' });

  return (
    <div className='flex flex-col gap-9'>
      Searchbar...

      <div className='flex flex-col gap-9'>
        <h1 className='text-20 font-bold text-white-1'>Discover</h1>

        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className='podcast_grid'>
                {podcastsData?.map(({ _id, imgURL, podcastTitle, podcastDescription}) => (
                  <PodcastCard
                    key={_id}
                    imgURL={imgURL!}
                    title={podcastTitle}
                    description={podcastDescription}
                    podcastId={_id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title='No results found' />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  )
}

export default Discover