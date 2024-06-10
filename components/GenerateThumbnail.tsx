import { useState } from 'react';
import { Button } from './ui/button'
import { cn } from '@/lib/utils';

const GenerateThumbnail = () => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);

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
    </>
  )
}

export default GenerateThumbnail