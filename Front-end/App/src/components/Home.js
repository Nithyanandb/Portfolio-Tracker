import React from "react";
import d from "../static/img.jpg";
import {
  Button,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";


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
                fontSize: "3  rem",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            ></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 400 }}>
              <CardMedia component="img" height="180" image={d} />
              
              <div className="io">
               
                  Track your investments and stay on top of the market
                <Button>Get Started</Button>
              </div>
              
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "2rem",
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
                  Get market news and updates to help you make informed
                  decisions
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
