import { Request, Response } from 'express';
import OpenAI from 'openai';
import twilio from 'twilio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const generateMessage = async (req: Request, res: Response) => {
  try {
    const { template, customMessage } = req.body;

    const prompt = customMessage || `Generate a professional WhatsApp message for a ${template} template. The message should be engaging, concise, and include a clear call to action.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional marketing copywriter. Generate engaging WhatsApp messages that drive action."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating WhatsApp message:', error);
    res.status(500).json({ error: 'Failed to generate message' });
  }
};

export const sendMessages = async (req: Request, res: Response) => {
  try {
    const { message, phoneNumbers } = req.body;

    const results = await Promise.all(
      phoneNumbers.map(async (phoneNumber: string) => {
        try {
          await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${phoneNumber}`,
          });
          return { phoneNumber, status: 'success' };
        } catch (error) {
          console.error(`Error sending message to ${phoneNumber}:`, error);
          return { phoneNumber, status: 'failed', error: error.message };
        }
      })
    );

    const successCount = results.filter(r => r.status === 'success').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    res.json({
      success: true,
      results,
      summary: {
        total: phoneNumbers.length,
        success: successCount,
        failed: failureCount,
      },
    });
  } catch (error) {
    console.error('Error sending WhatsApp messages:', error);
    res.status(500).json({ error: 'Failed to send messages' });
  }
}; 