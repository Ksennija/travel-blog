import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { updateCountry, createCountry } from "../../api/countriesApi";
import { BASE_IMG_URL, DEFAUL_IMAGE } from "../../constants";

import styles from "./EditPanel.module.css";
import React, { useState } from "react";

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

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(DEFAUL_IMAGE);
  const [description, setDescription] = useState("");

  let country: Country;
  if (countryId !== "new") {
    country = countries.find((it) => it.id === countryId)!;
    setName(country.name);
    setImageUrl(country.imageUrl || "");
    setDescription(country.description);
  }

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
      debugger;
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
        <label>
          <span>Image URL</span>
          <input
            placeholder="/defaultImg.jpeg"
            aria-label="Image URL"
            type="text"
            name="imageUrl"
            defaultValue={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
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
