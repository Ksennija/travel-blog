import DOMPurify from "dompurify";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import { Country } from "../../types";
import { deleteCountry, updateCountry } from "../../../../api/countriesApi";
import { BASE_IMG_URL } from "../../../../constants";

import styles from "./CountryPanel.module.css";
import React, { useState, useEffect, useRef } from "react";

export type Props = {
  country: Country;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
};

export const CountryPanel: React.FC<Props> = ({
  country,
  setIsLoaded,
  onChange,
}) => {
  const descriptionElRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(country.description) as string
      );
    }
  }, [country.description]);

  const handleFavourite = (): void => {
    update(country.id, {
      ...country,
      favourite: !country.favourite,
    });
  };

  const handleEdit = (): void => {
    setEditMode(true);
  };

  const handleDelete = (): void => {
    if (window.confirm("Please confirm you want to delete this record.")) {
      destroy(country.id);
    }
  };

  const handleSave = () => {
    debugger;
    console.log(country);
    // update(country.id, {
    //   ...country,
    // });
  };

  const handleCancel = (): void => {
    //navigate(-1);
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div key={country.id} className={styles.countryItem}>
        <form id="contact-form">
          <p>
            <span>Country Name</span>
            <input
              placeholder="Country Name"
              aria-label="Country Name"
              type="text"
              name="name"
              defaultValue={country?.name}
            />
          </p>
          <label>
            <span>Image URL</span>
            <input
              placeholder="/defaultImg.jpeg"
              aria-label="Image URL"
              type="text"
              name="imageUrl"
              defaultValue={country?.imageUrl}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              name="description"
              defaultValue={country?.description}
              rows={6}
            />
          </label>
          <p>
            <button onClick={handleSave}>Save</button>
            <button className={styles.destroyButton} onClick={handleCancel}>
              Cancel
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div key={country.id} className={styles.countryItem}>
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
