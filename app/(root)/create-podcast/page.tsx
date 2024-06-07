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

// Define a schema for the form.
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const CreatePodcast = () => {
  const [voiceType, setVoiceType] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
                    <Input className='input-class focus-visible:ring-orange-1' placeholder="Encarta Podcast" {...field} />
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
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1')}>
                  <SelectValue placeholder="Select AI Voice" className='placeholder:text-gray-1' />
                </SelectTrigger>
                <SelectContent className='text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1'>
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
                    <TextArea className='input-class focus-visible:ring-orange-1' placeholder="Encarta Podcast" {...field} />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />
          </div>

          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast;
