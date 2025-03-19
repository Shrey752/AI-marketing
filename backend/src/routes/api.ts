import express from 'express';
import { generateContent } from '../controllers/instagramController';
import { generateMessage, sendMessages } from '../controllers/whatsappController';
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  generateFollowUp,
} from '../controllers/leadController';

const router = express.Router();

// Instagram routes
router.post('/instagram/generate', generateContent);

// WhatsApp routes
router.post('/whatsapp/generate', generateMessage);
router.post('/whatsapp/send', sendMessages);

// Lead management routes
router.get('/leads', getLeads);
router.post('/leads', createLead);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);
router.post('/leads/:id/followup', generateFollowUp);

export default router; 