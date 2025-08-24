import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Banner = () => {
  const t = useTranslations("Banner");

  const images = [
    "/villa/5.webp",
    "/villa/7.webp",
    "/villa/28.webp",
    "/villa/8.webp",
    "/villa/76.webp",
    "/villa/10.webp",
    "/villa/47.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt={`Villa Kramer Luxury Apartment in the Alps – Banner Image ${index + 1}` }
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-[#1a1b19]/30 to-[#1a1b19] z-10"></div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center z-20 p-4">
        <h1 className="text-white text-base sm:text-lg md:text-xl">
          {t("title")}
        </h1>
        <p className="text-white text-4xl sm:text-5xl md:text-7xl mt-8 md:mt-12 leading-[1.5] leading-none">
          {t("subtitle")}
        </p>
        <div className="w-[1px] bg-white h-24 md:h-32 mt-8 mx-auto block"></div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute left-4 sm:left-8 bottom-8 sm:bottom-12 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
