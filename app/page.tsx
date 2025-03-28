'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, List, CircularProgress, LinearProgress, Box, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { AdService } from './ads/adService';
import { PfizerAd } from './ads/pharmaCompanies/pfizerAds';
import { GenentechAd } from './ads/pharmaCompanies/genentechAds';
import { GskAd } from './ads/pharmaCompanies/gskAds';
import { EliLillyAd } from './ads/pharmaCompanies/eliLillyAds';
import Image from 'next/image';

interface HistoryItem {
  role: string;
  content: string;
}

const StyledPaper = styled(Paper)({
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  fontFamily: 'Open Sans, sans-serif',
});

const StyledButton = styled(Button)({
  height: '56px', // to match TextField height
});

const FixedAppBar = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
});

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [adContent, setAdContent] = useState<PfizerAd | GenentechAd | GskAd | EliLillyAd | null>(null);
  const adService = new AdService();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    scrollToBottom();

    try {
      // Fetch ad rec
      const categoryResponse = await axios.post('/api/categorize', { 
        question,
      });
      const category = categoryResponse.data.category;
      console.log("category: ", category)
      
      // Get relevant ad using AdService
      const ad = adService.getAd(category);
      
      if (ad) {
        adService.trackImpression(ad)
        setAdContent(ad);
      }

      // Fetch main answer and reset vars
      const response = await axios.post('/api/ask', { question, history });

      setHistory([...history, { role: 'user', content: question }, { role: 'assistant', content: response.data.answer }]);
      setAnswer(response.data.answer);
      setQuestion('');
      setAdContent(null);
    } catch (error) {
      console.error('Error fetching the answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    setHistory([]);
    setAnswer('');
    setQuestion('');
    scrollToBottom();
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading, history]);

  return (
    <>
      <FixedAppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}>
              Simple Ask
            </Typography>
            <Button color="inherit" onClick={handleNewConversation}>New Conversation</Button>
          </Toolbar>
        </Container>
      </FixedAppBar>

      <Container maxWidth="md" style={{ marginTop: '120px', fontFamily: 'Roboto, sans-serif', marginBottom: '250px' }}>
        {history.length > 0 && (
          <List>
            {history.map((item, index) => (
              <StyledPaper elevation={3} key={index}>
                <Typography variant="body1" component="div">
                  <strong>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}:</strong>
                </Typography>
                <Box component="div" dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br />') }} />
              </StyledPaper>
            ))}
          </List>
        )}
        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <TextField
              label="Ask a question"
              variant="outlined"
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}  // Disable input while loading
            />
            <StyledButton type="submit" variant="contained" color="primary" disabled={loading}>
              Ask
            </StyledButton>
          </form>
        </StyledPaper>
        {loading && (
          <Box sx={{ width: '95%', margin: '0 auto', display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        )}
        {loading && adContent && (
          <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center">
              <a href={adContent.link} target="_blank" rel="noopener noreferrer">
                <Image 
                  src={adContent.imageUrl} 
                  alt="Advertisement"
                  style={{ width: '400px', height: 'auto', cursor: 'pointer' }}
                  onLoad={scrollToBottom}
                  onClick={() => adService.trackClick(adContent)}
                />
              </a>
            </Box>
          </Container>
        )}
      </Container>
    </>
  );
}
