'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AppBar, Toolbar, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { AdService } from '../ads/adService';

interface AdMetrics {
  companyName: string;
  adName: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

const StyledPaper = styled(Paper)({
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
});

const CompanyBox = styled(Paper)(({ selected }: { selected?: boolean }) => ({
  padding: '2rem',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: selected ? '#e3f2fd' : 'white',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  transition: 'background-color 0.3s ease',
}));

const FixedAppBar = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
});

export default function Metrics() {
  const [metrics, setMetrics] = useState<AdMetrics[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const adService = new AdService();

  const companies = ['Pfizer', 'Genentech', 'GSK', 'Eli Lilly'];

  useEffect(() => {
    const fetchMetrics = () => {
      const adMetrics = adService.getMetrics();
      const formattedMetrics = adMetrics
        .filter(metric => !selectedCompany || metric.companyName === selectedCompany)
        .map(metric => ({
          ...metric,
          ctr: (metric.clicks / metric.impressions) * 100 || 0
        }));
      setMetrics(formattedMetrics);
    };

    fetchMetrics();
    // Refresh metrics every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [selectedCompany]);

  return (
    <>
      <FixedAppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}>
              Ad Metrics Dashboard
            </Typography>
          </Toolbar>
        </Container>
      </FixedAppBar>

      <Container maxWidth="md" style={{ marginTop: '120px', fontFamily: 'Roboto, sans-serif' }}>
        {!selectedCompany ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Select a Company
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {companies.map((company) => (
                <Grid item xs={12} sm={6} key={company}>
                  <CompanyBox 
                    elevation={3}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <Typography variant="h6">{company}</Typography>
                  </CompanyBox>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">
                {selectedCompany} Metrics
              </Typography>
              <CompanyBox
                onClick={() => setSelectedCompany(null)}
                sx={{ padding: '0.5rem 1rem !important' }}
              >
                <Typography>Change Company</Typography>
              </CompanyBox>
            </Box>
            <StyledPaper elevation={3}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Ad Name</strong></TableCell>
                      <TableCell align="right"><strong>Impressions</strong></TableCell>
                      <TableCell align="right"><strong>Clicks</strong></TableCell>
                      <TableCell align="right"><strong>CTR (%)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.adName}</TableCell>
                        <TableCell align="right">{row.impressions}</TableCell>
                        <TableCell align="right">{row.clicks}</TableCell>
                        <TableCell align="right">{row.ctr.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </>
        )}
      </Container>
    </>
  );
} 