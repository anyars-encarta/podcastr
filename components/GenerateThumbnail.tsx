import { useRef, useState } from 'react';
import { Button } from './ui/button'
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader } from 'lucide-react';
import { GenerateThumbnailProps } from '@/types';
import { Input } from './ui/input';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from 'convex/react';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { api } from '@/convex/_generated/api';

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage('');

    try {
      const file = new File([blob], fileName, { type: 'image/png' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId

      setImageStorageId(storageId);

      const getImageUrl = useMutation(api.podcasts.getUrl);

      const imageUrl = await getImageUrl({ storageId })
      setImage(imageUrl!);
      setIsImageLoading(false);

      toast({ title: "Thumbnail generated susscessfully." })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Error generating thumbnail',
        variant: 'destructive'
      })
    }
  }

  const generateImage = async () => { };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if(!files) return;

      const file = files[0];
      const blob = await file.arrayBuffer()
      .then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (e) {
      console.log(e)
      toast({ title: 'Error uploading image', variant: 'destructive'})
    }
  }

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
              {isImageLoading ? (
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
        <div className='image_div' onClick={() => imageRef?.current?.click()}>
          <Input
            type='file'
            className='hidden'
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />

          {!isImageLoading ? (
            <Image src='/icons/upload-image.svg' width={40} height={40} alt='upload' />
          ) : (
            <div className='text-16 flex-center font-medium text-white-1 gap-2'>
              Uploading
              <Loader size={20} className='animate-spin' />
            </div>
          )}

          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-12 font-bold text-orange-1'>
              Click to upload
            </h2>
            <p className='text-12 font-normal text-gray-1'>
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}

      {image && (
        <div className='flex-center w-full'>
          <Image
            src={image}
            width={200}
            height={200}
            className='mt-5'
            alt='Thumbnail'
          />
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail