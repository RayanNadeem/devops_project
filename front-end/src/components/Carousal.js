import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../Images/Carousal1.png";
import image2 from "../Images/Carousal2.png";
import "./Carousal.css";

const ImageCarousel = () => {
  return (
    <Carousel fade interval={3000} className="mt-4">
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={image1}
          alt="First slide"
          style={{ width: "auto", height: "250px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src={image2}
          alt="Second slide"
          style={{ width: "auto", height: "250px", objectFit: "cover" }}
        />
      </Carousel.Item>
      
    </Carousel>
  );
};

export default ImageCarousel;
