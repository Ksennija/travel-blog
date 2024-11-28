import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { deleteCountry, updateCountry } from "../../api/countriesApi";
import { BASE_IMG_URL } from "../../constants";
import { useDescriptionElRef } from "../../hooks/useDescriptionElRef";
import { CountryPageContext } from "../../CountryPageContext";

import styles from "./CountryPanel.module.css";

export const CountryPanel: React.FC = () => {
  const navigate = useNavigate();

  const { countries, onMutating, onChange, disabled } =
    useContext(CountryPageContext);

  const { countryId } = useParams<CountriesPageParams>();

  const country = countries.find((it) => it.id === countryId)!;

  // this custom hook is used for formatting description text
  const { descriptionElRef } = useDescriptionElRef(country?.description || "");

  async function update(id: string, country: Country) {
    onMutating && onMutating(true);
    try {
      await updateCountry(id, country);
      onChange && onChange();
    } catch (e) {
      console.error("Failed to update country", e);
    }
    onMutating && onMutating(false);
  }

  async function destroy(id: string) {
    onMutating && onMutating(true);
    try {
      await deleteCountry(id);
      navigate("/", { replace: true });
      onChange && onChange();
    } catch (e) {
      console.error("Failed to delete country", e);
    }
    onMutating && onMutating(false);
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
        <button disabled={disabled} onClick={handleEdit}>
          Edit
        </button>
        <button
          disabled={disabled}
          className={styles.destroyButton}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className={styles.countryContainer}>
        <Image imageUrl={country.imageUrl} countryName={country.name} />

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
              disabled={disabled}
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

type ImgProps = {
  countryName: string;
  imageUrl: string | undefined;
};

const Image: React.FC<ImgProps> = ({ imageUrl, countryName }) => {
  if (imageUrl) {
    return (
      <img
        className={styles.countryImg}
        alt={countryName}
        src={BASE_IMG_URL + imageUrl}
      />
    );
  }
  return null;
};
