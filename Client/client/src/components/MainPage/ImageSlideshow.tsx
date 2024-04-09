import React from 'react';
import { Zoom, Fade } from 'react-awesome-reveal';
import './ImageSlideshow.css'; // Import CSS for styling

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  // Add more image paths as needed
];

const ImageSlideshow = () => {
  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <Fade key={index} direction="up" triggerOnce>
          <Zoom triggerOnce>
            <img src={image} alt={`Slide ${index + 1}`} />
          </Zoom>
        </Fade>
      ))}
    </div>
  );
};

export default ImageSlideshow;
