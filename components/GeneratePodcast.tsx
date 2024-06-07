import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const useGeneratePodcast = (props: GeneratePodcastProps) => {
    // Logic for podcast generation

    return {
        isGenerating: false,
        generatePodcast: () => {}
    }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
    const {isGenerating, generatePodcast} = useGeneratePodcast(props);

    return (
        <div>
            <div className='flex flex-col gap-2.5'>
                <Label className='text-16 font-bold text-white-1'>
                    AI Prompt to generate
                </Label>
                <Textarea
                    className='input-class font-light focus-visible:ring-offset-orange-1'
                    placeholder='Provide text to generate audio'
                    rows={5}
                    value={props.voicePrompt}
                    onChange={(e) => props.setVoicePrompt(e.target.value)}
                />
            </div>

            <div className='mt-5 w-full max-w-[200px]'>
                <Button
                    className='text-16 bg-orange-1 py-4 font-bold text-white-1'
                >
                    {isGenerating ? (
                        <>
                            Generating podcast
                            <Loader size={20} className='ml-2 animate-spin' />
                        </>
                    ) : (
                        'Generate Podcast'
                    )}
                </Button>
            </div>

            {props.audio && (
                <audio
                    controls
                    src={props.audio}
                    autoPlay
                    className='mt-5'
                    onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
                />
            )}
        </div>
    )
}

export default GeneratePodcast