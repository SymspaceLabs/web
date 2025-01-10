"use client"

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, useTheme, TextField, Snackbar, Alert } from '@mui/material';
import BlobBox from '../blobBox';
import { section1Styles } from './styles';
import LazyImage from '@/components/LazyImage';

export default function Section1() {
  const theme = useTheme();
  const styles = section1Styles(theme);

  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailInputRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = () => {
    setIsSubmitted(true);
    setEmail(''); // Clear the input field
     // Optionally hide the input
    setTimeout(() => {
      setIsSubmitted(false);
      setShowEmailInput(false);
    }, 3000); // Reset the button after 3 seconds
  };

  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  const handleImageClick = () => {
    handleShowEmailInput();
  };
  

  // Click outside to hide email input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailInputRef.current && !emailInputRef.current.contains(event.target)) {
        setShowEmailInput(false); // Hide email input box
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        backgroundColor: "#fff"
      }}
    >
      {/* Decorative Blob centered as background */}
      <BlobBox />

      {/* Content Section */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Headline */}
        <Typography sx={styles.title}>SYMSPACE</Typography>

        {/* Promotional Offer */}
        <Typography sx={{ fontSize: '16px', marginBottom: '2rem', color: '#fff', fontFamily: 'Helvetica' }}>
          Revolutionizing the shopping experience through Augmented Reality + Artificial Intelligence
        </Typography>

        {/* Button group */}
        <Box sx={styles.buttonGroup}>
          <Button sx={styles.filledButton}>
            Join as Business
          </Button>
          <Button
            sx={styles.outlinedButton}
            onClick={handleShowEmailInput}
          >
            Join the Waitlist
          </Button>
        </Box>

        {/* Images Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          <Box
            component="div"
            onClick={() => handleImageClick()}
            sx={{ cursor: 'pointer' }}
          >
            <LazyImage
              alt="App Store"
              width={292}
              height={195}
              src="/assets/images/app-download/app-store.png"
            />
          </Box>
          <Box
            component="div"
            onClick={() => handleImageClick()}
            sx={{ cursor: 'pointer' }}
          >
            <LazyImage
              alt="Play Store"
              width={292}
              height={195}
              src="/assets/images/app-download/play-store.png"
            />
          </Box>
        </Box>


        {/* Email Input with Animation */}
        {showEmailInput && (
          <Box
            ref={emailInputRef}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '2rem',
              width: '100%',
              maxWidth: '400px',
              position: 'relative',
              animation: 'fadeIn 0.5s ease-in-out', // Add animation
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <TextField
              variant="outlined"
              placeholder={isSubmitted ? "Email has been received!" : "Enter your email"}
              value={email}
              onChange={handleEmailChange}
              sx={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'linear-gradient(90.77deg, #474747 0%, #1D1D1D 63%)',
                borderRadius: '50px',
                paddingRight: '70px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Remove default border
                },
                input: {
                  color: '#fff', // Optional: Set text color for better contrast
                  padding: '20px 30px',
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleEmailSubmit}
              sx={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: isSubmitted ? '#fff' : 'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
                border: '1px solid #FFFFFF',
                borderRadius: '50px',
                color: isSubmitted ? '#000' : '#fff',
                padding: '6px 12px',
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                '&:hover': {
                  background: isSubmitted
                    ? '#f0f0f0'
                    : 'linear-gradient(97.04deg, #888888 0%, #2D2D2D 100%)',
                },
              }}
            >
              {isSubmitted ? '✔️' : 'Submit'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
