import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateAudioAction = action({
  args: { input: v.number(), voice: v.number() },
  handler: async (_, args) => {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: "Today is a wonderful day to build something people love!",
      });
      console.log(speechFile);
      const buffer = Buffer.from(await mp3.arrayBuffer());
      await fs.promises.writeFile(speechFile, buffer);
    }
    return "success";
  },
});