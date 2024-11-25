import DOMPurify from "dompurify";
import { marked } from "marked";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { deleteCountry, updateCountry } from "../../api/countriesApi";
import { BASE_IMG_URL } from "../../constants";

import styles from "./CountryPanel.module.css";
import React, { useEffect, useRef } from "react";

export type Props = {
  countries: Country[];
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
};

export const CountryPanel: React.FC<Props> = ({
  countries,
  setIsLoaded,
  onChange,
}) => {
  const navigate = useNavigate();

  const { countryId } = useParams<CountriesPageParams>();

  const country = countries.find((it) => it.id === countryId)!;

  // useRef helps to make text markup for country description
  // before rendering I parse the text with the marked and sanitize the output HTML,
  // following the instructions in the documentation
  // https://marked.js.org/

  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(country.description) as string
      );
    }
  }, [country.description]);

  async function update(id: string, country: Country) {
    setIsLoaded(true);
    try {
      await updateCountry(id, country);
      onChange();
    } catch (e) {
      console.error("Failed to update country", e);
    }
    setIsLoaded(false);
  }

  async function destroy(id: string) {
    setIsLoaded(true);
    try {
      await deleteCountry(id);
      navigate("/", { replace: true });
      onChange();
    } catch (e) {
      console.error("Failed to delete country", e);
    }
    setIsLoaded(false);
  }

  const handleFavourite = (): void => {
    update(country.id, {
      ...country,
      favourite: !country.favourite,
    });
  };

  const handleEdit = (): void => {
    navigate(`/countries/${country.id}/edit`);
  };

  const handleDelete = (): void => {
    if (window.confirm("Please confirm you want to delete this record.")) {
      destroy(country.id);
    }
  };

  return (
    <div className={styles.countryItem}>
      <div className={styles.buttonPanel}>
        <button onClick={handleEdit}>Edit</button>
        <button className={styles.destroyButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className={styles.countryContainer}>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && BASE_IMG_URL + country.imageUrl}
        />
        <div className={styles.countryText}>
          <h1>
            {country.name}
            <button
              className={styles.favouriteButton}
              name="favourite"
              value={country.favourite ? "false" : "true"}
              aria-label={
                country.favourite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              onClick={handleFavourite}
            >
              {country.favourite ? "★" : "☆"}
            </button>
          </h1>
          <p className={styles.countryDescription} ref={descriptionElRef} />
        </div>
      </div>
    </div>
  );
};
