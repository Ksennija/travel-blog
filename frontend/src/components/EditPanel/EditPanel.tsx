import DOMPurify from "dompurify";
import { marked } from "marked";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { deleteCountry, updateCountry } from "../../api/countriesApi";
import { BASE_IMG_URL } from "../../constants";

import styles from "./EditPanel.module.css";
import React, { useState, useEffect, useRef } from "react";

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

  const country = countries.find((it) => it.id === countryId)!;

  const [name, setName] = useState(country.name || "");
  const [imageUrl, setImageUrl] = useState(country.imageUrl || "");
  const [description, setDescription] = useState(country.description || "");

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

  const handleSave = () => {
    update(country.id, {
      ...country,
      name: name,
      imageUrl: imageUrl,
      description: description,
    });
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

/* import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams } from "../../types";
import styles from "./CountryPanel.module.css";

export const CountryPanel: React.FC = () => {
  const { countryId } = useParams<CountriesPageParams>();
  const navigate = useNavigate();

  return (
    <div className={styles.detail}>
      CountryPanel {countryId}
      <button
        type="button"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        delete
      </button>
    </div>
  );
}; */
