import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const GeneratePodcast = ({ setAudioStorageId, setAudio, voiceType, audio, voicePrompt, setVoicePrompt, setAudioDuration
}: GeneratePodcastProps
) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    value={voicePrompt}
                    onChange={(e) => setVoicePrompt(e.target.value)}
                />
            </div>

            <div className='mt-5 w-full max-w-[200px]'>
            <Button
                className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1'
              >
                {isSubmitting ? (
                  <>
                    Generating podcast
                    <Loader size={20} className='ml-2 animate-spin' />
                  </>
                ) : (
                  'Generate Podcast'
                )}
              </Button>
            </div>
        </div>
    )
}

export default GeneratePodcast