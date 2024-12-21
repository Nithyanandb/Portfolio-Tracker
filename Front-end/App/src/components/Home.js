import React, { useState } from "react";
import d from "../static/img.jpg";
import {
  Button,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Home.css"; 

const Home = () => {
  const [open, setOpen] = useState(true); 

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home-container">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Investment Tracker
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 400 }}>
              <CardMedia component="img" height="180" image={d} alt="Investment" />
              <div className="home-card-content">
                <Typography variant="h5" component="div">
                  Track your investments and stay on top of the market
                </Typography>
                <Button variant="contained" color="primary">Get Started</Button>
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

      {/* Cookie Consent Banner */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          maxWidth: "100%",
          margin: "0",
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#f5f5f5", padding: "16px", textAlign: "center" }}>
          We use cookies
        </DialogTitle>
        <DialogContent sx={{ padding: "16px" }}>
          <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
            We use cookies to enhance your experience. By continuing to use our website, you agree to our use of cookies.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "16px", justifyContent: "center" }}>
          <Button onClick={handleClose} color="primary" variant="contained" sx={{ borderRadius: "20px" }}>
            I Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
