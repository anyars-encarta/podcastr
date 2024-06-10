import { useState } from 'react';
import { Button } from './ui/button'
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader } from 'lucide-react';
import { GenerateThumbnailProps } from '@/types';

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {

  };

  return (
    <>
      <div className='generate_thumbnail'>
        <Button
          type='button'
          variant='plain'
          onClick={() => setIsAiThumbnail(true)}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        >
          Use AI to generate thumbnail
        </Button>

        <Button
          type='button'
          variant='plain'
          onClick={() => setIsAiThumbnail(false)}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        >
          Upload custom image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className='flex flex-col gap-5'>
          <div className='mt-5 flex flex-col gap-2.5'>
            <Label className='text-16 font-bold text-white-1'>
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className='input-class font-light focus-visible:ring-offset-orange-1'
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>

          <div className='w-full max-w-[200px]'>
            <Button
              className='text-16 bg-orange-1 py-4 font-bold text-white-1'
              onClick={generateImage}
            >
              {isGenerating ? (
                <>
                  Generating thumbnail
                  <Loader size={20} className='ml-2 animate-spin' />
                </>
              ) : (
                'Generate Thumbnail'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          Something here
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail