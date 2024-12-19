import React from 'react';
import d from './372878.jpg';
import { 
  Button, 
  Typography, 
  Grid, 
  Container, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';

import { Line } from 'react-chartjs-2';

const Home = () => {
  return (
    <div className="home-container">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: '#333', 
                textAlign: 'center', 
                marginBottom: '2rem' 
              }}
            >
              Welcome to Portfolio Tracker
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia 
                component="img" 
                height="150" 
                image={d}
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Track your investments and stay on top of the market
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    padding: '1rem 2rem' 
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#333', 
                textAlign: 'center', 
                marginBottom: '2rem' 
              }}
            >
              Features
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Track Your Investments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Monitor your portfolio's performance in real-time
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Stay Informed
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get market news and updates to help you make informed decisions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Secure and Reliable
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our platform is built with security and reliability in mind
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;