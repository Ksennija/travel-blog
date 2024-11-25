import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country, Image } from "../../types";
import { updateCountry, createCountry } from "../../api/countriesApi";
import { BASE_IMG_URL, DEFAUL_COUNTRY } from "../../constants";
import { ImagePicker } from "../ImagePicker/ImagePicker";

import styles from "./EditPanel.module.css";
import React, { useState, useEffect } from "react";
import { fetchImages } from "../../api/imagesApi";

export type Props = {
  countries: Country[];
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
};

export const EditPanel: React.FC<Props> = ({
  countries,
  setIsLoaded,
  onChange,
}) => {
  const navigate = useNavigate();

  const { countryId } = useParams<CountriesPageParams>();

  const country =
    countryId === "new"
      ? DEFAUL_COUNTRY
      : countries.find((it) => it.id === countryId)!;

  const [name, setName] = useState(country.name);
  const [imageUrl, setImageUrl] = useState(country.imageUrl);
  const [description, setDescription] = useState(country.description);
  const [selectableImages, setSelectableImages] = useState<Image[]>([]);

  useEffect(() => {
    const getImages = async () => {
      setIsLoaded(true);
      try {
        const images = await fetchImages();
        setSelectableImages(images);
      } catch (e) {
        console.error("Failed to update country", e);
      }
      setIsLoaded(false);
    };
    getImages();
  }, [setIsLoaded]);

  async function update(id: string, country: Country) {
    setIsLoaded(true);
    try {
      await updateCountry(id, country);
      onChange();
      navigate(`/countries/${country.id}`);
    } catch (e) {
      console.error("Failed to update country", e);
    }
    setIsLoaded(false);
  }

  async function create(country: Omit<Country, "id">) {
    setIsLoaded(true);
    try {
      const newCountry = await createCountry(country);
      onChange();
      navigate(`/countries/${newCountry.id}`);
    } catch (e) {
      console.error("Failed to create new country", e);
    }
    setIsLoaded(false);
  }

  const handleSave = () => {
    if (countryId === "new") {
      create({
        name: name,
        imageUrl: imageUrl,
        description: description,
        favourite: false,
      });
    } else {
      update(country.id, {
        ...country,
        name: name,
        imageUrl: imageUrl,
        description: description,
      });
    }
  };

  const handleCancel = (): void => {
    navigate(-1);
  };

  const onImageSelect = (imageUrl: string): void => {
    setImageUrl(imageUrl);
  };

  return (
    <div className={styles.countryItem}>
      <div id="contact-form">
        <p>
          <span>Country Name</span>
          <input
            placeholder="Country Name"
            aria-label="Country Name"
            type="text"
            name="name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <div className={styles.imageContent}>
          <span>Image URL</span>
          <img
            className={styles.image}
            alt={name}
            src={BASE_IMG_URL + imageUrl}
          />
          <input
            disabled
            placeholder="Please, select image"
            aria-label="Image URL"
            type="text"
            name="imageUrl"
            value={imageUrl}
          />
        </div>
        <ImagePicker
          images={selectableImages}
          imageUrl={imageUrl}
          onSelect={onImageSelect}
        ></ImagePicker>
        <label>
          <span>Description</span>
          <textarea
            placeholder="Please, write something about this country"
            name="description"
            defaultValue={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <p>
          <button onClick={handleSave}>Save</button>
          <button className={styles.destroyButton} onClick={handleCancel}>
            Cancel
          </button>
        </p>
      </div>
    </div>
  );
};
