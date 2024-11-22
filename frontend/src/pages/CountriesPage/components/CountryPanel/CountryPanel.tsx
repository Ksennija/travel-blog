import DOMPurify from "dompurify";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import { Country } from "../../types";
import {
  baseImgUrl,
  deleteCountry,
  updateCountry,
} from "../../../../api/countriesApi";

import styles from "./CountryPanel.module.css";
import React, { useState, useEffect, useRef } from "react";

export type Props = {
  country: Country;
  //setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
};

export const CountryPanel: React.FC<Props> = ({
  country, //displayedCountry
  //setIsLoaded,
  onChange,
}) => {
  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  async function update(id: string, country: Country) {
    setIsLoaded(true);
    try {
      await updateCountry(id, {
        ...country,
        favourite: !country.favourite,
      });
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

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(country.description) as string
      );
    }
  }, [country.description]);

  const handleFavourite = (): void => {
    update(country.id, country);
  };

  const handleDelete = (): void => {
    if (window.confirm("Please confirm you want to delete this record.")) {
      destroy(country.id);
    }
  };

  return (
    <div
      key={country.id}
      className={`${styles.countryItem} ${isLoaded ? styles.loading : ""}`}
    >
      <div className={styles.buttonPanel}>
        <form action="edit">
          <button>Edit</button>
        </form>

        <button className={styles.destroyButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className={styles.countryContainer}>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && baseImgUrl + country.imageUrl}
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
            {/* <Favourite country={country} /> */}
          </h1>
          <p className={styles.countryDescription} ref={descriptionElRef} />
        </div>
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
