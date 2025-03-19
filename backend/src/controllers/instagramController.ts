import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { businessType } = req.body;

    // Generate caption using GPT-4
    const captionResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional social media marketing expert. Generate engaging Instagram captions with relevant hashtags."
        },
        {
          role: "user",
          content: `Generate an engaging Instagram caption with relevant hashtags for a ${businessType}. Include a mix of popular and niche hashtags.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const caption = captionResponse.choices[0].message.content;

    // Generate image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a professional, visually appealing image for a ${businessType} Instagram post. The image should be modern, well-lit, and suitable for social media.`,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url;

    // Extract hashtags from the caption
    const hashtags = caption
      ?.match(/#[\w]+/g)
      ?.map(tag => tag.slice(1)) || [];

    res.json({
      caption,
      hashtags,
      imageUrl,
    });
  } catch (error) {
    console.error('Error generating Instagram content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}; 