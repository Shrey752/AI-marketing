import { Request, Response } from 'express';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import OpenAI from 'openai';

const db = getFirestore();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leadsSnapshot = await db.collection('leads').get();
    const leads = leadsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const leadData = {
      ...req.body,
      createdAt: Timestamp.now(),
      lastContact: Timestamp.now(),
    };

    const docRef = await db.collection('leads').add(leadData);
    res.status(201).json({ id: docRef.id, ...leadData });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leadData = {
      ...req.body,
      updatedAt: Timestamp.now(),
    };

    await db.collection('leads').doc(id).update(leadData);
    res.json({ id, ...leadData });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection('leads').doc(id).delete();
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};

export const generateFollowUp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leadDoc = await db.collection('leads').doc(id).get();
    const lead = leadDoc.data();

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const prompt = `Generate a personalized follow-up WhatsApp message for a lead with the following details:
      Name: ${lead.name}
      Status: ${lead.status}
      Last Contact: ${lead.lastContact}
      Notes: ${lead.notes}
      
      The message should be friendly, professional, and encourage engagement.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional sales representative. Generate personalized follow-up messages that build relationships and drive engagement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const message = response.choices[0].message.content;

    // Update last contact timestamp
    await db.collection('leads').doc(id).update({
      lastContact: Timestamp.now(),
    });

    res.json({ message });
  } catch (error) {
    console.error('Error generating follow-up message:', error);
    res.status(500).json({ error: 'Failed to generate follow-up message' });
  }
}; 