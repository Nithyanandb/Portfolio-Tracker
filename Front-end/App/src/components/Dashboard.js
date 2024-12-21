import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        usernameOrEmail: username,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} className="mx-auto mt-5">
          {registerMode ? (
            <h2>Register</h2>
          ) : (
            <h2>Login</h2>
          )}
          <form>
            {registerMode && (
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <TextField
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {registerMode ? (
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            )}
            {registerMode ? (
              <p>
                Already have an account?{' '}
                <span onClick={() => setRegisterMode(false)}>Login</span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span onClick={() => setRegisterMode(true)}>Register</span>
              </p>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;