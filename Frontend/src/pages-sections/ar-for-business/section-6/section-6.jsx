"use client"

/**
 * Section6 Component
 *
 * This component displays a promotional section highlighting the ability to generate 3D models
 * of retail products. It includes a header, subheader, and a call-to-action button styled
 * with a gradient background.
 *
 * Features:
 * - Visually engaging typography styled with custom fonts and colors.
 * - A "Beta Access" button with an icon and gradient styling.
 * - Uses styled-components for custom layout and design consistency.
 * 
 * @returns {JSX.Element} The Section6 promotional component.
 */

import React, { useState } from "react";
import LazyImage from "../../../components/LazyImage"; // Lazy-loaded image component.
import { RootStyle } from "./styles"; // Custom styled-component for layout.
import { Box, Container, Typography, Button, TextField } from '@mui/material'; // MUI components.

export default function Section6() {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleBetaAccessClick = () => {
    setShowInput(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          setShowInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Container sx={{ pb: 10 }}>
      <RootStyle>
        <Box sx={{ p: 5 }}>
          {/* Main Header */}
          <Typography
            sx={{
              fontSize: '36px',
              fontFamily: 'Elemental End',
              textTransform: 'lowercase',
              color: '#fff',
            }}
          >
            generate 3d models<br /> of any retail product
          </Typography>

          {/* Subheader */}
          <Typography
            sx={{
              fontFamily: 'Helvetica',
              fontSize: 18,
              marginBottom: "1rem",
              color: '#fff',
            }}
          >
            Customize your customer experience today
          </Typography>

          {/* Call-to-Action Button */}
          {!showInput && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBetaAccessClick}
              sx={{
                gap: 2,
                color: '#fff',
                borderRadius: '50px',
                py: 2,
                px: 4,
                background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
              }}
            >
              {/* Button Text */}
              <Typography
                sx={{
                  fontFamily: 'Elemental End',
                  textTransform: 'lowercase',
                  fontSize: 12,
                }}
              >
                Beta Access
              </Typography>

              {/* Icon inside the Button */}
              <Box
                sx={{
                  width: '35px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LazyImage
                  alt="furniture shop"
                  width={25}
                  height={25}
                  src="/assets/images/sparkler.png"
                />
              </Box>
            </Button>
          )}

          {showInput && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "2rem",
                  width: "100%",
                  maxWidth: "400px",
                  position: "relative",
                  animation: "fadeIn 0.5s ease-in-out",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(-20px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder={
                    isSubmitted ? "Successfully subscribed!" : "Enter your email"
                  }
                  value={email}
                  onChange={handleEmailChange}
                  error={!!error}
                  // helperText={error}
                  sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    background:
                      "linear-gradient(90.77deg, #474747 0%, #1D1D1D 63%)",
                    borderRadius: "50px",
                    paddingRight: "70px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    input: {
                      color: "#fff",
                      padding: "20px 30px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleEmailSubmit}
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: isSubmitted
                      ? "#fff"
                      : "linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "50px",
                    color: isSubmitted ? "#000" : "#fff",
                    padding: "6px 12px",
                    fontFamily: "Elemental End",
                    textTransform: "lowercase",
                    "&:hover": {
                      background: isSubmitted
                        ? "#f0f0f0"
                        : "linear-gradient(97.04deg, #888888 0%, #2D2D2D 100%)",
                    },
                  }}
                >
                  {isSubmitted ? "✔️" : "Submit"}
                </Button>
              </Box>
              <Typography sx={{ py:1, px:3, color:'red' }}>
                {error}
              </Typography>
            </>
            
          )}
        </Box>
      </RootStyle>
    </Container>
  );
}
