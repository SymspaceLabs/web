"use client";

/**
 * Content Component
 * 
 * Displays the main content of the section, including the carousel of products.
 * 
 * Props:
 * - products (Array): List of product objects to display in the carousel.
 */

import Link from "next/link"; // Used for navigation.
import Container from "@mui/material/Container"; // Material-UI layout component.
import IconButton from "@mui/material/IconButton"; // Material-UI button with icon support.
import { FlexBox } from "../../../components/flex-box"; // Custom utility for flexible layouts.
import LazyImage from "../../../components/LazyImage"; // Custom lazy-loading image component.
import { H6 } from "../../../components/Typography"; // Custom typography component.
import ArrowBack from "@mui/icons-material/ArrowBack"; // Material-UI back arrow icon.
import ArrowForward from "@mui/icons-material/ArrowForward"; // Material-UI forward arrow icon.
import useCarousel from "./useCarousel"; // Custom hook for carousel functionality.
import { Carousel } from "../../../components/carousel"; // Custom carousel component.
import { FlexBetween } from "../../../components/flex-box"; // Custom layout utility.
import { H3, Paragraph } from "../../../components/Typography"; // Custom typography components.

// ==============================================================
export default function Content({ products }) {
  // Extract carousel-related functionality from the custom hook.
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();

  return (
    <Container sx={{ py: 10 }}>
      {/* Header with title, description, and carousel navigation buttons */}
      <FlexBetween mt={10} mb={5}>
        <div>
          {/* Section title */}
          <H3 fontSize={{ fontFamily: "Helvetica", sm: 30, xs: 27 }}>
            Augmented Reality Marketplaces
          </H3>

          {/* Section description */}
          <Paragraph color="grey.600" fontSize={{ sm: 16, xs: 14 }}>
            There are many variations passages
          </Paragraph>
        </div>

        {/* Navigation buttons for the carousel */}
        <div>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: "white",
              boxShadow: 2,
              ml: 0.5,
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </div>
      </FlexBetween>

      {/* Carousel displaying products */}
      <Carousel ref={carouselRef} slidesToShow={6} responsive={responsive} arrows={false}>
        {products.map((product) => (
          <Link href={`/products/search/${product.slug}`} key={product.id}>
            {/* Product card */}
            <FlexBox
              sx={{
                py: 5,
                bgcolor: "#353535",
                borderRadius: 3,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "calc(100% - 74px)",
              }}
            >
              {/* Product image */}
              <LazyImage
                alt={product.title}
                width={10}
                height={10}
                sx={{ width: "40px", height: "40px" }}
                src={product.thumbnail}
              />
              {/* Product title */}
              <H6
                sx={{
                  fontFamily: "Elemental End",
                  textTransform: "lowercase",
                  color: "#fff",
                }}
              >
                {product.title}
              </H6>
            </FlexBox>
          </Link>
        ))}
      </Carousel>
    </Container>
  );
}