"use client";

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, useTheme, TextField, Snackbar, Alert } from '@mui/material';
import BlobBox from './blobBox';
import { section1Styles } from './styles';
import LazyImage from '@/components/LazyImage';
import { useRouter } from 'next/navigation';

export default function Section1() {
  const theme = useTheme();
  const styles = section1Styles(theme);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const emailInputRef = useRef(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(''); // Reset error on new input
  };

  const handleEmailSubmit = async () => {
    setError(""); // Reset error state before validation
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setEmail(""); // Clear the input field
        setTimeout(() => {
          setIsSubmitted(false);
          setShowEmailInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
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
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', py:{ xs:10, sm:30 } }}>
      {/* Content Section */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Headline */}
        <Typography sx={{ fontFamily: 'Elemental End', color: '#fff', fontSize: { xs: 20, sm: 35, md: 60 } }}>
          Shaping  the  future  of<br /> accessible  ar  Commerce
        </Typography>

        {/* Promotional Offer */}
        <Typography sx={{  marginBottom: '2rem', color: '#fff', fontFamily: 'Helvetica', fontSize: { xs: 10, sm: 14, md: 16 }, maxWidth:{ xs: '360px', sm: '1000px', md: '1500px' } }}>
          Empowering Inclusion, Sustainability, and Innovation through Augmented Reality + Artificial Intelligence
        </Typography>

        {/* Button group */}
        <Box sx={styles.buttonGroup}>
          <Button sx={styles.filledButton} onClick={() => router.push('/register-partner')}>
            Get Involved
          </Button>
        </Box>

        {/* Email Input with Animation */}
        {showEmailInput && (
          <>
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
                placeholder={isSubmitted ? 'Successfully subscribed!' : 'Enter your email'}
                value={email}
                onChange={handleEmailChange}
                error={!!error}
                // helperText={error || ''}
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
                  background: isSubmitted
                    ? '#fff'
                    : 'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
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
            <Typography sx={{ py:1, px:1, color:'red' }}>
              {error}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}