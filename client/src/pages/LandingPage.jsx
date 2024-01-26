import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { Element } from 'react-scroll';
import axios from 'axios';
import logoImage from '../assets/logo-black.png';

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/send_email', {
        email: email,
        message: message,
      });

      if (response.status === 200) {
        console.log(response.data);
        setEmail('');
        setMessage('');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = 1 - scrollPosition / 300;

  return (
    <Element name="landingPage">
      <Container style={{ opacity, textAlign: 'center' }}>
        <img
          src={logoImage}
          alt="Logo"
          style={{ maxWidth: '300px', marginBottom: '20px', display: 'block', margin: '0 auto' }}
        />
        <Typography variant="h2">Welcome to RunClub</Typography>
        <Typography variant="subtitle1">
          Come and join the community. Click <a href="https://example.com">here</a> to join.
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <Typography variant="body1">Send us your inquiries or messages:</Typography>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px', // Increase the gap for more spacing
              marginTop: '15px', // Increase the marginTop for more spacing
              maxWidth: '300px',
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              type="email"
              variant="outlined"
              label="Your Email"
              size="small"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              multiline
              rows={4}
              variant="outlined"
              label="Your Message"
              value={message}
              onChange={handleMessageChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="https://www.zippy-reg.com/online_reg/confirmed_entrants.php?event=1952"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '15px' }} // Adjust marginTop for spacing
          >
            Race Registration
          </Button>
        </div>
      </Container>
    </Element>
  );
};

export default LandingPage;
