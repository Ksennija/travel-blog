import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { CountryProps as Props } from "../props/CountryProps";
import { baseImgUrl, getCountry, updateCountry } from "../api";

import styles from "./Country.module.css";
import React from "react";

export async function loader({ params }: any) {
  const country = await getCountry(params.countryId);
  return { country };
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  return updateCountry(params.countryId, {
    favourite: formData.get("favourite") === "true",
  });
}

export const Country: React.FC = () => {
  const { country } = useLoaderData() as Props;
  console.log(country);
  return (
    <div key={country.id} className={styles.countryItem}>
      <div>
        <img
          className={styles.countryImg}
          alt={country.name}
          src={country.imageUrl && baseImgUrl + country.imageUrl}
        />
        <div>
          {country.name}
          <Favourite country={country} />
        </div>
        <br />
        <div className={styles.countryDescription}>{country.description}</div>
      </div>
      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (
              !window.confirm("Please confirm you want to delete this record.")
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
};

function Favourite({ country }: Props) {
  const fetcher = useFetcher();

  const favourite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : country.favourite;

  return (
    <fetcher.Form method="post">
      <button
        name="favourite"
        value={favourite ? "false" : "true"}
        aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
      >
        {favourite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
