"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { voiceDetails } from "@/constants/index"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"

// Define a schema for the form.
const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Podcast Titles must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2, {
    message: "Podcast Descriptions must be at least 2 characters.",
  }),
})

const CreatePodcast = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageURL, setImageURL] = useState('');

  const [audioURL, setAudioURL] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section className='mt-10 flex flex-col'>
      <h1 className='text-20 font-bold text-white-1'>Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >

          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2.5'>
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Title</FormLabel>
                  <FormControl>
                    <Input className='input-class focus-visible:ring-offset-orange-1' placeholder="Encarta Podcast" {...field} />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-2.5'>
              <Label className='text-16 font-bold text-white-1'>
                Select AI Voice
              </Label>

              <Select onValueChange={(e) => setVoiceType(e)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select AI Voice" className='placeholder:text-gray-1' />
                </SelectTrigger>
                <SelectContent className='text-16 border-none bg-black-1 font-bold text-white-1'>
                  {voiceDetails.map(({ id, name }: { id: number, name: string }) => (
                    <SelectItem
                      key={id}
                      value={name}
                      className='capitalize focus:bg-orange-1'
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className='hidden'
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2.5'>
                  <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea className='input-class focus-visible:ring-offset-orange-1' placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col pt-10'>
            <GeneratePodcast
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioURL}
            voiceType={voiceType}
            audio={audioURL}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail />

            <div className='mt-10 w-full'>
              <Button
                type="submit"
                className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1'
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className='ml-2 animate-spin' />
                  </>
                ) : (
                  'Submit & Publish Podcast'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast;
