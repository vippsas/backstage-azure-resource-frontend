import { createDevApp } from '@backstage/dev-utils';
import { azureResourcesPlugin } from '../src/plugin';
import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import { CardPspGovernanceAtlasPage } from '../src/components/CardPspGovernanceAtlas';

const useHomeStyles = makeStyles((theme: Theme) => ({
  home: {
    minHeight: '100vh',
    padding: theme.spacing(4),
    background:
      'radial-gradient(circle at top left, rgba(108, 169, 255, 0.22), transparent 28%), linear-gradient(180deg, #08101c 0%, #101b2c 100%)',
    color: '#eef2ff',
  },
  shell: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  hero: {
    padding: theme.spacing(5),
    borderRadius: 28,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(10, 18, 32, 0.88)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
  },
  title: {
    fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
    lineHeight: 1,
    fontWeight: 700,
  },
  copy: {
    marginTop: theme.spacing(2),
    maxWidth: 820,
    color: 'rgba(238,242,255,0.8)',
    lineHeight: 1.75,
    fontSize: '1.03rem',
  },
  card: {
    height: '100%',
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: '#eef2ff',
  },
}));

const HomePage = () => {
  const classes = useHomeStyles();

  return (
    <Box className={classes.home}>
      <Box className={classes.shell}>
        <Box className={classes.hero}>
          <Typography variant="overline" style={{ letterSpacing: 2.4, color: '#9ecbff' }}>
            Azure resources plugin
          </Typography>
          <Typography className={classes.title} variant="h1">
            Current entity cards live here. Card PSP gets its own route.
          </Typography>
          <Typography className={classes.copy}>
            The plugin still exposes the existing Azure entity cards, while the new governance
            atlas sits on <code>/card-psp</code> as a dedicated page with its own navigation item.
          </Typography>
          <Box mt={3}>
            <Button variant="contained" color="primary" href="/card-psp">
              Open Card PSP atlas
            </Button>
          </Box>
        </Box>

        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">Existing cards</Typography>
                  <Typography color="inherit">
                    The Azure overview, security, and cost-advice cards are unchanged.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">Separate route</Typography>
                  <Typography color="inherit">
                    Card PSP stays on a dedicated route so the governance atlas can grow
                    independently.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">Navigation entry</Typography>
                  <Typography color="inherit">
                    The dev shell includes a visible sidebar entry for the new atlas page.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

createDevApp()
  .registerPlugin(azureResourcesPlugin)
  .addPage({
    path: '/',
    title: 'Home',
    element: <HomePage />,
  })
  .addPage({
    path: '/card-psp',
    title: 'Card PSP',
    element: <CardPspGovernanceAtlasPage />,
  })
  .render();
