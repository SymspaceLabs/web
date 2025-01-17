"use client"

/**
 * `ProductDetailsPageView` is a React functional component that serves as the 
 * main container for displaying detailed information about a product.
 * 
 * It includes animations, product introduction, and tabs for additional details 
 * like product features, specifications, and reviews. The component also has a 
 * visually engaging background with animated blob effects.
 * 
 * Props:
 * - `product`: The product data passed to `ProductIntro` component.
 * - `frequentlyBought` (commented): Data for frequently bought products.
 * - `relatedProducts` (commented): Data for related products.
 * 
 * This component is designed with Material-UI for responsive styling.
 */

// Material-UI components
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

// Local custom components
import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
// import AvailableShops from "../available-shops";
// import RelatedProducts from "../related-products";
// import FrequentlyBought from "../frequently-bought";
// import Section5 from "../section-5";


const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

// Styled component for creating animated blob-like elements
const BlobBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '25rem',
  height: '25rem',
  borderRadius: '50%',
  filter: 'blur(20px)',
  opacity: 0.7,
  animation: `${blob} 7s infinite`,
}));



export default function ProductDetailsPageView({slug}) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [slug]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // Main container for the product details page
    <Box
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Enables positioning of blob effects
      }}
    >
      <Container className="mt-2 mb-2">
        {/* Animated blob background elements */}
        <BlobBox sx={{ top: '15rem', right: '30rem', backgroundColor: '#D8B4FE' }} />
        <BlobBox
          sx={{
            top: '15rem',
            right: '40rem',
            backgroundColor: '#FDE68A',
            animationDelay: '2s', // Staggered animation
          }}
        />
        <BlobBox
          sx={{
            top: '20rem',
            right: '35rem',
            backgroundColor: '#FBCFE8',
            animationDelay: '4s', // Staggered animation
          }}
        />

        {/* Product introduction section */}
        <ProductIntro product={product} />

        {/* Tabs section for detailed product information */}
        <ProductTabs />

        {/* Additional sections (currently commented out) */}
        {/* <Section5 /> // BEST SELLER PRODUCTS */}
        {/* <FrequentlyBought products={props.frequentlyBought} /> */}
        {/* <AvailableShops /> */}
        {/* <RelatedProducts products={props.relatedProducts} /> */}
      </Container>
    </Box>
  );
}
