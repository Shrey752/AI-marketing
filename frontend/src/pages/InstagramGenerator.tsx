import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';

interface GeneratedContent {
  caption: string;
  hashtags: string[];
  imageUrl?: string;
}

const InstagramGenerator = () => {
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/instagram/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessType }),
      });
      const data = await response.json();
      setGeneratedContent(data);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Instagram Post Generator
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Business Type"
            placeholder="e.g., Fashion Store, Restaurant, Coffee Shop"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading || !businessType}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Content'}
          </Button>
        </Box>
      </Paper>

      {generatedContent && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Content
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Caption:
            </Typography>
            <Typography>{generatedContent.caption}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Hashtags:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {generatedContent.hashtags.map((hashtag, index) => (
                <Chip
                  key={index}
                  label={hashtag}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          {generatedContent.imageUrl && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                href={generatedContent.imageUrl}
                target="_blank"
              >
                View Generated Image
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default InstagramGenerator; 