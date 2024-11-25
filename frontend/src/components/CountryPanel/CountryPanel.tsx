import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountriesPageParams, Country } from "../../types";
import { deleteCountry, updateCountry } from "../../api/countriesApi";
import { BASE_IMG_URL } from "../../constants";
import { useDescriptionElRef } from "../../hooks/useDescriptionElRef";

import styles from "./CountryPanel.module.css";

export type Props = {
  countries: Country[];
  onMutating: (isMutating: boolean) => void;
  onChange: () => void;
  disabled?: boolean;
};

export const CountryPanel: React.FC<Props> = ({
  countries,
  onMutating,
  onChange,
  disabled,
}) => {
  const navigate = useNavigate();

  const { countryId } = useParams<CountriesPageParams>();

  const country = countries.find((it) => it.id === countryId)!;

  const { descriptionElRef } = useDescriptionElRef(country?.description || "");

  async function update(id: string, country: Country) {
    onMutating(true);
    try {
      await updateCountry(id, country);
      onChange();
    } catch (e) {
      console.error("Failed to update country", e);
    }
    onMutating(false);
  }

  async function destroy(id: string) {
    onMutating(true);
    try {
      await deleteCountry(id);
      navigate("/", { replace: true });
      onChange();
    } catch (e) {
      console.error("Failed to delete country", e);
    }
    onMutating(false);
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
