import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';

interface MessageTemplate {
  id: string;
  name: string;
  description: string;
}

const messageTemplates: MessageTemplate[] = [
  { id: 'promotion', name: 'Promotional Offer', description: 'Announce special discounts or deals' },
  { id: 'event', name: 'Event Announcement', description: 'Inform about upcoming events or launches' },
  { id: 'followup', name: 'Follow-up Message', description: 'Follow up with potential customers' },
];

const WhatsAppAutomation = () => {
  const [template, setTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/whatsapp/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template, customMessage }),
      });
      const data = await response.json();
      setCustomMessage(data.message);
    } catch (error) {
      setError('Failed to generate message');
      console.error('Error generating message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/whatsapp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: customMessage,
          phoneNumbers: phoneNumbers.split('\n').filter(num => num.trim()),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send messages');
      }
      
      setSuccess(true);
      setCustomMessage('');
      setPhoneNumbers('');
    } catch (error) {
      setError('Failed to send messages');
      console.error('Error sending messages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        WhatsApp Message Automation
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Message Template</InputLabel>
          <Select
            value={template}
            label="Message Template"
            onChange={(e) => setTemplate(e.target.value)}
          >
            {messageTemplates.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Custom Message"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          onClick={handleGenerateMessage}
          disabled={loading || !template}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Message'}
        </Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Send Messages
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Phone Numbers (one per line)"
          value={phoneNumbers}
          onChange={(e) => setPhoneNumbers(e.target.value)}
          margin="normal"
          helperText="Enter phone numbers with country code (e.g., +1234567890)"
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Messages sent successfully!
          </Alert>
        )}

        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          onClick={handleSendMessages}
          disabled={loading || !customMessage || !phoneNumbers}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Send Messages'}
        </Button>
      </Paper>
    </Container>
  );
};

export default WhatsAppAutomation; 