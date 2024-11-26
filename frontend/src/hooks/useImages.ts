import { useState, useEffect } from "react";
import { Image } from "../types";
import { fetchImages } from "../api/imagesApi";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const images = await fetchImages();
        setImages(images);
      } catch (e) {
        console.error("Failed to load images", e);
      }
    };
    getImages();
  }, []);
  return { images };
};
