import { GeneratePodcastProps } from '@/types'
import React from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const GeneratePodcast = ({ setAudioStorageId, setAudio, voiceType, audio, voicePrompt, setVoicePrompt, setAudioDuration
}: GeneratePodcastProps
) => {
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
        </div>
    )
}

export default GeneratePodcast