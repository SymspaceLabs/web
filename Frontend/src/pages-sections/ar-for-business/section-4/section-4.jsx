"use client";

/**
 * Section4 Component
 *
 * This component renders a section showcasing 3D product and AR trial room features.
 * It utilizes Material-UI for styling and responsiveness. The section is divided into multiple rows,
 * each featuring a `BlogCard` component paired with a video, and incorporates styled "BlobBox" elements
 * for a dynamic visual effect.
 *
 * Key Features:
 * - Dynamic content rendering with videos and descriptive cards.
 * - Visual design enhanced with animated blob elements.
 * - Mobile-responsive typography and layout.
 */

import { useTheme } from '@mui/material';
import { Box, Container, Typography, Grid } from '@mui/material';
import { section1Styles } from './styles';
import BlogCard from './blog-card';
import BlobBox from '../blobBox';

export default function Section4() {
  const theme = useTheme();
  const styles = section1Styles(theme);

  return (
    <Box>
      <Container sx={{ position: 'relative' }}>
        {/* Animated blob elements for visual effects */}
        <BlobBox sx={{ top: '15rem', right: '65rem', backgroundColor: '#0366FE' }} />
        <BlobBox sx={{ top: '75rem', right: '20rem', backgroundColor: '#933FFE', animationDelay: '4s', opacity: 0.7 }} />
        <BlobBox sx={{ top: '120rem', right: '65rem', backgroundColor: '#0366FE' }} />
        <BlobBox sx={{ top: '170rem', right: '25rem', backgroundColor: '#933FFE', animationDelay: '4s', opacity: 0.7 }} />

        {/* Section header */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            fontSize={{ sm: 34, xs: 28 }}
            fontFamily="Elemental End"
            textTransform="lowercase"
            textAlign="center"
          >
            revolutionize Shopping
          </Typography>
          <Typography
            fontSize={{ sm: 34, xs: 28 }}
            fontFamily="Elemental End"
            textTransform="lowercase"
            textAlign="center"
          >
            3d products & ar trial room
          </Typography>
        </Box>

        {/* Render rows of content */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Box sx={styles.contentBox} key={index}>
            <Grid container spacing={4} alignItems="center">
              {/* Alternate the layout of BlogCard and video per row */}
              {index % 2 === 0 ? (
                <>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <BlogCard
                      title="Generate 3d products with visible details"
                      subTitle="Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product demand prior to manufacturing"
                      btnUrl="/"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
                    <Box sx={styles.videoContainer}>
                      <video
                        width="50%"
                        height="auto"
                        autoPlay
                        loop
                        muted
                        src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-transcode.mp4"
                        poster="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-poster-00001.jpg"
                        style={{ position: 'relative', zIndex: 2 }}
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
                    <Box sx={styles.videoContainer}>
                      <video
                        width="50%"
                        height="auto"
                        autoPlay
                        loop
                        muted
                        src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-transcode.mp4"
                        poster="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-poster-00001.jpg"
                        style={{ position: 'relative', zIndex: 2 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <BlogCard
                      title="Generate 3d products with visible details"
                      subTitle="Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product demand prior to manufacturing"
                      btnUrl="/"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
}