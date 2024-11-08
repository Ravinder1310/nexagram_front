import React, { useState, useEffect } from 'react';
import recharge1 from "./images/recharge_1.png"
import recharge2 from "./images/recharge2.png"
import recharge3 from "./images/recharge3.png"
import recharge4 from "./images/abcde.png"
import recharge5 from "./images/abcdef.png"
import recharge6 from "./images/abcdefg.png"
import { useSelector } from 'react-redux';

const ImageSlider = () => {
  const images = [
    recharge1,
    recharge2,
    recharge3,
    recharge4, // Replace with actual image paths
    recharge5,
    recharge6
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((store) => store.auth);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Automatically change slide every 3 seconds (3000 milliseconds)
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);

    // Clear interval when component unmounts to avoid memory leaks
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className={`relative w-[95%] mb-6 sm:h-[340px] rounded-lg overflow-hidden mx-auto`}>
    {/* Slider Images */}
    <div
      className={`flex transition-transform duration-1000 ease-in-out sm:mt-20`}
      style={{ transform: `translateX(-${currentIndex * 100}%)`}}
    > 
      {images.map((image, index) => (
        <div key={index} className='w-full flex-shrink-0'>
          <img
            src={image}
            alt={`slide-${index}`}
            className = 'w-full h-[150px] sm:h-[390px] object-cover object-center rounded-lg'
          />
        </div>
      ))}
    </div>

    {/* Previous Button */}
    {/* <button
      onClick={prevSlide}
      className='absolute left-3 top-1/2 transform -translate-y-1/2 bg-red-400 text-white p-2 rounded-full hover:opacity-100 transition-opacity'
    >
      &#10094;
    </button> */}

    {/* Next Button */}
    {/* <button
      onClick={nextSlide}
      className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-400 text-white p-2 rounded-full hover:opacity-100 transition-opacity'
    >
      &#10095;
    </button> */}

    {/* Dots for Navigation */}
    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
      {images.map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  </div>
  );
};

export default ImageSlider;
