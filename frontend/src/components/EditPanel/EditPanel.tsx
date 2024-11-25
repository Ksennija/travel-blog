import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country, Image } from "../../types";
import { updateCountry, createCountry } from "../../api/countriesApi";
import { BASE_IMG_URL, DEFAUL_COUNTRY } from "../../constants";
import { ImagePicker } from "../ImagePicker/ImagePicker";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./EditPanel.module.css";
import React, { useState, useEffect } from "react";
import { fetchImages } from "../../api/imagesApi";

export type Props = {
  countries: Country[];
  onMutating: (isMutating: boolean) => void;
  onChange: () => void;
};

export const EditPanel: React.FC<Props> = ({
  countries,
  onMutating,
  onChange,
}) => {
  const navigate = useNavigate();

  const { countryId } = useParams<CountriesPageParams>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Country>();
  const onSubmit: SubmitHandler<Country> = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

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
      onMutating(true);
      try {
        const images = await fetchImages();
        setSelectableImages(images);
      } catch (e) {
        console.error("Failed to update country", e);
      }
      onMutating(false);
    };
    getImages();
  }, []);

  async function update(id: string, country: Country) {
    onMutating(true);
    try {
      await updateCountry(id, country);
      onChange();
      navigate(`/countries/${country.id}`);
    } catch (e) {
      console.error("Failed to update country", e);
    }
    onMutating(false);
  }

  async function create(country: Omit<Country, "id">) {
    onMutating(true);
    try {
      const newCountry = await createCountry(country);
      onChange();
      navigate(`/countries/${newCountry.id}`);
    } catch (e) {
      console.error("Failed to create new country", e);
    }
    onMutating(false);
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.countryItem}>
      <div id="contact-form">
        <p>
          <span>Country Name</span>
          <input
            placeholder="Country Name"
            aria-label="Country Name"
            type="text"
            defaultValue={name}
            {...register("name", { required: true, maxLength: 60 })}
          />
          {errors.name && (
            <span>This field is required, maximal length is 60 characters</span>
          )}
        </p>
        <label>
          <span>Description</span>
          <textarea
            placeholder="Please, write something about this country"
            rows={6}
            defaultValue={description}
            {...register("description")}
          />
        </label>
        <div className={styles.imageContent}>
          <span>Image URL</span>
          <input
            disabled
            placeholder="Please, select image"
            aria-label="Image URL"
            type="text"
            name="imageUrl"
            value={imageUrl}
          />
          <img
            className={styles.image}
            alt={name}
            src={BASE_IMG_URL + imageUrl}
          />
        </div>
        <ImagePicker
          images={selectableImages}
          imageUrl={imageUrl}
          onChange={onImageSelect}
        ></ImagePicker>
        <p className={styles.buttons}>
          <button type="submit">Save</button>
          <button className={styles.destroyButton} onClick={handleCancel}>
            Cancel
          </button>
        </p>
      </div>
    </form>
  );
};
