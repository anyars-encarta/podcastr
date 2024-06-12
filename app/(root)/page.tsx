"use client";

import React from 'react';
import PodcastCard from '@/components/PodcastCard';
import { trendingPodcasts } from '@/constants';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
  // const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <div className='mt-9 flex fle-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>

        <div className='podcast_grid'>
          {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imgURL, views }) => (
            <PodcastCard
              key={_id}
              imgURL={imgURL}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
              views={views}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home