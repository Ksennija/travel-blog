import { useState, useCallback, useEffect } from "react";
import { Image } from "../types";
import { fetchImages } from "../api/imagesApi";

export const useImages = (onMutating: (isMutating: boolean) => void) => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImagePickerImages = useCallback(async () => {
    onMutating(true);
    try {
      const images = await fetchImages();
      setImages(images);
    } catch (e) {
      console.error("Failed to update country", e);
    }
    onMutating(false);
  }, [onMutating]);

  useEffect(() => {
    fetchImagePickerImages();
  }, [fetchImagePickerImages]);

  return { images };
};
