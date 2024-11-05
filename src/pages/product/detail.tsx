import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, styled, Box } from "@mui/material";
import NextArrrow from "../../assets/svg/nextArrow";
import PrevArrow from "../../assets/svg/prevArrow";

const items = [
  {
    name: "nema 1",
    description: "thsi is description",
  },
  {
    name: "nema 2",
    description: "thsi is description 2",
  },
];

const CarouselImage = styled("img")(({ theme }) => ({
  width: "60%",
  margin: "auto",
}));

const ProductDetail = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images = [
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SBOEWU_CpebVQVvM8dCe62irz2fkhfY3DA&s",
    },
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0J2I5e6YaPkw70e7-Y8e92m1qOezWYim6Gg&s",
    },
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SBOEWU_CpebVQVvM8dCe62irz2fkhfY3DA&s",
    },
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0J2I5e6YaPkw70e7-Y8e92m1qOezWYim6Gg&s",
    },
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SBOEWU_CpebVQVvM8dCe62irz2fkhfY3DA&s",
    },
    {
      id: 0,
      name: "nema 1",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0J2I5e6YaPkw70e7-Y8e92m1qOezWYim6Gg&s",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", marginBottom: "30px", gap: 2 }}>
        {images.map((img, idx) => (
          <img
            onClick={() => setCurrentIdx(idx)}
            src={img.images}
            alt={img.name}
            style={{
              border: currentIdx === idx ? "1px solid black" : "none",
              padding: "5px",
            }}
          />
        ))}
      </Box>

      <Carousel
        index={currentIdx}
        autoPlay={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
        onChange={(now, prev) => setCurrentIdx(now)}
        NextIcon={<NextArrrow style={{ width: "100px", height: "100px" }} />}
        PrevIcon={<PrevArrow style={{ width: "100px", height: "100px" }} />}
        indicators={false}
        // infiniteLoop = {false}
        cycleNavigation={false}
        animation="slide"
        sx={{
          width: "80%",
          height: "800px",
          textAlign: "center",
        }}
      >
        {images.map((img) => (
          <CarouselImage src={img.images} alt={img.name} />
        ))}
      </Carousel>

      <div className="video-responsive">
        <iframe
          width="700"
          height="394"
          src="https://www.youtube.com/embed/7mBCdKW5PNQ"
          title="What Is A Rectangle? | Shape Songs with the StoryBots | Netflix Jr"
        //   frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
};

export default ProductDetail;
