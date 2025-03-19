import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Instagram Post Generator',
      description: 'Generate engaging Instagram captions and hashtags using AI',
      icon: <InstagramIcon sx={{ fontSize: 40 }} />,
      path: '/instagram',
    },
    {
      title: 'WhatsApp Automation',
      description: 'Send bulk WhatsApp messages to your customers',
      icon: <WhatsAppIcon sx={{ fontSize: 40 }} />,
      path: '/whatsapp',
    },
    {
      title: 'Lead Management',
      description: 'Track and manage your customer leads',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/leads',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Marketing Automation Dashboard
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography>{feature.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 