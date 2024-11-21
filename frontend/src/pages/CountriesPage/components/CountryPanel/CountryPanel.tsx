import DOMPurify from "dompurify";
import { marked } from "marked";
import { Form, useFetcher } from "react-router-dom";
import { Country } from "../../types";
import {
  baseImgUrl,
  getCountry,
  updateCountry,
} from "../../../../api/countriesApi";

import styles from "./CountryPanel.module.css";
import React, { useState, useEffect, useRef } from "react";

export type Props = {
  displayedCountry: Country;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CountryPanel: React.FC<Props> = ({
  displayedCountry,
  setIsLoaded,
}) => {
  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  const [country, setCountry] = useState(displayedCountry);

  async function update(id: string, country: Country) {
    setIsLoaded(true);
    const newCountry = (await updateCountry(id, country)) as Country;
    setCountry(newCountry);
    setIsLoaded(false);
  }

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(country.description) as string
      );
    }
  }, [country.description]);

  const handleFavouritesClick = (): void => {
    country.favourite = !country.favourite;
    update(country.id, country);
  };

  return (
    <div key={country.id} className={styles.countryItem}>
      <div className={styles.buttonPanel}>
        <form action="edit">
          <button>Edit</button>
        </form>
        <form
          method="post"
          action="destroy"
          //   onSubmit={(event) => {
          //     if (
          //       !window.confirm("Please confirm you want to delete this record.")
          //     ) {
          //       event.preventDefault();
          //     }
          //   }}
        >
          <button>Delete</button>
        </form>
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
              onClick={handleFavouritesClick}
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
